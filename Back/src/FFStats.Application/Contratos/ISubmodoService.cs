using System.Threading.Tasks;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface ISubmodoService
    {
         Task<subModoDto> AddSubmodos(subModoDto model);
         Task<subModoDto> UpdateSubmodos(int SubmodoId, subModoDto model);
         Task<bool> DeleteSubmodo(int SubmodoId);
         Task<subModoDto[]> GetAllSubmodosAsync(bool IncludeModo = false);
         Task<subModoDto> GetSubmodosByIdAsync(int SubmodoId, bool IncludeModo = false);
         Task<subModoDto[]> GetAllSubmodosByDescAsync(string Desc, bool IncludeModo = false);
         Task<subModoDto[]> GetByModoIdAsync(int modoId,bool IncludeModo = false);
    }
}