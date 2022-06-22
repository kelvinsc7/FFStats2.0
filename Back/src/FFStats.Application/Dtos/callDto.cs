using System.ComponentModel.DataAnnotations;

namespace FFStats.Application.Dtos
{
    public class callDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="O campo cidade deve ser um campo valido")]
        public string callCidade { get; set; }
        public int mapaId { get; set; }
        public mapaDto mapa { get; set; }
    }
}