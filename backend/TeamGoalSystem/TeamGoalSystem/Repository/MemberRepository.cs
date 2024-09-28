using Microsoft.EntityFrameworkCore;
using TeamGoalSystem.Data.ContextDb;
using TeamGoalSystem.Data.Models;
using TeamGoalSystem.Repository.Interfaces;

namespace TeamGoalSystem.Repository
{
    public class MemberRepository : IMemberRepository
    {
        private readonly GoalSystemContext _db;

        public MemberRepository(GoalSystemContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Member>> GetAllTeamMembersAsync(int teamId)
        {
            return await _db.Members.Where(m => !m.IsDeleted && m.Team.Id.Equals(teamId)).ToListAsync();
        }
        public async Task<Member?> GetTeamMemberByIdAsync(int teamId, int memberId)
        {
            return await _db.Members.FirstOrDefaultAsync(m => m.Id == memberId && !m.IsDeleted && m.Team.Id.Equals(teamId));
        }

        public async Task<Member> AddTeamMemberAsync(Member member)
        {
            _db.Members.Add(member);
            await _db.SaveChangesAsync();
            return member;
        }

        public async Task<Member> UpdateTeamMemberAsync(Member member)
        {
            _db.Entry(member).CurrentValues.SetValues(member);
            await _db.SaveChangesAsync();
            return member;
        }

        public async Task<bool> DeleteTeamMemberAsync(int teamId, int memberId)
        {
            var member = await _db.Members.FirstOrDefaultAsync(m => m.Id == memberId && !m.IsDeleted && m.Team.Id.Equals(teamId));

            if (member == null || member.IsDeleted) return false;

            member.IsDeleted = true;
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
