using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFStats.Domain.Models
{
    [Table("tb_treino")]
    public class Treino
    {
        public int id { get; set; }
        public string treinoDescricao { get; set; }
        public IEnumerable<Partida> Partidas { get; set; }
    }
}