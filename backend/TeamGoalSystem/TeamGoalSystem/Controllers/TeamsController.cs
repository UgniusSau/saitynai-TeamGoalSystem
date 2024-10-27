using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TeamGoalSystem.Auth.Model;
using TeamGoalSystem.Data.Models.DTO;
using TeamGoalSystem.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;

namespace TeamGoalSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamsController : ControllerBase
    {
        private readonly ITeamService _teamService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TeamsController(ITeamService teamService, IHttpContextAccessor httpContextAccessor)
        {
            _teamService = teamService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllTeams()
        {
            var u = User;
            try
            {
                var teams = await _teamService.GetAllTeamsAsync();
                return Ok(teams);
            }
            catch (Exception)
            {
                return StatusCode(500, "Error occured while getting team list");
            }
        }

        [HttpGet("{teamId}")]
        [Authorize]
        public async Task<IActionResult> GetTeamById(int teamId)
        {
            try
            {
                var team = await _teamService.GetTeamByIdAsync(teamId);
                
                return Ok(team);
            }
            catch (Exception ex)
            {
                return ex.Message switch
                {
                    "Team not found" => NotFound("Team not found"),
                    _ => StatusCode(500, "Error occured while getting team")
                };
            }
        }

        [HttpPost]
        [Authorize(Roles = Roles.TeamLeader)]
        public async Task<IActionResult> CreateTeam([FromBody] CreateTeamDTO createTeamDTO)
        {
            if (createTeamDTO == null)
            {
                return BadRequest("Team object cannot be empty");
            }

            try
            {
                var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub);
                var createdTeam = await _teamService.CreateTeamAsync(createTeamDTO, userId);
                return CreatedAtAction(nameof(GetTeamById), new { teamId = createdTeam.Id }, createdTeam);
            }
            catch (Exception)
            {
                return StatusCode(500, "Error occured while creating team");
            }
        }

        [HttpPatch("{teamId}")]
        [Authorize]
        public async Task<IActionResult> UpdateTeam(int teamId, [FromBody] UpdateTeamDTO updateTeamDTO)
        {
            try
            {
                var isAdmin = _httpContextAccessor.HttpContext.User.IsInRole(Roles.Admin);
                var requestUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub);

                var updatedTeam = await _teamService.UpdateTeamAsync(teamId, updateTeamDTO, isAdmin, requestUserId);
                
                return Ok(updatedTeam);
            }
            catch (Exception ex)
            {
                return ex.Message switch
                {
                    "Team not found" => NotFound("Team not found"),
                    _ => StatusCode(500, "Error occured while getting team")
                };
            }
        }

        [HttpDelete("{teamId}")]
        [Authorize]
        public async Task<IActionResult> DeleteTeam(int teamId)
        {
            try
            {
                var isAdmin = _httpContextAccessor.HttpContext.User.IsInRole(Roles.Admin);
                var requestUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub);
                await _teamService.DeleteTeamAsync(teamId, isAdmin, requestUserId);

                return NoContent();
            }
            catch (Exception ex)
            {
                return ex.Message switch
                {
                    "Team not found" => NotFound("Team not found"),
                    "Team has members" => Conflict("Team has members and cannot be deleted"),
                    _ => StatusCode(500, "Error occured while getting team")
                };
            }
        }
    }
}
