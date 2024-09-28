using Microsoft.EntityFrameworkCore;
using TeamGoalSystem.Data.ContextDb;
using TeamGoalSystem.Data.Models;
using TeamGoalSystem.Repository.Interfaces;

namespace TeamGoalSystem.Repository
{
    public class TeamRepository : ITeamRepository
    {
        private readonly GoalSystemContext _db;

        public TeamRepository(GoalSystemContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Team>> GetAllAsync()
        {
            return await _db.Teams.Where(t => !t.IsDeleted).ToListAsync();
        }

        public async Task<Team?> GetByIdAsync(int id)
        {
            return await _db.Teams.FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);
        }

        public async Task<Team> AddAsync(Team team)
        {
            _db.Teams.Add(team);
            await _db.SaveChangesAsync();
            return team;
        }

        public async Task<Team?> UpdateAsync(Team team)
        {
            if (team == null || team.IsDeleted) return null;

            _db.Entry(team).CurrentValues.SetValues(team);
            await _db.SaveChangesAsync();
            return team;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var team = await _db.Teams.FindAsync(id);
            if (team == null || team.IsDeleted) return false;

            team.IsDeleted = true;
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
