using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FFStats.Application.Dtos
{
    public class modoDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public string modoDescricao { get; set; }
        public IEnumerable<subModoDto> SubModos { get; set; }
    }
}