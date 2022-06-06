using System.Collections.Generic;

namespace FFStats.Domain.Models
{
    public class Jogador
    {
       public int Id { get; set; }
       public string jogadorNome { get; set; }
       public string jogadorNick { get; set; }
       public IEnumerable<PartidaJogador> PartidasJogadores { get; set; }

    }
}