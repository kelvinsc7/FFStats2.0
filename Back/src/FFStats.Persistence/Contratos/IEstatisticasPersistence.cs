using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Persistence.Contratos
{
    public interface IEstatisticasPersistence
    {
         //Estatisticas
         Task<Estatisticas[]> GetEstatisticasByPartidaIdAsync(int partidaId);
         Task<Estatisticas> GetEstatisticasByIdsAsync(int partidaId, int estatisticaId );
    }
}