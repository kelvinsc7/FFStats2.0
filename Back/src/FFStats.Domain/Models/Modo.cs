using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFStats.Domain.Models
{
    [Table("tb_modo")]
    public class Modo{
        public int Id { get; set; }
        public string modoDescricao { get; set; }
        public IEnumerable<Submodo> SubModos { get; set; }
    }
}