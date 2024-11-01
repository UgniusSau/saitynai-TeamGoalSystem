﻿using TeamGoalSystem.Data.Models;
using TeamGoalSystem.Data.Models.DTO;
using TeamGoalSystem.Repository.Interfaces;
using TeamGoalSystem.Services.Interfaces;
namespace TeamGoalSystem.Services
{
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository _teamRepository;

        public TeamService(ITeamRepository teamRepository)
        {
            _teamRepository = teamRepository;
        }

        public async Task<IEnumerable<TeamDTO>> GetAllTeamsAsync()
        {
            var teams = await _teamRepository.GetAllAsync();

            return teams.Select(team => team.ToDto());
        }

        public async Task<TeamDTO> GetTeamByIdAsync(int id)
        {
            var team = await _teamRepository.GetByIdAsync(id);

            if (team is null)
            {
                throw new Exception($"Team not found");
            }

            return team.ToDto();
        }

        public async Task<TeamDTO> CreateTeamAsync(CreateTeamDTO createTeamDTO, string userId)
        {
            var team = new Team
            {
                Title = createTeamDTO.Title,
                Office = createTeamDTO.Office,
                Division = createTeamDTO.Division,
                TeamLeaderName = createTeamDTO.TeamLeaderName,
                Created = DateTime.UtcNow,
                UserId = userId
            };

            var createdTeam = await _teamRepository.AddAsync(team);

            return createdTeam.ToDto();
        }

        public async Task<TeamDTO> UpdateTeamAsync(int id, UpdateTeamDTO updateTeamDTO, bool isAdmin, string userId)
        {
            Team? existingTeam = await _teamRepository.GetByIdAsync(id);

            if (!isAdmin)
            {
                if (existingTeam == null || existingTeam.UserId != userId)
                {
                    throw new Exception($"Team not found");
                }
            }

            existingTeam.Title = updateTeamDTO.Title ?? existingTeam.Title;
            existingTeam.Office = updateTeamDTO.Office ?? existingTeam.Office;
            existingTeam.Division = updateTeamDTO.Division ?? existingTeam.Division;
            existingTeam.TeamLeaderName = updateTeamDTO.TeamLeaderName ?? existingTeam.TeamLeaderName;

            var updatedTeam = await _teamRepository.UpdateAsync(existingTeam);

            return updatedTeam.ToDto();
        }

        public async Task DeleteTeamAsync(int id, bool isAdmin, string userId)
        {
            Team? existingTeam = await _teamRepository.GetByIdAsync(id);

            if (!isAdmin)
            {
                if (existingTeam == null || existingTeam.UserId != userId)
                {
                    throw new Exception($"Team not found");
                }
            }

            await _teamRepository.DeleteAsync(id);
        }
    }
}
