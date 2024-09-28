namespace TeamGoalSystem.Data.Models.DTO
{
    public record GoalDTO(
        int Id,
        string Title,
        string Description,
        DateTime CreatedDate,
        DateTime FinishDate,
        bool IsCompleted
    );

    public record CreateGoalDTO(
        string Title,
        string Description,
        DateTime FinishDate,
        bool IsCompleted
    );

    public record UpdateGoalDTO(
        string Title,
        string Description,
        DateTime FinishDate,
        bool IsCompleted
    );
}
