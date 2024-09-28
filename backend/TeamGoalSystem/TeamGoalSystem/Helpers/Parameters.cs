using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.CodeAnalysis;

namespace TeamGoalSystem.Helpers
{
    public class TeamParameters
    {
        [FromRoute(Name = "teamId")]
        public int TeamId { get; set; }
    }

    public class MemberParameters
    {
        [FromRoute(Name = "teamId")]
        public int TeamId { get; set; }

        [FromRoute(Name = "memberId")]
        public int MemberId { get; set; }
    }

    public class GoalParameters
    {
        [FromRoute(Name = "teamId")]
        public int TeamId { get; set; }

        [FromRoute(Name = "memberId")]
        public int MemberId { get; set; }

        [FromRoute(Name = "goalId")]
        public int GoalId { get; set; }
    }
}
