using Microsoft.AspNetCore.Identity;

namespace TeamGoalSystem.Auth.Model
{
    public class GoalSystemUser : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}
