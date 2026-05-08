using Busca_CEP.Services;

var builder = WebApplication.CreateBuilder(args);

// --- 1. CONFIGURAÇÃO DOS SERVIÇOS ---
builder.Services.AddControllers();
builder.Services.AddScoped<CepService>();

// Adiciona a política de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTudo",
        policy =>
        {
            policy.AllowAnyOrigin() // Isso resolve o 'origin null'
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

// --- 2. CONFIGURAÇÃO DO PIPELINE (A ORDEM IMPORTA!) ---

// O UseCors deve vir ANTES do MapControllers
app.UseCors("PermitirTudo");

app.MapControllers();

app.Run();