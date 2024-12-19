using System.Threading.Tasks;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface IEstatisticasService
    {
         Task<estatisticasDto[]> SaveEstatistica(int EstatisticasId, estatisticasDto[] models);
         Task<bool> DeleteEstatisticas(int partidaId, int EstatisticasId);
         Task<estatisticasDto[]> GetEstatisticasByPartidaIdAsync(int partidaId);
         Task<estatisticasDto[]> GetEstatisticasByJogadorIdAsync(int jogadorId);
         Task<estatisticasDto[]> GetAllEstatisticas();
         Task<estatisticasDto> GetEstatisticasByIdsAsync(int partidaId, int EstatisticasId);
    }
}