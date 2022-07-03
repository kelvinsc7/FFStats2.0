using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFStats.Domain.Models
{
    //[Table("tb_mapa")]
    public class Mapa
    {
        public int Id { get; set; }
        public string mapaNome { get; set; }
        public IEnumerable<Call> Calls { get; set; }
    }
}