using Microsoft.AspNetCore.Mvc;
using TeamGoalSystem.Data.Models.DTO;
using TeamGoalSystem.Helpers;
using TeamGoalSystem.Services.Interfaces;

namespace TeamGoalSystem.Controllers
{
    [ApiController]
    [Route("api/teams/{teamId}/[controller]")]
    public class MembersController : ControllerBase
    {
        private readonly IMemberService _memberService;

        public MembersController(IMemberService memberService)
        {
            _memberService = memberService;
        }

        [HttpGet]
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
        public async Task<IActionResult> CreateTeamMember([AsParameters] TeamParameters parameters, [FromBody] CreateMemberDTO createMemberDTO)
        {
            if (createMemberDTO == null)
            {
                return BadRequest("Member object cannot be empty");
            }

            try
            {
                var teamId = parameters.TeamId;

                var createdMember = await _memberService.CreateTeamMemberAsync(teamId, createMemberDTO);

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

        [HttpPut("{memberId}")]
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

                var updatedTeam = await _memberService.UpdateTeamMemberAsync(teamId, memberId, updateMemberDTO);

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
        public async Task<IActionResult> DeleteTeamMember([AsParameters] MemberParameters parameters)
        {
            try
            {
                var teamId = parameters.TeamId;
                var memberId = parameters.MemberId;

                await _memberService.DeleteTeamMemberAsync(teamId, memberId);

                return NoContent();
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
    }
}
