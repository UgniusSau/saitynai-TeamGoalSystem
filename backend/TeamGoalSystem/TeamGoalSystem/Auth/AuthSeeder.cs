using Microsoft.AspNetCore.Identity;
using TeamGoalSystem.Auth.Model;

namespace TeamGoalSystem.Auth
{
    public class AuthSeeder
    {
        private readonly UserManager<GoalSystemUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthSeeder(UserManager<GoalSystemUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        public async Task SeedAsync()
        {
            await AddDefaultRolesAsync();
            await AddAdminUserAsync();
        }

        private async Task AddAdminUserAsync()
        {
            var newAdmin = new GoalSystemUser()
            {
                Name = "Admin",
                Surname = "Admin",
                UserName = "Admin",
                Email = "admin@admin.lt"
            };

            var existAdminUser = await _userManager.FindByNameAsync(newAdmin.UserName);
            if (existAdminUser is null)
            {
                var createdAdmin = await _userManager.CreateAsync(newAdmin, _configuration["Admin:Password"]);
                if (createdAdmin.Succeeded)
                {
                    await _userManager.AddToRolesAsync(newAdmin, Roles.All);
                }
            }
        }

        private async Task AddDefaultRolesAsync()
        {
            foreach (var role in Roles.All)
            {
                var roleExist = await _roleManager.RoleExistsAsync(role);
                if (!roleExist)
                    await _roleManager.CreateAsync(new IdentityRole(role));
            }
        }
    }
}
