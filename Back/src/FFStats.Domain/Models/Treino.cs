using System.Collections.Generic;

namespace FFStats.Domain.Models
{
    public class Treino
    {
        public int treinoId { get; set; }
        public string treinoDescricao { get; set; }
        public IEnumerable<Partida> Partidas { get; set; }
    }
}