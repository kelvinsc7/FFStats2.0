using System.ComponentModel.DataAnnotations;

namespace FFStats.Application.Dtos
{
    public class subModoDto
    {
        public int submodoId { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public string submodoDescricao { get; set; }
        public int modoId { get; set; }
        public modoDto modo { get; set; }
    }
}