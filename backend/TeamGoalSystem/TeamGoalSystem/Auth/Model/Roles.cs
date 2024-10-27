namespace TeamGoalSystem.Auth.Model
{
    public class Roles
    {
        public const string Admin = nameof(Admin);
        public const string TeamLeader = nameof(TeamLeader);

        public static readonly IReadOnlyCollection<string> All = new[] { Admin, TeamLeader };
    }
}
