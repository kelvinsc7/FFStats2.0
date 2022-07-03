using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FFStats.Application.Dtos
{
    public class partidaDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public string partidaDescricao { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int treinoId { get; set; }   
        public treinoDto treino { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int mapaId { get; set; }
        public mapaDto mapa { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int callId { get; set; }
        public callDto call { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int modoId { get; set; }
        public modoDto modo { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public int submodoId { get; set; }
        public subModoDto sumodo { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido")]
        public DateTime partidaData { get; set; }
        [Required(ErrorMessage ="O campo {0} deve ser um campo valido"),
         Range(1,54)]
        public int posicao { get; set; }
        public IEnumerable<partidajogadoresDto> Jogadores { get; set; }
        public IEnumerable<estatisticasDto> Estatisticas { get; set; }
    }
}