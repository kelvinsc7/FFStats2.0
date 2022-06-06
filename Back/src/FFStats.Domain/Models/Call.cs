using FFStats.Domain.Models;
namespace FFStats.Domain.Models
{
    public class Call
    {
        public int Id { get; set; }
        public string callCidade { get; set; }
        public int mapaId { get; set; }
        public Mapa mapa { get; set; }
    }
}