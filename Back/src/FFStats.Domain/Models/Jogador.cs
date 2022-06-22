using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFStats.Domain.Models
{
    [Table("tb_jogador")]
    public class Jogador
    {
       public int Id { get; set; }
       public string jogadorNome { get; set; }
       public string jogadorNick { get; set; }
       public IEnumerable<PartidaJogador> PartidasJogadores { get; set; }

    }
}