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

        // 1. Note o '?' depois de Endereco. Isso diz: "Pode ser que eu não encontre nada"
        public async Task<Endereco?> BuscarCepAsync(string cep)
        {
            string url = $"https://viacep.com.br/ws/{cep}/json/";
            
            try 
            {
                var resposta = await _httpClient.GetStringAsync(url);
                
                var resultado = JsonSerializer.Deserialize<Endereco>(resposta);

                // 2. O '??' é um segurança: se o resultado for nulo, ele cria um Endereco vazio
                return resultado ?? new Endereco();
            }
            catch
            {
                // Se der erro na internet ou o CEP não existir, retorna um objeto vazio
                return new Endereco();
            }
        }
    }
}