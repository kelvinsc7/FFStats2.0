using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFStats.Domain.Models
{
    [Table("tb_temporada")]
    public class Temporada
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public DateTime Inicio { get; set; }
        public DateTime Fim { get; set; }

    // Relacionamento com EstatisticasRank
        public ICollection<EstatisticasRank> EstatisticasRanks { get; set; }
    }
}