using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFStats.Domain.Models
{
    [Table("tb_jogador")]
    public class Jogador
    {
       public int id { get; set; }
       public string jogadorNome { get; set; }
       public string jogadorNick { get; set; }
       public int idJogo { get; set; }
       // Foreign key for Line
       public int lineId { get; set; }
       // Navigation property for Line
       [ForeignKey("lineId")] 
       public Line Line{ get; set; }
       // Navigation property for PartidasJogadores
       public IEnumerable<PartidaJogador> PartidasJogadores { get; set; }

    }
}