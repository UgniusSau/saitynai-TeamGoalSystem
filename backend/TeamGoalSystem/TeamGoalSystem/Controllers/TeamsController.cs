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
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeamById(int id)
        {
            try
            {
                var team = await _teamService.GetTeamByIdAsync(id);
                if (team is null)
                {
                    return NotFound(new { message = $"Team not found" });
                }
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
                return BadRequest("Team object is null");
            }

            try
            {
                var createdTeam = await _teamService.CreateTeamAsync(createTeamDTO);
                return CreatedAtAction(nameof(GetTeamById), new { id = createdTeam.Id }, createdTeam);
            }
            catch (Exception)
            {
                return StatusCode(500, "Error occured while creating team");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeam(int id, [FromBody] CreateTeamDTO updateTeamDTO)
        {
            if (updateTeamDTO == null)
            {
                return BadRequest("Team object is null");
            }

            try
            {
                var updatedTeam = await _teamService.UpdateTeamAsync(id, updateTeamDTO);
                if (updatedTeam == null)
                {
                    return NotFound(new { message = $"Team not found" });
                }
                return Ok(updatedTeam);
            }
            catch (Exception)
            {
                return StatusCode(500, "Error occured while creating team");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            try
            {
                var isDeleted = await _teamService.DeleteTeamAsync(id);
                if (!isDeleted)
                {
                    return NotFound($"Team not found");
                }
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, "Error occured while creating team");
            }
        }
    }
}
