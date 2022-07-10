using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FFStats.Application.Dtos
{
    public class LineDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public string lineNome { get; set; }
        public IEnumerable<jogadoresDto> Jogadores { get; set; }
    }
}