using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Persistence.Contratos
{
    public interface IJogadorPersistence
    {
         //Jogador
        Task<Jogador[]> GetAllJogadoresByNomeAsync(string Nome, bool IncludePartidas);
         Task<Jogador[]> GetAllJogadoresAsync(bool IncludePartidas);
         Task<Jogador> GetAllJogadoresByIdAsync(int id, bool IncludePartidas);
         Task<Jogador> GetAllJogadoresByIdJogoAsync(int id, bool IncludePartidas);

    }
}