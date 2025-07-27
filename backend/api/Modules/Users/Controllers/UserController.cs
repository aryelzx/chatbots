using Microsoft.AspNetCore.Mvc;
using ModularApi.Infrastructure.Data;
using ModularApi.Modules.Users.Models;

namespace ModularApi.Modules.Users.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() => Ok();
    }
}
