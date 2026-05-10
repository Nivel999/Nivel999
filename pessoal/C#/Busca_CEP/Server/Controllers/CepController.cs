using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Busca_CEP.Data;
using Busca_CEP.Models;
using Busca_CEP.Services;

namespace Busca_CEP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CepController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly CepService _cepService;

        public CepController(AppDbContext context, CepService cepService)
        {
            _context = context;
            _cepService = cepService;
        }

        [HttpPost("{cep}/{usuarioId}")]
        public async Task<IActionResult> SalvarEndereco(string cep, int usuarioId)
        {
            var endereco = await _cepService.BuscarCepAsync(cep);
            
            if (endereco == null || string.IsNullOrEmpty(endereco.cep)) 
                return BadRequest("CEP não encontrado ou inválido.");

            endereco.UsuarioId = usuarioId;

            _context.Enderecos.Add(endereco);
            await _context.SaveChangesAsync();

            return Ok(endereco);
        }

        [HttpGet("usuario/{usuarioId}")]
        public async Task<IActionResult> Listar(int usuarioId)
        {
            var lista = await _context.Enderecos
                .Where(e => e.UsuarioId == usuarioId)
                .ToListAsync();

            return Ok(lista);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Editar(int id, [FromBody] Endereco enderecoAtualizado)
        {
            var enderecoNoBanco = await _context.Enderecos.FindAsync(id);
            if (enderecoNoBanco == null) return NotFound("Endereço não encontrado.");

            enderecoNoBanco.complemento = enderecoAtualizado.complemento;
            
            await _context.SaveChangesAsync();
            return Ok(enderecoNoBanco);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Excluir(int id)
        {
            var endereco = await _context.Enderecos.FindAsync(id);
            if (endereco == null) return NotFound();
            _context.Enderecos.Remove(endereco);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}