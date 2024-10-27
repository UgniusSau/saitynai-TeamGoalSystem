using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TeamGoalSystem.Auth.Model;
using TeamGoalSystem.Data.Models.DTO;
using TeamGoalSystem.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;

namespace TeamGoalSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GController : ControllerBase
    {
        [Authorize]
        [HttpGet]
       
        public async Task<IActionResult> GetAllTeams()
        {
            return Ok("hi");
        }
    }
}
