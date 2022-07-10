using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFStats.Domain.Models
{
    [Table("tb_Line")]
    public class Line
    {
        public int id { get; set; }
        public string lineNome { get; set; }
        public IEnumerable<Jogador> Jogadores { get; set; }
    }
}