using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Busca_CEP.Data;
using Busca_CEP.Models;

namespace Busca_CEP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsuarioController(AppDbContext context)
        {
            _context = context;
        }
        
        // CADASTRO
        [HttpPost("registrar")]
        public async Task<IActionResult> Registrar([FromBody] Usuario novoUsuario)
        {
            if (await _context.Usuarios.AnyAsync(u => u.Login == novoUsuario.Login))
                return BadRequest("Este usuário já existe.");

            _context.Usuarios.Add(novoUsuario);
            await _context.SaveChangesAsync();
            return Ok(novoUsuario);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginInfo)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Login == loginInfo.Login && u.Senha == loginInfo.Senha);

            if (usuario == null) return Unauthorized("Usuário ou senha incorretos.");

            return Ok(usuario);
        }
    }

    public class LoginDTO
    {
        public string Login { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
    }
}