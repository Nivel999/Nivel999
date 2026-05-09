using Busca_CEP.Services;
using Busca_CEP.Data; // Adicionei para ele achar o AppDbContext
using Microsoft.EntityFrameworkCore; // Necessário para o UseMySql

var builder = WebApplication.CreateBuilder(args);

// 1. Pegamos a configuração do appsettings.json (O jeito certo)
// Certifique-se que no seu appsettings.json o nome seja "DefaultConnection"
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
                       ?? "Server=127.0.0.1;Database=Busca_CEP;Uid=root;Pwd=davi123;";

// 2. CONFIGURAÇÃO DOS SERVIÇOS
builder.Services.AddControllers();

// Configura o Entity Framework com MySQL (Pomelo)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddScoped<CepService>();

// Configura o CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTudo",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

// 3. PIPELINE DE EXECUÇÃO
app.UseCors("PermitirTudo");
app.MapControllers();

app.Run();