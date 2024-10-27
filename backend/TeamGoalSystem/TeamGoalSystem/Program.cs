
using Microsoft.EntityFrameworkCore;
using TeamGoalSystem.Data.ContextDb;
using TeamGoalSystem.Repository.Interfaces;
using TeamGoalSystem.Repository;
using TeamGoalSystem.Services.Interfaces;
using TeamGoalSystem.Services;
using FluentValidation;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;
using TeamGoalSystem.Helpers;
using TeamGoalSystem.Auth.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TeamGoalSystem.Auth;
using Microsoft.OpenApi.Models;

namespace TeamGoalSystem
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            builder.Services.AddDbContext<GoalSystemContext>(options =>
                   options.UseSqlServer(builder.Configuration["ConnectionStrings:AzureSQL"]));

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Goal system API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Enter: Bearer <token>"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });


            // Register repositories as transient
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddTransient<ITeamRepository, TeamRepository>();
            builder.Services.AddTransient<IMemberRepository, MemberRepository>();
            builder.Services.AddTransient<IGoalRepository, GoalRepository>();

            // Register services as transient
            builder.Services.AddTransient<ITeamService, TeamService>();
            builder.Services.AddTransient<IMemberService, MemberService>();
            builder.Services.AddTransient<IGoalService, GoalService>();
            builder.Services.AddTransient<JwtTokenService>();
            builder.Services.AddScoped<AuthSeeder>();
            builder.Services.AddTransient<SessionService>();

            //add validation
            builder.Services.AddValidatorsFromAssemblyContaining<Program>();
            builder.Services.AddFluentValidationAutoValidation(configuration =>
            {
                configuration.DisableBuiltInModelValidation = true;
                configuration.OverrideDefaultResultFactoryWith<ProblemDetailsResultFactory>();
            });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAnyOrigin", policyBuilder => policyBuilder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });
            builder.Services.AddMvc();
            builder.Services.AddControllers();


            builder.Services.AddIdentity<GoalSystemUser, IdentityRole>()
                .AddEntityFrameworkStores<GoalSystemContext>()
                .AddDefaultTokenProviders();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.MapInboundClaims = false;
                options.TokenValidationParameters.ValidAudience = builder.Configuration["Jwt:ValidAudience"];
                options.TokenValidationParameters.ValidIssuer = builder.Configuration["Jwt:ValidIssuer"];
                options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]));
            });

            builder.Services.AddAuthorization();

            var app = builder.Build();

            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseRouting();
            app.UseHttpsRedirection();

            app.UseCors(options =>
            {
                options.SetIsOriginAllowed(_ => true)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithExposedHeaders("Content-Disposition");
            });

            app.UseAuthentication();

            app.UseAuthorization();

            using var scope = app.Services.CreateScope();

            var dbContext = scope.ServiceProvider.GetRequiredService<GoalSystemContext>();
            dbContext.Database.Migrate();

            var dbSeeder = scope.ServiceProvider.GetRequiredService<AuthSeeder>();
            dbSeeder.SeedAsync().Wait();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapRazorPages();
            });

            app.Run();
        }
    }
}
