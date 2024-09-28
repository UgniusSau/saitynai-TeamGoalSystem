using TeamGoalSystem.Data.Models;

namespace TeamGoalSystem.Repository.Interfaces
{
    public interface IMemberRepository
    {
        Task<IEnumerable<Member>> GetAllTeamMembersAsync(int teamId);
        Task<Member?> GetTeamMemberByIdAsync(int teamId, int memberId);
        Task<Member> AddTeamMemberAsync(Member member);
        Task<Member> UpdateTeamMemberAsync(Member member);
        Task<bool> DeleteTeamMemberAsync(int teamId, int memberId);
    }
}
