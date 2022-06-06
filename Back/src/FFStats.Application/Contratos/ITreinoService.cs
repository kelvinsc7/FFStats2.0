using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface ITreinoService
    {
         Task<Treino> AddTreinos(Treino model);
         Task<Treino> UpdateTreinos(int TreinoId, Treino model);
         Task<bool> DeleteTreino(int TreinoId);
         Task<Treino[]> GetAllTreinosAsync(bool IncludePartida = false);
         Task<Treino> GetTreinosByIdAsync(int TreinoId, bool IncludePartida = false);
         Task<Treino[]> GetAllTreinosByDescAsync(string Desc, bool IncludePartida = false);
    }
}