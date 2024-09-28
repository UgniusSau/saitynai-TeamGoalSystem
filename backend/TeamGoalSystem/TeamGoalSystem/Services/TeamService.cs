using TeamGoalSystem.Data.Models;
using TeamGoalSystem.Data.Models.DTO;
using TeamGoalSystem.Repository.Interfaces;
using TeamGoalSystem.Services.Interfaces;
namespace TeamGoalSystem.Services
{
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository _teamRepository;

        public TeamService(ITeamRepository teamRepository)
        {
            _teamRepository = teamRepository;
        }

        public async Task<IEnumerable<TeamDTO>> GetAllTeamsAsync()
        {
            var teams = await _teamRepository.GetAllAsync();
            return teams.Select(team => new TeamDTO(
                team.Id,
                team.Title,
                team.Office,
                team.Division,
                team.Created,
                team.TeamLeaderName));
        }

        public async Task<TeamDTO> GetTeamByIdAsync(int id)
        {
            var team = await _teamRepository.GetByIdAsync(id);

            return team is null
                ? throw new Exception($"Team not found")
                : new TeamDTO(
                team.Id,
                team.Title,
                team.Office,
                team.Division,
                team.Created,
                team.TeamLeaderName);
        }

        public async Task<TeamDTO> CreateTeamAsync(CreateTeamDTO createTeamDTO)
        {
            var team = new Team
            {
                Title = createTeamDTO.Title,
                Office = createTeamDTO.Office,
                Division = createTeamDTO.Division,
                TeamLeaderName = createTeamDTO.TeamLeaderName,
                Created = DateTime.UtcNow
            };

            var createdTeam = await _teamRepository.AddAsync(team);

            return new TeamDTO(
                createdTeam.Id,
                createdTeam.Title,
                createdTeam.Office,
                createdTeam.Division,
                createdTeam.Created,
                createdTeam.TeamLeaderName);
        }

        public async Task<TeamDTO> UpdateTeamAsync(int id, CreateTeamDTO updateTeamDTO)
        {
            var existingTeam = await _teamRepository.GetByIdAsync(id) ?? throw new Exception($"Team not found");

            existingTeam.Title = updateTeamDTO.Title;
            existingTeam.Office = updateTeamDTO.Office;
            existingTeam.Division = updateTeamDTO.Division;
            existingTeam.TeamLeaderName = updateTeamDTO.TeamLeaderName;

            var updatedTeam = await _teamRepository.UpdateAsync(existingTeam);

            return new TeamDTO(
                updatedTeam.Id,
                updatedTeam.Title,
                updatedTeam.Office,
                updatedTeam.Division,
                updatedTeam.Created,
                updatedTeam.TeamLeaderName);
        }

        public async Task<bool> DeleteTeamAsync(int id)
        {
            return await _teamRepository.DeleteAsync(id);
        }
    }
}
