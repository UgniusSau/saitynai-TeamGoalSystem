using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Transactions;
using TeamGoalSystem.Auth.Model;
using TeamGoalSystem.Data.Models.Auth;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace TeamGoalSystem.Auth
{
    [Route("auth")]
    public class AuthEndpoints : ControllerBase
    {
        private readonly UserManager<GoalSystemUser> _userManager;
        private readonly JwtTokenService _jwtService;
        private readonly SessionService _sessionService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthEndpoints(UserManager<GoalSystemUser> userManager, JwtTokenService jwtService, IHttpContextAccessor httpContextAccessor, SessionService sessionService)
        {
            _userManager = userManager;
            _jwtService = jwtService;
            _httpContextAccessor = httpContextAccessor;
            _sessionService = sessionService;
        }

        [HttpPost]
        [Route("registerTeamLeader")]
        public async Task<IActionResult> RegisterTeamLeader([FromBody] RegisterUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var wrongJson = errors.Any(e => e.Contains("JSON"));
                return wrongJson ? StatusCode(400, "Wrong JSON format") : StatusCode(422, new { errors });
            }

            var user = await _userManager.FindByNameAsync(request.Username);

            if (user is not null)
                return StatusCode(422, "Username already taken");

            var newUser = new GoalSystemUser()
            {
                Name = request.Name,
                Surname = request.Surname,
                UserName = request.Username,
                Email = request.Email
            };

            using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var createdUser = await _userManager.CreateAsync(newUser, request.Password);
                if (!createdUser.Succeeded)
                    return StatusCode(422, "Not able to create user");

                var addToRoleResult = await _userManager.AddToRoleAsync(newUser, Roles.TeamLeader);
                if (!addToRoleResult.Succeeded)
                    return StatusCode(422, "Failed to assign role to user");
                scope.Complete();
            }

            return Created();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var wrongJson = errors.Any(e => e.Contains("JSON"));
                return wrongJson ? StatusCode(400, "Wrong JSON format") : StatusCode(422, new { errors });
            }

            var user = await _userManager.FindByNameAsync(request.Username);

            if (user is null)
                return NotFound("User not found");

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);

            if (!isPasswordValid)
                return StatusCode(422, "Password not correct");

            var sessionId = Guid.NewGuid();
            var expiresAt = DateTime.UtcNow.AddDays(3);
            var roles = await _userManager.GetRolesAsync(user);
            var accessToken = _jwtService.CreateAccessToken(user.UserName!, user.Id, roles);
            var refreshToken = _jwtService.CreateRefreshToken(sessionId, user.Id, expiresAt);

            await _sessionService.createSessionAsync(sessionId, user.Id, refreshToken, expiresAt);

            var cookiesOptions = new CookieOptions()
            {
                HttpOnly = true,
                SameSite = SameSiteMode.Lax,
                Expires = expiresAt,
                //Secure = true
            };

            _httpContextAccessor.HttpContext.Response.Cookies.Append("RefreshToken", refreshToken, cookiesOptions);

            return Ok(accessToken);
        }

        [HttpPost]
        [Route("accessToken")]
        public async Task<IActionResult> AccessToken()
        {
            if (!_httpContextAccessor.HttpContext.Request.Cookies.TryGetValue("RefreshToken", out var refreshToken))
            {
                return StatusCode(422, "Unable to get refreshToken");
            }

            if (!_jwtService.TryParseRefreshToken(refreshToken, out var claims))
            {
                return StatusCode(422, "Unable to get claims");
            }

            var userId = claims.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var user = await _userManager.FindByIdAsync(userId);
            if (user is null)
            {
                return NotFound("User not found");
            }

            var sessionId = claims.FindFirstValue("SessionId");
            if (string.IsNullOrWhiteSpace(sessionId))
            {
                return NotFound("Session not found");
            }

            var sessionIdAsGuid = Guid.Parse(sessionId);
            if (!await _sessionService.IsSessionValidAsync(sessionIdAsGuid, refreshToken))
            {
                return StatusCode(422, "Session not valid");
            }

            var expiresAt = DateTime.UtcNow.AddDays(3);
            var roles = await _userManager.GetRolesAsync(user);
            var accessToken = _jwtService.CreateAccessToken(user.UserName!, user.Id, roles);
            var newRefreshToken = _jwtService.CreateRefreshToken(sessionIdAsGuid, user.Id, expiresAt);

            var cookiesOptions = new CookieOptions()
            {
                HttpOnly = true,
                SameSite = SameSiteMode.Lax,
                Expires = expiresAt,
                //Secure = true
            };

            _httpContextAccessor.HttpContext.Response.Cookies.Append("RefreshToken", newRefreshToken, cookiesOptions);

            await _sessionService.ExtendSessionAsync(sessionIdAsGuid, newRefreshToken, expiresAt);

            return Ok(accessToken);
        }

        [HttpPost]
        [Route("logOut")]
        public async Task<IActionResult> LogOut()
        {
            if (!_httpContextAccessor.HttpContext.Request.Cookies.TryGetValue("RefreshToken", out var refreshToken))
            {
                return StatusCode(422, "Unable to get refreshToken");
            }

            if (!_jwtService.TryParseRefreshToken(refreshToken, out var claims))
            {
                return StatusCode(422, "Unable to get claims");
            }

            var userId = claims.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var user = await _userManager.FindByIdAsync(userId);
            if (user is null)
            {
                return NotFound("User not found");
            }

            var sessionId = claims.FindFirstValue("SessionId");
            if (string.IsNullOrWhiteSpace(sessionId))
            {
                return NotFound("Session not found");
            }

            await _sessionService.InvalidateSessionAsync(Guid.Parse(sessionId));
            _httpContextAccessor.HttpContext.Response.Cookies.Delete("RefreshToken");

            return Ok();
        }
    }
}
