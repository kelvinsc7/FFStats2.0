using System.Threading.Tasks;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface ICallService
    {
         Task<callDto> AddCalls(callDto model);
         Task<callDto> UpdateCalls(int CallId, callDto model);
         Task<bool> DeleteCall(int CallId);
         Task<callDto[]> GetAllCallsAsync(bool IncludeMapa = false);
         Task<callDto> GetCallsByIdAsync(int CallId, bool IncludeMapa = false);
         Task<callDto[]> GetAllCallsByDescAsync(string Desc, bool IncludeMapa = false);
         Task<callDto[]> GetAllCallByMapaId(int mapaId, bool IncludeMapa = false);
    }
}