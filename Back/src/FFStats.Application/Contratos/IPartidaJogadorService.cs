using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface IPartidaJogadorService
    {
         Task<PartidaJogador> AddPartidaJogadores(PartidaJogador model);
         Task<PartidaJogador> UpdatePartidaJogadores(int PartidaJogadorId, PartidaJogador model);
         Task<bool> DeletePartidaJogador(int PartidaJogadorId);
         Task<PartidaJogador[]> GetAllPartidaJogadoresAsync(bool IncludePartidas = false);
         Task<PartidaJogador> GetPartidaJogadoresByIdAsync(int PartidaJogadorId, bool IncludePartidas = false);
         Task<PartidaJogador[]> GetAllPartidaJogadoresByDescAsync(string Desc, bool IncludePartidas = false);
    }
}