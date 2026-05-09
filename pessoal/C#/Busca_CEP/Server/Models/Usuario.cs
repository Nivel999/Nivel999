using System.ComponentModel.DataAnnotations;

namespace Busca_CEP.Models
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; } = string.Empty;
        [Required]
        public string Login { get; set; } = string.Empty;
        [Required]
        public string Senha { get; set; } = string.Empty;
        public ICollection<Endereco> Enderecos { get; set; } = new List<Endereco>();
    }
}