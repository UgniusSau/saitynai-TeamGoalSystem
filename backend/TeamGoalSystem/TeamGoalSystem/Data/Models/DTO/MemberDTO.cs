namespace TeamGoalSystem.Data.Models.DTO
{
    public record MemberDTO(
         int Id,
         string Name,
         string Surname,
         string Role,
         string Email,
         DateTime JoinDate
    );

    public record CreateMemberDTO(
        string Name,
        string Surname,
        string Role,
        string Email,
        DateTime JoinDate
    );
}
