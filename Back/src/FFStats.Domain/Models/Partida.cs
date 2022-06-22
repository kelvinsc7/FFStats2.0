using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFStats.Domain.Models
{
    [Table("tb_partida")]
    public class Partida
    {
        public int Id { get; set; }
        public string partidaDescricao { get; set; }
        public int treinoId { get; set; }   
        public Treino treino { get; set; }
        public int mapaId { get; set; }
        public Mapa mapa { get; set; }
        public int callId { get; set; }
        public Call call { get; set; }
        public int modoId { get; set; }
        public Modo modo { get; set; }
        public int submodoId { get; set; }
        public Submodo sumodo { get; set; }
        public DateTime? partidaData { get; set; }
        public int posicao { get; set; }
        public IEnumerable<PartidaJogador> PartidasJogadores { get; set; }
        public IEnumerable<Estatisticas> Estatisticas { get; set; }
    }
}