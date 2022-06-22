using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FFStats.Application.Dtos
{
    public class mapaDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public string mapaNome { get; set; }
        public IEnumerable<callDto> Calls { get; set; }
    }
}