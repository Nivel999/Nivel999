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

        // Injeção de dependência: O ASP.NET entrega o Banco e o Serviço aqui
        public CepController(AppDbContext context, CepService cepService)
        {
            _context = context;
            _cepService = cepService;
        }

        // 1. ADICIONAR (POST): Busca na API e já grava no MySQL
        // Exemplo de URL: /api/cep/01001000/1 (onde 1 é o ID do usuário)
        [HttpPost("{cep}/{usuarioId}")]
        public async Task<IActionResult> SalvarEndereco(string cep, int usuarioId)
        {
            var endereco = await _cepService.BuscarCepAsync(cep);
            
            if (endereco == null || string.IsNullOrEmpty(endereco.cep)) 
                return BadRequest("CEP não encontrado ou inválido.");

            // Vincula o endereço ao usuário logado
            endereco.UsuarioId = usuarioId;

            _context.Enderecos.Add(endereco);
            await _context.SaveChangesAsync();

            return Ok(endereco);
        }

        // 2. VISUALIZAR (GET): Lista endereços de um usuário específico
        [HttpGet("usuario/{usuarioId}")]
        public async Task<IActionResult> Listar(int usuarioId)
        {
            var lista = await _context.Enderecos
                .Where(e => e.UsuarioId == usuarioId)
                .ToListAsync();

            return Ok(lista);
        }

        // 3. EDITAR (PUT): Permite mudar o complemento ou número
        [HttpPut("{id}")]
        public async Task<IActionResult> Editar(int id, [FromBody] Endereco enderecoAtualizado)
        {
            var enderecoNoBanco = await _context.Enderecos.FindAsync(id);
            if (enderecoNoBanco == null) return NotFound("Endereço não encontrado.");

            // Atualiza apenas os campos editáveis
            enderecoNoBanco.complemento = enderecoAtualizado.complemento;
            // Se você tiver um campo 'numero' no Model, adicione aqui também
            
            await _context.SaveChangesAsync();
            return Ok(enderecoNoBanco);
        }

        // 4. EXCLUIR (DELETE)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Excluir(int id)
        {
            var endereco = await _context.Enderecos.FindAsync(id);
            if (endereco == null) return NotFound();

            _context.Enderecos.Remove(endereco);
            await _context.SaveChangesAsync();

            return NoContent(); // Retorna 204 (Sucesso, mas sem conteúdo no corpo)
        }
    }
}