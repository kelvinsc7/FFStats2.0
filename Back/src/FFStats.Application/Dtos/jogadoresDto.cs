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
       public int lineId { get; set; }
       public int idJogo { get; set; }
       public LineDto Line{ get; set; }
       public IEnumerable<partidajogadoresDto> PartidasJogadores{ get; set; }
    }
}