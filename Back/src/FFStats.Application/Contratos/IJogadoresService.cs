using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface IJogadoresService
    {
         Task<Jogador> AddJogadoress(Jogador model);
         Task<Jogador> UpdateJogadoress(int JogadoresId, Jogador model);
         Task<bool> DeleteJogador(int JogadorId);
         Task<Jogador[]> GetAllJogadoresAsync(bool IncludePartidas = false);
         Task<Jogador> GetJogadoresByIdAsync(int JogadoresId, bool IncludePartidas = false);
         Task<Jogador[]> GetAllJogadoresByDescAsync(string Desc, bool IncludePartidas = false);
    }
}