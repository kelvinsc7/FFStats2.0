using System.Threading.Tasks;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface IJogadoresService
    {
         Task<jogadoresDto> AddJogadoress(jogadoresDto model);
         Task<jogadoresDto> UpdateJogadoress(int JogadoresId, jogadoresDto model);
         Task<bool> DeleteJogador(int JogadorId);
         Task<jogadoresDto[]> GetAllJogadoresAsync(bool IncludePartidas = false);
         Task<jogadoresDto> GetJogadoresByIdAsync(int JogadoresId, bool IncludePartidas = false);
         Task<jogadoresDto> GetJogadoresByIdJogoAsync(int JogadoresId, bool IncludePartidas = false);
         Task<jogadoresDto[]> GetAllJogadoresByDescAsync(string Desc, bool IncludePartidas = false);
    }
}