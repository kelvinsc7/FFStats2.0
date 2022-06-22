using System.Threading.Tasks;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface ITreinoService
    {
         Task<treinoDto> AddTreinos(treinoDto model);
         Task<treinoDto> UpdateTreinos(int TreinoId, treinoDto model);
         Task<bool> DeleteTreino(int TreinoId);
         Task<treinoDto[]> GetAllTreinosAsync(bool IncludePartida = false);
         Task<treinoDto> GetTreinosByIdAsync(int TreinoId, bool IncludePartida = false);
         Task<treinoDto[]> GetAllTreinosByDescAsync(string Desc, bool IncludePartida = false);
    }
}