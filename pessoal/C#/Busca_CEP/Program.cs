using System;
using System.Net.Http; // Ferramenta para navegar na internet
using System.Threading.Tasks; // Ferramenta para tarefas que levam tempo

class Program
{
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
        }
        catch (Exception) 
        {
            Console.WriteLine("Erro: Verifique se o CEP tem 8 dígitos ou se você está sem internet.");
        }

        Console.WriteLine("\nPresione qualquer tecla para sair...");
        Console.ReadKey();
    }
}