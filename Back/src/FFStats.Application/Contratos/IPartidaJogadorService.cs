using System.Threading.Tasks;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface IPartidaJogadorService
    {
         Task<partidajogadoresDto> AddPartidaJogadores(partidajogadoresDto model);
         Task<partidajogadoresDto> UpdatePartidaJogadores(int PartidaJogadorId, partidajogadoresDto model);
         Task<bool> DeletePartidaJogador(int PartidaJogadorId);
         Task<partidajogadoresDto[]> GetAllPartidaJogadoresAsync(bool IncludePartidas = false);
         Task<partidajogadoresDto> GetPartidaJogadoresByIdAsync(int PartidaJogadorId, bool IncludePartidas = false);
         Task<partidajogadoresDto[]> GetAllPartidaJogadoresByDescAsync(string Desc, bool IncludePartidas = false);
    }
}