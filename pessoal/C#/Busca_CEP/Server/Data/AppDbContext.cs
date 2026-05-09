using Microsoft.EntityFrameworkCore;
using Busca_CEP.Models;

namespace Busca_CEP.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // A tabela de Endereços
        public DbSet<Endereco> Enderecos { get; set; }
        
        // A tabela de Usuários (Olha o plural aqui!)
        public DbSet<Usuario> Usuarios { get; set; }
    }
}