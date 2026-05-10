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

        // CADASTRO (Agora usando DTO para evitar o Erro 400)
        [HttpPost("registrar")]
        public async Task<IActionResult> Registrar([FromBody] RegistroDTO dto)
        {
            // Validação de segurança extra
            if (string.IsNullOrWhiteSpace(dto.Login) || string.IsNullOrWhiteSpace(dto.Senha) || string.IsNullOrWhiteSpace(dto.Nome))
                return BadRequest("Preencha todos os campos.");

            // Verifica se já existe
            if (await _context.Usuarios.AnyAsync(u => u.Login == dto.Login))
                return BadRequest("Este usuário já existe.");

            // Pega os dados do DTO e transforma no Usuario oficial do Banco
            var novoUsuario = new Usuario
            {
                Nome = dto.Nome,
                Login = dto.Login,
                Senha = dto.Senha
            };

            _context.Usuarios.Add(novoUsuario);
            await _context.SaveChangesAsync();
            
            return Ok(novoUsuario);
        }

        // LOGIN (Já estava usando DTO e funcionando)
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginInfo)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Login == loginInfo.Login && u.Senha == loginInfo.Senha);

            if (usuario == null) return Unauthorized("Usuário ou senha incorretos.");

            return Ok(usuario);
        }
    }

    // --- CLASSES DTO (Data Transfer Objects) ---
    
    // Auxiliar para receber os dados do Login
    public class LoginDTO
    {
        public string Login { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
    }

    // Auxiliar para receber os dados do Cadastro
    public class RegistroDTO
    {
        public string Nome { get; set; } = string.Empty;
        public string Login { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
    }
}