using Microsoft.AspNetCore.Mvc;
using TeamGoalSystem.Data.Models.DTO;
using TeamGoalSystem.Services.Interfaces;

namespace TeamGoalSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamsController : ControllerBase
    {
        private readonly ITeamService _teamService;

        public TeamsController(ITeamService teamService)
        {
            _teamService = teamService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTeams()
        {
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
        public async Task<IActionResult> CreateTeam([FromBody] CreateTeamDTO createTeamDTO)
        {
            if (createTeamDTO == null)
            {
                return BadRequest("Team object cannot be empty");
            }

            try
            {
                var createdTeam = await _teamService.CreateTeamAsync(createTeamDTO);
                return CreatedAtAction(nameof(GetTeamById), new { teamId = createdTeam.Id }, createdTeam);
            }
            catch (Exception)
            {
                return StatusCode(500, "Error occured while creating team");
            }
        }

        [HttpPut("{teamId}")]
        public async Task<IActionResult> UpdateTeam(int teamId, [FromBody] UpdateTeamDTO updateTeamDTO)
        {
            if (updateTeamDTO == null)
            {
                return BadRequest("Team object cannot be empty");
            }

            try
            {
                var updatedTeam = await _teamService.UpdateTeamAsync(teamId, updateTeamDTO);
                
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
        public async Task<IActionResult> DeleteTeam(int teamId)
        {
            try
            {
                await _teamService.DeleteTeamAsync(teamId);

                return NoContent();
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
    }
}
