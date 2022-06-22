using System.Threading.Tasks;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface IEstatisticasService
    {
         Task<estatisticasDto> AddEstatisticass(estatisticasDto model);
         Task<estatisticasDto> UpdateEstatisticass(int EstatisticasId, estatisticasDto model);
         Task<bool> DeleteEstatisticas(int EstatisticasId);
         Task<estatisticasDto[]> GetAllEstatisticassAsync(bool InlcudeAll = false);
         Task<estatisticasDto> GetEstatisticassByIdAsync(int EstatisticasId, bool InlcudeAll = false);
         Task<estatisticasDto[]> GetAllEstatisticassByDescAsync(string Desc, bool InlcudeAll = false);
    }
}