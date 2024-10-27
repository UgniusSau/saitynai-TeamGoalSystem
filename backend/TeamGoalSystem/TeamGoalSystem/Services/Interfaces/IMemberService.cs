using TeamGoalSystem.Data.Models.DTO;

namespace TeamGoalSystem.Services.Interfaces
{
    public interface IMemberService
    {
        Task<IEnumerable<MemberDTO>> GetAllTeamMembersAsync(int teamId);
        Task<MemberDTO> GetTeamMemberByIdAsync(int teamId, int memberId);
        Task<MemberDTO> CreateTeamMemberAsync(int teamId, CreateMemberDTO createMemberDTO, string userId);
        Task<MemberDTO> UpdateTeamMemberAsync(int teamId, int memberId, UpdateMemberDTO updateMemberDTO, bool isAdmin, string userId);
        Task DeleteTeamMemberAsync(int teamId, int memberId, bool isAdmin, string userId);
    }
}
