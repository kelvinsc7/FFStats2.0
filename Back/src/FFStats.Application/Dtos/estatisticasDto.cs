using System.ComponentModel.DataAnnotations;

namespace FFStats.Application.Dtos
{
    public class estatisticasDto
    {
        public int id { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int partidaId { get; set; }
        public partidaDto Partida { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int jogadorId { get; set; }
        public jogadoresDto Jogador { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int Kill { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int Dano { get; set; } 
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int Tempo { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int Assistencia { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int Ressucitado { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int Salvador { get; set; }
    }
}