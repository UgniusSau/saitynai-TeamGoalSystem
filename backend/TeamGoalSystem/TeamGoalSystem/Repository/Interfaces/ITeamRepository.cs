using TeamGoalSystem.Data.Models;

namespace TeamGoalSystem.Repository.Interfaces
{
    public interface ITeamRepository
    {
        Task<IEnumerable<Team>> GetAllAsync();
        Task<Team?> GetByIdAsync(int id);
        Task<Team> AddAsync(Team team);
        Task<Team> UpdateAsync(Team team);
        Task<bool> DeleteAsync(int id);
    }
}
