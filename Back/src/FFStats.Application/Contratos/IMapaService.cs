using System.Threading.Tasks;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface IMapaService
    {
         Task<mapaDto> AddMapas(mapaDto model);
         Task<mapaDto> UpdateMapas(int MapaId, mapaDto model);
         Task<bool> DeleteMapa(int MapaId);
         Task<mapaDto[]> GetAllMapasAsync(bool IncludeCall = false);
         Task<mapaDto> GetMapasByIdAsync(int MapaId, bool IncludeCall = false);
         Task<mapaDto[]> GetAllMapasByDescAsync(string Desc, bool IncludeCall = false);
    }
}