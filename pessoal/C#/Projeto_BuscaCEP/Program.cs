var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer(); // Adicione isso
builder.Services.AddSwaggerGen();           // Adicione isso (remova o AddOpenApi)

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();   // Adicione isso
    app.UseSwaggerUI(); // Adicione isso
}

// app.UseHttpsRedirection(); // Comente se continuar dando erro de porta HTTPS
app.UseAuthorization();
app.MapControllers();
app.Run();