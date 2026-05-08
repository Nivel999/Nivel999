using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
class Program
{
    public class Endereco
    {
        public string cep { get; set; }
        public string logradouro { get; set; }
        public string complemento { get; set; }
        public string bairro { get; set; }
        public string localidade { get; set; }
        public string uf { get; set; }
        public string ibge { get; set; }
    }
    // O 'async Task' permite que o programa espere a resposta da internet sem travar
    static async Task Main(string[] args)
    {
        // 1. Criamos o "navegador" que vai buscar os dados
        HttpClient cliente = new HttpClient();

        Console.WriteLine("Digite o seu CEP (somente números):");
        string cep = Console.ReadLine();

        // 2. Montamos o endereço da "cozinha" (API)
        string url = "https://viacep.com.br/ws/" + cep + "/json/";

        try

        {
            // 3. Fazemos o pedido e esperamos a resposta
            string resposta = await cliente.GetStringAsync(url);

            // 4. Exibimos o que a API nos mandou (o texto bruto)
            Console.WriteLine("\nDados recebidos:");
            Console.WriteLine(resposta);
            Endereco endereco = JsonSerializer.Deserialize<Endereco>(resposta);
            Console.WriteLine(endereco.logradouro);

        }
        catch (Exception)
        {
            Console.WriteLine("Erro: Verifique se o CEP tem 8 dígitos ou se você está sem internet.");

        }
        Console.WriteLine("\nPresione qualquer tecla para sair...");
        Console.ReadKey();

    }

}