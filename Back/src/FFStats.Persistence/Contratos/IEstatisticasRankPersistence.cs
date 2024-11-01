using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Persistence.Contratos
{
    public interface IEstatisticasRankPersistence
    {
         Task<EstatisticasRank> GetEstatisticasRankByIdsAsync(int id);
         Task<EstatisticasRank[]> GetEstatisticasRankByTemporadaIdAsync(int temporadaId);
         
         Task<EstatisticasRank[]> GetEstatisticasRankByJogadorIdAsync(int jogadorId);

         Task<EstatisticasRank[]> GetEstatisticasRankByTempIdJogadorIdAsync(int temporadaId, int jogadorId);
    }
}