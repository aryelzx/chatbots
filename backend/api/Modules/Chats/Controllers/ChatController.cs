using Microsoft.AspNetCore.Mvc;
using ModularApi.Infrastructure.Data;

namespace ModularApi.Modules.Chats.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ChatsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() => Ok();
    }
}
