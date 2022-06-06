using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Persistence.Contratos
{
    public interface IEstatisticasPersistence
    {
         //Estatisticas
        Task<Estatisticas[]> GetAllEstatisticasByNomeAsync(string Nome, bool includeAll);
         Task<Estatisticas[]> GetAllEstatisticasAsync(bool includeAll);
         Task<Estatisticas> GetAllEstatisticasByIdAsync(int id, bool includeAll);

    }
}