using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Persistence.Contratos
{
    public interface IPartidaJogadorPersistence
    {
         //PartidaJogador
        Task<PartidaJogador[]> GetAllPartidaJogadorByNomeAsync(string Nome, bool IncludePartidas);
         Task<PartidaJogador[]> GetAllPartidaJogadorAsync(bool IncludePartidas);
         Task<PartidaJogador> GetAllPartidaJogadorByIdAsync(int id, bool IncludePartidas);

    }
}