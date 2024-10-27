using TeamGoalSystem.Data.Models;
using TeamGoalSystem.Data.Models.DTO;
using TeamGoalSystem.Repository.Interfaces;
using TeamGoalSystem.Services.Interfaces;

namespace TeamGoalSystem.Services
{
    public class GoalService : IGoalService
    {
        private readonly IMemberRepository _memberRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IGoalRepository _goalRepository;

        public GoalService(ITeamRepository teamRepository, IMemberRepository memberRepository, IGoalRepository goalRepository)
        {
            _teamRepository = teamRepository;
            _memberRepository = memberRepository;
            _goalRepository = goalRepository;
        }

        public async Task<IEnumerable<GoalDTO>> GetAllTeamMemberGoalsAsync(int teamId, int memberId)
        {
            var team = await _teamRepository.GetByIdAsync(teamId) ?? throw new Exception($"Team not found");
            var members = await _memberRepository.GetTeamMemberByIdAsync(teamId, memberId) ?? throw new Exception($"Member not found");

            var goals = await _goalRepository.GetAllTeamMemberGoalsAsync(memberId);

            return goals.Select(goal => goal.ToDto());
        }

        public async Task<GoalDTO> GetTeamMemberGoalByIdAsync(int teamId, int memberId, int goalId)
        {
            var team = await _teamRepository.GetByIdAsync(teamId);

            if (team is null)
            {
                throw new Exception($"Team not found");
            }

            var member = await _memberRepository.GetTeamMemberByIdAsync(teamId, memberId);

            if (member is null)
            {
                throw new Exception($"Member not found");
            }

            var goal = await _goalRepository.GetTeamMemberGoalByIdAsync(memberId, goalId);

            if (goal is null)
            {
                throw new Exception($"Goal not found");
            }

            return goal.ToDto();
        }

        public async Task<GoalDTO> CreateTeamMemberGoalAsync(int teamId, int memberId, CreateGoalDTO createGoalDTO, string userId)
        {
            var team = await _teamRepository.GetByIdAsync(teamId);

            if (team is null)
            {
                throw new Exception($"Team not found");
            }

            var member = await _memberRepository.GetTeamMemberByIdAsync(teamId, memberId);

            if (member is null)
            {
                throw new Exception($"Member not found");
            }

            var goal = new Goal
            {
                Title = createGoalDTO.Title,
                Description = createGoalDTO.Description,
                CreatedDate = DateTime.UtcNow,
                FinishDate = createGoalDTO.FinishDate,
                IsCompleted = createGoalDTO.IsCompleted,
                Member = member,
                UserId = userId
            };

            var createdGoal = await _goalRepository.AddTeamMemberGoalAsync(goal);

            return createdGoal.ToDto();
        }

        public async Task<GoalDTO> UpdateTeamMemberGoalAsync(int teamId, int memberId, int goalId, UpdateGoalDTO updateGoalDTO, bool isAdmin, string userId)
        {
            var existingTeam = await _teamRepository.GetByIdAsync(teamId) ?? throw new Exception($"Team not found");
            var existingMember = await _memberRepository.GetTeamMemberByIdAsync(teamId, memberId) ?? throw new Exception($"Member not found");

            Goal? existingGoal = await _goalRepository.GetTeamMemberGoalByIdAsync(memberId, goalId);

            if (!isAdmin)
            {
                if (existingGoal == null || existingGoal.UserId != userId)
                {
                    throw new Exception($"Goal not found");
                }
            }

            existingGoal.Title = updateGoalDTO.Title ?? existingGoal.Title;
            existingGoal.Description = updateGoalDTO.Description ?? existingGoal.Description;
            existingGoal.FinishDate = updateGoalDTO.FinishDate ?? existingGoal.FinishDate;
            existingGoal.IsCompleted = updateGoalDTO.IsCompleted ?? existingGoal.IsCompleted;

            var updatedGoal = await _goalRepository.UpdateTeamMemberGoalAsync(existingGoal);

            return updatedGoal.ToDto();
        }
       
        public async Task DeleteTeamMemberGoalAsync(int teamId, int memberId, int goalId, bool isAdmin, string userId)
        {
            var existingTeam = await _teamRepository.GetByIdAsync(teamId) ?? throw new Exception($"Team not found");
            var existingMember = await _memberRepository.GetTeamMemberByIdAsync(teamId, memberId) ?? throw new Exception($"Member not found");
            Goal? existingGoal = await _goalRepository.GetTeamMemberGoalByIdAsync(memberId, goalId);

            if (!isAdmin)
            {
                if (existingGoal == null || existingGoal.UserId != userId)
                {
                    throw new Exception($"Goal not found");
                }
            }

            await _goalRepository.DeleteTeamMemberGoalAsync(memberId, goalId);
        }
    }
}
