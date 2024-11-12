using System.ComponentModel.DataAnnotations;

namespace FFStats.Application.Dtos
{
    public class ConfiguracaoDTO
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="O campo Nome deve ser um campo valido")]
        public string Nome { get; set; }
        [Required(ErrorMessage ="O campo Ativo deve ser um campo valido")]
        public bool Ativo { get; set; }

    }
}