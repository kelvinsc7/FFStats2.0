namespace FFStats.Domain.Models
{
    public class PartidaJogador
    {
        public int JogadorId { get; set; }
        public Jogador Jogador { get; set; }
        public int PartidaId { get; set; }
        public Partida Partida { get; set; }
    }
}