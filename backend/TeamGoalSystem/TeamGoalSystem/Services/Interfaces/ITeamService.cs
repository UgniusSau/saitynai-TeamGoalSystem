using TeamGoalSystem.Data.Models;
using TeamGoalSystem.Data.Models.DTO;

namespace TeamGoalSystem.Services.Interfaces
{
    public interface ITeamService
    {
        Task<IEnumerable<TeamDTO>> GetAllTeamsAsync();
        Task<TeamDTO> GetTeamByIdAsync(int id);
        Task<TeamDTO> CreateTeamAsync(CreateTeamDTO team, string userId);
        Task<TeamDTO> UpdateTeamAsync(int id, UpdateTeamDTO team, bool isAdmin, string userId);
        Task DeleteTeamAsync(int id, bool isAdmin, string userId);
    }
}
