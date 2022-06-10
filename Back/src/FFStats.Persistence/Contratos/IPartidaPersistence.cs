using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Persistence.Contratos
{
    public interface IPartidaPersistence
    {
         //Partida
         Task<Partida[]> GetAllPartidasByDescAsync(string Desc, bool IncludeJogador = false);
         Task<Partida[]> GetAllPartidasAsync(bool IncludeJogador = false);
         Task<Partida> GetPartidasByIdAsync(int id, bool IncludeJogador = false);
         Task<Partida[]> GetPartidasByMapaIdAsync(int id, bool IncludeJogador = false);
    }
}