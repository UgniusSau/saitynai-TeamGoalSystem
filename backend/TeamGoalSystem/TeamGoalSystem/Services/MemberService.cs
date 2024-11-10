using TeamGoalSystem.Data.Models;
using TeamGoalSystem.Data.Models.DTO;
using TeamGoalSystem.Repository.Interfaces;
using TeamGoalSystem.Services.Interfaces;

namespace TeamGoalSystem.Services
{
    public class MemberService : IMemberService
    {
        private readonly IMemberRepository _memberRepository;
        private readonly ITeamRepository _teamRepository;

        public MemberService(ITeamRepository teamRepository, IMemberRepository memberRepository)
        {
            _teamRepository = teamRepository;
            _memberRepository = memberRepository;
        }

        public async Task<IEnumerable<MemberDTO>> GetAllTeamMembersAsync(int teamId)
        {
            var team = await _teamRepository.GetByIdAsync(teamId) ?? throw new Exception($"Team not found");

            var members = await _memberRepository.GetAllTeamMembersAsync(teamId);

            return members.Select(member => member.ToDto());
        }

        public async Task<MemberDTO> GetTeamMemberByIdAsync(int teamId, int memberId)
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

            return member.ToDto();
        }

        public async Task<MemberDTO> CreateTeamMemberAsync(int teamId, CreateMemberDTO createMemberDTO, string userId)
        {
            var team = await _teamRepository.GetByIdAsync(teamId);

            if (team is null)
            {
                throw new Exception($"Team not found");
            }

            var member = new Member
            {
                Name = createMemberDTO.Name,
                Surname = createMemberDTO.Surname,
                Role = createMemberDTO.Role,
                Email = createMemberDTO.Email,
                JoinDate = createMemberDTO.JoinDate,
                Team = team,
                UserId = userId
            };

            var createdMember = await _memberRepository.AddTeamMemberAsync(member);

            return createdMember.ToDto();
        }

        public async Task<MemberDTO> UpdateTeamMemberAsync(int teamId, int memberId, UpdateMemberDTO member, bool isAdmin, string userId)
        {
            var existingTeam = await _teamRepository.GetByIdAsync(teamId) ?? throw new Exception($"Team not found");

            Member? existingMember = await _memberRepository.GetTeamMemberByIdAsync(teamId, memberId);

            if (!isAdmin)
            {
                if (existingMember == null || existingMember.UserId != userId)
                {
                    throw new Exception($"Member not found");
                }
            }

            existingMember.Name = member.Name ?? existingMember.Name;
            existingMember.Surname = member.Surname ?? existingMember.Surname;
            existingMember.Role = member.Role ?? existingMember.Role;
            existingMember.Email = member.Email ?? existingMember.Email;
            existingMember.JoinDate = member.JoinDate ?? existingMember.JoinDate;

            var updatedMember = await _memberRepository.UpdateTeamMemberAsync(existingMember);

            return updatedMember.ToDto();
        }


        public async Task DeleteTeamMemberAsync(int teamId, int memberId, bool isAdmin, string userId)
        {
            var existingTeam = await _teamRepository.GetByIdAsync(teamId) ?? throw new Exception($"Team not found");
            Member? existingMember = await _memberRepository.GetTeamMemberByIdAsync(teamId, memberId);

            if (!isAdmin)
            {
                if (existingMember == null || existingMember.UserId != userId)
                {
                    throw new Exception($"Member not found");
                }
            }

            await _memberRepository.DeleteTeamMemberAsync(teamId, memberId);
        }
    }
}
