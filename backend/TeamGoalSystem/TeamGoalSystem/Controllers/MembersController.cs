using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TeamGoalSystem.Auth.Model;
using TeamGoalSystem.Data.Models.DTO;
using TeamGoalSystem.Helpers;
using TeamGoalSystem.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace TeamGoalSystem.Controllers
{
    [ApiController]
    [Route("api/teams/{teamId}/[controller]")]
    public class MembersController : ControllerBase
    {
        private readonly IMemberService _memberService;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public MembersController(IMemberService memberService, IHttpContextAccessor httpContextAccessor)
        {
            _memberService = memberService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllTeamMembers([AsParameters] TeamParameters parameters)
        {
            try
            {
                var teamId = parameters.TeamId;

                var members = await _memberService.GetAllTeamMembersAsync(teamId);

                return Ok(members);
            }
            catch (Exception ex)
            {
                return ex.Message switch
                {
                    "Team not found" => NotFound("Team not found"),
                    _ => StatusCode(500, "Error occured while getting team members")
                };
            }
        }

        [HttpGet("{memberId}")]
        [Authorize]
        public async Task<IActionResult> GetTeamMemberById([AsParameters] MemberParameters parameters)
        {
            try
            {
                var teamId = parameters.TeamId;
                var memberId = parameters.MemberId;

                var member = await _memberService.GetTeamMemberByIdAsync(teamId, memberId);
               
                return Ok(member);
            }
            catch (Exception ex)
            {
                return ex.Message switch
                {
                    "Team not found" => NotFound("Team not found"),
                    "Member not found" => NotFound("Member not found"),
                    _ => StatusCode(500, "Error occured while getting member")
                };
            }
        }

        [HttpPost]
        [Authorize(Roles = Roles.TeamLeader)]
        public async Task<IActionResult> CreateTeamMember([AsParameters] TeamParameters parameters, [FromBody] CreateMemberDTO createMemberDTO)
        {
            if (createMemberDTO == null)
            {
                return BadRequest("Member object cannot be empty");
            }

            try
            {
                var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub);

                var teamId = parameters.TeamId;

                var createdMember = await _memberService.CreateTeamMemberAsync(teamId, createMemberDTO, userId);

                return CreatedAtAction(nameof(GetTeamMemberById), new { teamId = teamId, memberId = createdMember.Id }, createdMember);
            }
            catch (Exception ex)
            {
                return ex.Message switch
                {
                    "Team not found" => NotFound("Team not found"),
                    _ => StatusCode(500, "Error occured while creating member")
                };
            }
        }

        [HttpPatch("{memberId}")]
        [Authorize]
        public async Task<IActionResult> UpdateTeamMember([AsParameters] MemberParameters parameters, [FromBody] UpdateMemberDTO updateMemberDTO)
        {
            if (updateMemberDTO == null)
            {
                return BadRequest("Member object cannot be empty");
            }

            try
            {
                var teamId = parameters.TeamId;
                var memberId = parameters.MemberId;

                var isAdmin = _httpContextAccessor.HttpContext.User.IsInRole(Roles.Admin);
                var requestUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub);

                var updatedTeam = await _memberService.UpdateTeamMemberAsync(teamId, memberId, updateMemberDTO, isAdmin, requestUserId);

                return Ok(updatedTeam);
            }
            catch (Exception ex)
            {
                return ex.Message switch
                {
                    "Team not found" => NotFound("Team not found"),
                    "Member not found" => NotFound("Member not found"),
                    _ => StatusCode(500, "Error occured while getting team")
                };
            }
        }

        [HttpDelete("{memberId}")]
        [Authorize]
        public async Task<IActionResult> DeleteTeamMember([AsParameters] MemberParameters parameters)
        {
            try
            {
                var teamId = parameters.TeamId;
                var memberId = parameters.MemberId;

                var isAdmin = _httpContextAccessor.HttpContext.User.IsInRole(Roles.Admin);
                var requestUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub);

                await _memberService.DeleteTeamMemberAsync(teamId, memberId, isAdmin, requestUserId);

                return NoContent();
            }
            catch (Exception ex)
            {
                return ex.Message switch
                {
                    "Team not found" => NotFound("Team not found"),
                    "Member not found" => NotFound("Member not found"),
                    "Member has goals" => Conflict("Member has goals"),
                    _ => StatusCode(500, "Error occured while getting team")
                };
            }
        }
    }
}
