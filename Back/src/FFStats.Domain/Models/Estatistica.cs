using System.ComponentModel.DataAnnotations.Schema;

namespace FFStats.Domain.Models
{
    [Table("tb_estatistica")]
    public class Estatisticas
    {
        public int id { get; set; }
        public int partidaId { get; set; }
        public Partida Partida { get; set; }
        public int jogadorId { get; set; }
        public Jogador Jogador { get; set; }
        public int Kill { get; set; }
        public int Morte { get; set; }
        public int Assistencia { get; set; }
        public int Dano { get; set; } 
        public int Derrubado { get; set; } 
        public int Cura { get; set; } 
        public int Levantados { get; set; } 
        public int Ressucitou { get; set; }
        public int Tempo { get; set; }
    }
}