using Microsoft.AspNetCore.Mvc;
using Busca_CEP.Services;

namespace Busca_CEP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CepController : ControllerBase
    {
        private readonly CepService _cepService;

        public CepController()
        {
            _cepService = new CepService(); 
        }

        [HttpGet("{cep}")]
        public async Task<IActionResult> Get(string cep)
        {
            var endereco = await _cepService.BuscarCepAsync(cep);
            if (endereco == null) return NotFound();
            
            return Ok(endereco);
        }
    }
}