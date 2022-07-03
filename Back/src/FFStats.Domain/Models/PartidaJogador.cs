using System.ComponentModel.DataAnnotations.Schema;

namespace FFStats.Domain.Models
{
    //[Table("tb_partidajogador")]
    public class PartidaJogador
    {
        public int JogadorId { get; set; }
        public Jogador Jogador { get; set; }
        public int PartidaId { get; set; }
        public Partida Partida { get; set; }
    }
}