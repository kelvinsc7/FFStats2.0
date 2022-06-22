using System.ComponentModel.DataAnnotations.Schema;

namespace FFStats.Domain.Models
{
    [Table("tb_submodo")]
    public class Submodo{
        public int submodoId { get; set; }
        public string submodoDescricao { get; set; }
        public int modoId { get; set; }
        public Modo modo { get; set; }
    }
}