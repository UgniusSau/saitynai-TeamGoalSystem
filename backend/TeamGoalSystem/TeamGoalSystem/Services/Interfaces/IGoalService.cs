using TeamGoalSystem.Data.Models.DTO;

namespace TeamGoalSystem.Services.Interfaces
{
    public interface IGoalService
    {
        Task<IEnumerable<GoalDTO>> GetAllTeamMemberGoalsAsync(int teamId, int memberId);
        Task<GoalDTO> GetTeamMemberGoalByIdAsync(int teamId, int memberId, int goalId);
        Task<GoalDTO> CreateTeamMemberGoalAsync(int teamId, int memberId, CreateGoalDTO createGoalDTO);
        Task<GoalDTO> UpdateTeamMemberGoalAsync(int teamId, int memberId, int goalId, UpdateGoalDTO updateGoalDTO);
        Task DeleteTeamMemberGoalAsync(int teamId, int memberId, int goalId);
    }
}
