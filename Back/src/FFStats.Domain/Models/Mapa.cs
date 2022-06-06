using System.Collections.Generic;

namespace FFStats.Domain.Models
{
    public class Mapa
    {
        public int Id { get; set; }
        public string mapaNome { get; set; }
        public IEnumerable<Call> Calls { get; set; }
    }
}