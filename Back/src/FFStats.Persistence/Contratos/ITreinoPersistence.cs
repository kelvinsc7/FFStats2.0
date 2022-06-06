using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Persistence.Contratos
{
    public interface ITreinoPersistence
    {
         //Treino
        Task<Treino[]> GetAllTreinoByNomeAsync(string Nome, bool IncludePartidas);
         Task<Treino[]> GetAllTreinoAsync(bool IncludePartidas);
         Task<Treino> GetAllTreinoByIdAsync(int id, bool IncludePartidas);

    }
}