using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface IMapaService
    {
         Task<Mapa> AddMapas(Mapa model);
         Task<Mapa> UpdateMapas(int MapaId, Mapa model);
         Task<bool> DeleteMapa(int MapaId);
         Task<Mapa[]> GetAllMapasAsync(bool IncludeCall = false);
         Task<Mapa> GetMapasByIdAsync(int MapaId, bool IncludeCall = false);
         Task<Mapa[]> GetAllMapasByDescAsync(string Desc, bool IncludeCall = false);
    }
}