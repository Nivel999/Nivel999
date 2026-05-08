using System.Text.Json;
using Busca_CEP.Models;

namespace Busca_CEP.Services
{
    public class CepService
    {
        private readonly HttpClient _httpClient;

        public CepService()
        {
            _httpClient = new HttpClient();
        }

        public async Task<Endereco> BuscarCepAsync(string cep)
        {
            string url = $"https://viacep.com.br/ws/{cep}/json/";
            
            var resposta = await _httpClient.GetStringAsync(url);
            return JsonSerializer.Deserialize<Endereco>(resposta);
        }
    }
}