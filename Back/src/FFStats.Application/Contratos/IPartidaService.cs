using System.Threading.Tasks;
using FFStats.Application.Dtos;

namespace FFStats.Application.Contratos
{
    public interface IPartidaService
    {
         Task<partidaDto> AddPartidas(partidaDto model);
         Task<partidaDto> UpdatePartidas(int partidaId, partidaDto model);
         Task<bool> DeletePartida(int partidaId);
         Task<partidaDto[]> GetAllPartidasAsync(bool IncludeJogador = false);
         Task<partidaDto> GetPartidasByIdAsync(int PartidaId, bool IncludeJogador = false);
         Task<partidaDto[]> GetPartidasByTreinoIdAsync(int treinoId, bool IncludeJogador = false);
         Task<partidaDto[]> GetAllPartidasByDescAsync(string Desc, bool IncludeJogador = false);
         Task<partidaDto[]> GetPartidasByMapaIdAsync(int id, bool IncludeJogador = false);
    }
}