using System.Threading.Tasks;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface IEstatisticasService
    {
         Task<estatisticasDto[]> SaveEstatistica(int EstatisticasId, estatisticasDto[] model);
         Task<bool> DeleteEstatisticas(int partidaId, int EstatisticasId);
         Task<estatisticasDto[]> GetEstatisticasByPartidaIdAsync(int partidaId);
         Task<estatisticasDto> GetEstatisticasByIdsAsync(int partidaId, int EstatisticasId);
    }
}