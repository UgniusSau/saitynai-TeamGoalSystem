using Microsoft.EntityFrameworkCore;
using TeamGoalSystem.Data.Models;

namespace TeamGoalSystem.Data.ContextDb
{
    public class GoalSystemContext : DbContext
    {
        public GoalSystemContext(DbContextOptions<GoalSystemContext> options)
            : base(options)
        {
        }

        public DbSet<Team> Teams { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Goal> Goals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
