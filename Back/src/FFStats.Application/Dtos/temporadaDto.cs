using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FFStats.Application.Dtos
{
    public class temporadaDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public string Descricao { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public DateTime Inicio { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public DateTime Fim { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public ICollection<estatisticasRankDto> EstatisticasRanks { get; set; }
    }
}