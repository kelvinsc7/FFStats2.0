using System.ComponentModel.DataAnnotations.Schema;
namespace FFStats.Domain.Models
{
    [Table("tb_configuracao")]
    public class Configuracao
    {
        public int Id { get; set; }
        public string Nome { get; set; } 
        public bool Ativo { get; set; }
    }
}