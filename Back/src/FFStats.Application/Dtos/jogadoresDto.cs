using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FFStats.Application.Dtos
{
    public class jogadoresDto
    {
        public int Id { get; set; }
       [Required(ErrorMessage ="O campo {0} deve ser um campo valido")] 
       public string jogadorNome { get; set; }
       [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
       public string jogadorNick { get; set; }
       public IEnumerable<partidaDto> Partidas{ get; set; }
    }
}