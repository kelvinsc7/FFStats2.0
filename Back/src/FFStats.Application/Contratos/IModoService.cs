using System.Threading.Tasks;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface IModoService
    {
         Task<modoDto> AddModos(modoDto model);
         Task<modoDto> UpdateModos(int ModoId, modoDto model);
         Task<bool> DeleteModo(int ModoId);
         Task<modoDto[]> GetAllModosAsync(bool IncludeSubmodo = false);
         Task<modoDto> GetModosByIdAsync(int ModoId, bool IncludeSubmodo = false);
         Task<modoDto[]> GetAllModosByDescAsync(string Desc, bool IncludeSubmodo = false);
    }
}