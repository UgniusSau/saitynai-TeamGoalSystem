
using Microsoft.EntityFrameworkCore;
using TeamGoalSystem.Data.ContextDb;
using TeamGoalSystem.Repository.Interfaces;
using TeamGoalSystem.Repository;
using TeamGoalSystem.Services.Interfaces;
using TeamGoalSystem.Services;

namespace TeamGoalSystem
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<GoalSystemContext>(options =>
                    options.UseSqlServer(builder.Configuration.GetConnectionString("AzureSQL")));

            // Register repositories as transient
            builder.Services.AddTransient<ITeamRepository, TeamRepository>();
            builder.Services.AddTransient<IMemberRepository, MemberRepository>();
            builder.Services.AddTransient<IGoalRepository, GoalRepository>();

            // Register services as transient
            builder.Services.AddTransient<ITeamService, TeamService>();
            builder.Services.AddTransient<IMemberService, MemberService>();
            builder.Services.AddTransient<IGoalService, GoalService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
