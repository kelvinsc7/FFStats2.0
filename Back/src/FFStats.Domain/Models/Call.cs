using System.ComponentModel.DataAnnotations.Schema;
using FFStats.Domain.Models;
namespace FFStats.Domain.Models
{
    [Table("tb_call")]
    public class Call
    {
        public int Id { get; set; }
        public string callCidade { get; set; }
        public int mapaId { get; set; }
        public Mapa mapa { get; set; }
    }
}