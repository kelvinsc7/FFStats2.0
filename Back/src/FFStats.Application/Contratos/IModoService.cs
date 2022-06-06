using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface IModoService
    {
         Task<Modo> AddModos(Modo model);
         Task<Modo> UpdateModos(int ModoId, Modo model);
         Task<bool> DeleteModo(int ModoId);
         Task<Modo[]> GetAllModosAsync(bool IncludeSubmodo = false);
         Task<Modo> GetModosByIdAsync(int ModoId, bool IncludeSubmodo = false);
         Task<Modo[]> GetAllModosByDescAsync(string Desc, bool IncludeSubmodo = false);
    }
}