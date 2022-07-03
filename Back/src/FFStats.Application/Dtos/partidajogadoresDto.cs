namespace FFStats.Application.Dtos
{
    public class partidajogadoresDto
    {
        public int JogadorId { get; set; }
        public jogadoresDto Jogador { get; set; }
        public int PartidaId { get; set; }
        public partidaDto PartidasJogadores { get; set; }
    }
}