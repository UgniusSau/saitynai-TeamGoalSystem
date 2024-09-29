using Microsoft.AspNetCore.Mvc;
using TeamGoalSystem.Data.Models.DTO;
using TeamGoalSystem.Helpers;
using TeamGoalSystem.Services.Interfaces;

namespace TeamGoalSystem.Controllers
{
    [ApiController]
    [Route("api/teams/{teamId}/members/{memberId}/[controller]")]
    public class GoalsController : ControllerBase
    {
        private readonly IGoalService _goalService;

        public GoalsController(IGoalService goalService)
        {
            _goalService = goalService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTeamMemberGoals([AsParameters] MemberParameters parameters)
        {
            try
            {
                var teamId = parameters.TeamId;
                var memberId = parameters.MemberId;

                var goals = await _goalService.GetAllTeamMemberGoalsAsync(teamId, memberId);

                return Ok(goals);
            }
            catch (Exception ex)
            {
                return ex.Message switch
                {
                    "Team not found" => NotFound("Team not found"),
                    "Member not found" => NotFound("Member not found"),
                    _ => StatusCode(500, "Error occured while getting team member goals")
                };
            }
        }

        [HttpGet("{goalId}")]
        public async Task<IActionResult> GetTeamMemberGoalById([AsParameters] GoalParameters parameters)
        {
            try
            {
                var teamId = parameters.TeamId;
                var memberId = parameters.MemberId;
                var goalId = parameters.GoalId;

                var member = await _goalService.GetTeamMemberGoalByIdAsync(teamId, memberId, goalId);

                return Ok(member);
            }
            catch (Exception ex)
            {
                return ex.Message switch
                {
                    "Team not found" => NotFound("Team not found"),
                    "Member not found" => NotFound("Member not found"),
                    "Goal not found" => NotFound("Goal not found"),
                    _ => StatusCode(500, "Error occured while getting member")
                };
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTeamMemberGoal([AsParameters] MemberParameters parameters, [FromBody] CreateGoalDTO createGoalDTO)
        {
            if (createGoalDTO == null)
            {
                return BadRequest("Goal object cannot be empty");
            }

            try
            {
                var teamId = parameters.TeamId;
                var memberId = parameters.MemberId;

                var createdGoal = await _goalService.CreateTeamMemberGoalAsync(teamId, memberId, createGoalDTO);

                return CreatedAtAction(nameof(GetTeamMemberGoalById), new { teamId = teamId, memberId = memberId, goalId = createdGoal.Id }, createdGoal);
            }
            catch (Exception ex)
            {
                return ex.Message switch
                {
                    "Team not found" => NotFound("Team not found"),
                    "Member not found" => NotFound("Member not found"),
                    _ => StatusCode(500, "Error occured while creating member goal")
                };
            }
        }

        [HttpPut("{goalId}")]
        public async Task<IActionResult> UpdateTeamMemberGoal([AsParameters] GoalParameters parameters, [FromBody] UpdateGoalDTO updateGoalDTO)
        {
            if (updateGoalDTO == null)
            {
                return BadRequest("Goal object cannot be empty");
            }

            try
            {
                var teamId = parameters.TeamId;
                var memberId = parameters.MemberId;
                var goalId = parameters.GoalId;

                var updatedGoal = await _goalService.UpdateTeamMemberGoalAsync(teamId, memberId, goalId, updateGoalDTO);

                return Ok(updatedGoal);
            }
            catch (Exception ex)
            {
                return ex.Message switch
                {
                    "Team not found" => NotFound("Team not found"),
                    "Member not found" => NotFound("Member not found"),
                    "Goal not found" => NotFound("Goal not found"),
                    _ => StatusCode(500, "Error occured while getting team")
                };
            }
        }

        [HttpDelete("{goalId}")]
        public async Task<IActionResult> DeleteTeamMemberGoal([AsParameters] GoalParameters parameters)
        {
            try
            {
                var teamId = parameters.TeamId;
                var memberId = parameters.MemberId;
                var goalId = parameters.GoalId;

                await _goalService.DeleteTeamMemberGoalAsync(teamId, memberId, goalId);

                return NoContent();
            }
            catch (Exception ex)
            {
                return ex.Message switch
                {
                    "Team not found" => NotFound("Team not found"),
                    "Member not found" => NotFound("Member not found"),
                    "Goal not found" => NotFound("Goal not found"),
                    _ => StatusCode(500, "Error occured while getting team")
                };
            }
        }
    }
}
