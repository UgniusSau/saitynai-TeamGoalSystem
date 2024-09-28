namespace TeamGoalSystem.Data.Models.DTO
{
    public record TeamDTO(
        int Id,
        string Title,
        string Office,
        string Division,
        DateTime Created,
        string TeamLeaderName
    );

    public record CreateTeamDTO(
        string Title,
        string Office,
        string Division,
        string TeamLeaderName
    );
}