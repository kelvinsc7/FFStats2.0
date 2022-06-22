using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FFStats.Application.Dtos
{
    public class treinoDto
    {
        public int treinoId { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public string treinoDescricao { get; set; }
        public IEnumerable<partidaDto> Partidas { get; set; }
    }
}