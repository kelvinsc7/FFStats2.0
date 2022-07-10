using System.Threading.Tasks;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface ILineService
    {
         Task<LineDto> AddLines(LineDto model);
         Task<LineDto> UpdateLines(int LineId, LineDto model);
         Task<bool> DeleteLine(int LineId);
         Task<LineDto[]> GetAllLinesAsync(bool IncludeJogador = false);
         Task<LineDto> GetLinesByIdAsync(int LineId, bool IncludeJogador = false);
         Task<LineDto[]> GetAllLinesByDescAsync(string Desc, bool IncludeJogador = false);
    }
}