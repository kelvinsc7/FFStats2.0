using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface IEstatisticasService
    {
         Task<Estatisticas> AddEstatisticass(Estatisticas model);
         Task<Estatisticas> UpdateEstatisticass(int EstatisticasId, Estatisticas model);
         Task<bool> DeleteEstatisticas(int EstatisticasId);
         Task<Estatisticas[]> GetAllEstatisticassAsync(bool InlcudeAll = false);
         Task<Estatisticas> GetEstatisticassByIdAsync(int EstatisticasId, bool InlcudeAll = false);
         Task<Estatisticas[]> GetAllEstatisticassByDescAsync(string Desc, bool InlcudeAll = false);
    }
}