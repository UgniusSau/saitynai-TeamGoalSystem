using TeamGoalSystem.Data.Models;
using TeamGoalSystem.Data.Models.DTO;

namespace TeamGoalSystem.Repository.Interfaces
{
    public interface IGoalRepository
    {
        Task<IEnumerable<Goal>> GetAllTeamMemberGoalsAsync(int memberId);
        Task<Goal?> GetTeamMemberGoalByIdAsync(int memberId, int goalId);
        Task<Goal> AddTeamMemberGoalAsync(Goal goal);
        Task<Goal> UpdateTeamMemberGoalAsync(Goal goal);
        Task<bool> DeleteTeamMemberGoalAsync(int memberId, int goalId);
    }
}
