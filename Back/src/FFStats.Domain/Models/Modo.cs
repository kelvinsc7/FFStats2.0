using System.Collections.Generic;

namespace FFStats.Domain.Models
{
    public class Modo{
        public int Id { get; set; }
        public string modoDescricao { get; set; }
        public IEnumerable<Submodo> SubModos { get; set; }
    }
}