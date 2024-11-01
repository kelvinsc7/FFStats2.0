using System.ComponentModel.DataAnnotations;

namespace FFStats.Application.Dtos
{
    public class estatisticasRankDto
    {
       public int Id { get; set; }
       [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int TemporadaId { get; set; }
        public temporadaDto Temporada { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int JogadorId { get; set; }
        public jogadoresDto Jogador { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]

        public string Modelo { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int Partidas { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int Kills { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int Mortes { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public double DistanciaPercorrida { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int TempoSobrevivido { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int Revividos { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int MaiorKill { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int Dano { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int Capa { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int Derrubados { get; set; }
        
    }
}