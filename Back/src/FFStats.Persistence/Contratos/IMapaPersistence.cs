using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Persistence.Contratos
{
    public interface IMapaPersistence
    {
         //Mapa
        Task<Mapa[]> GetAllMapaByNomeAsync(string Nome, bool IncludeCalls);
         Task<Mapa[]> GetAllMapaAsync(bool IncludeCalls);
         Task<Mapa> GetAllMapaByIdAsync(int id, bool IncludeCalls);

    }
}