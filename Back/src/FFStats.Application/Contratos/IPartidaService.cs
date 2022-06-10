using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface IPartidaService
    {
         Task<Partida> AddPartidas(Partida model);
         Task<Partida> UpdatePartidas(int partidaId, Partida model);
         Task<bool> DeletePartida(int partidaId);
         Task<Partida[]> GetAllPartidasAsync(bool IncludeJogador = false);
         Task<Partida> GetPartidasByIdAsync(int PartidaId, bool IncludeJogador = false);
         Task<Partida[]> GetAllPartidasByDescAsync(string Desc, bool IncludeJogador = false);
         Task<Partida[]> GetPartidasByMapaIdAsync(int id, bool IncludeJogador = false);
    }
}