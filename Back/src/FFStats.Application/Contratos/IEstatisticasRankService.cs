using System.Threading.Tasks;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface IEstatisticasRankService
    {
         Task<estatisticasRankDto[]> SaveEstatisticaRank(int EstatisticasId, estatisticasRankDto[] models);
         Task<bool> DeleteEstatisticaRank(int Id);
         Task<estatisticasRankDto> GetEstatisticasRankByIdsAsync(int Id);
         Task<estatisticasRankDto[]> GetEstatisticasRankByTemporadaIdAsync(int temporadaId);
         Task<estatisticasRankDto[]> GetEstatisticasRankByJogadorIdAsync(int jogadorId);
         Task<estatisticasRankDto[]> GetEstatisticasRankByTempIdJogadorIdAsync(int jogadorId);
    }
}