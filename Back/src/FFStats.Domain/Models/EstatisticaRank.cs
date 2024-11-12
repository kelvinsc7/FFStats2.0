using System.ComponentModel.DataAnnotations.Schema;

namespace FFStats.Domain.Models
{
    [Table("tb_estatistica_rank")]
    public class EstatisticasRank
    {
        public int Id { get; set; }

        // Chave estrangeira para Temporada
        public int TemporadaId { get; set; }
        public Temporada Temporada { get; set; }

        // Chave estrangeira para Jogador
        public int JogadorId { get; set; }
        public Jogador Jogador { get; set; }

        public string Modelo { get; set; }
        public int Partidas { get; set; }
        public int Kills { get; set; }
        public int Mortes { get; set; }
        public double DistanciaPercorrida { get; set; }
        public int TempoSobrevivido { get; set; }
        public int Revividos { get; set; }
        public int MaiorKill { get; set; }
        public int Dano { get; set; }
        public int Capa { get; set; }
        public int Derrubados { get; set; }
    }
}