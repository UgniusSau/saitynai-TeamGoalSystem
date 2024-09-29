using Microsoft.EntityFrameworkCore;
using TeamGoalSystem.Data.ContextDb;
using TeamGoalSystem.Data.Models;
using TeamGoalSystem.Repository.Interfaces;

namespace TeamGoalSystem.Repository
{
    public class GoalRepository : IGoalRepository
    {
        private readonly GoalSystemContext _db;

        public GoalRepository(GoalSystemContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Goal>> GetAllTeamMemberGoalsAsync(int memberId)
        {
           return await _db.Goals.Where(g => !g.IsDeleted && g.Member.Id.Equals(memberId)).ToListAsync();
        }

        public async Task<Goal?> GetTeamMemberGoalByIdAsync(int memberId, int goalId)
        {
            return await _db.Goals.FirstOrDefaultAsync(g => g.Id == goalId && !g.IsDeleted && g.Member.Id.Equals(memberId));
        }

        public async Task<Goal> AddTeamMemberGoalAsync(Goal goal)
        {
            _db.Goals.Add(goal);
            await _db.SaveChangesAsync();
            return goal;
        }

        public async Task<Goal> UpdateTeamMemberGoalAsync(Goal goal)
        {
            _db.Entry(goal).CurrentValues.SetValues(goal);
            await _db.SaveChangesAsync();
            return goal;
        }

        public async Task<bool> DeleteTeamMemberGoalAsync(int memberId, int goalId)
        {
            var goal = await _db.Goals.FirstOrDefaultAsync(g => g.Id == goalId && !g.IsDeleted && g.Member.Id.Equals(memberId));

            if (goal == null || goal.IsDeleted) return false;

            goal.IsDeleted = true;
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
