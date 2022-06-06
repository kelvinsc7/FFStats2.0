using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface ICallService
    {
         Task<Call> AddCalls(Call model);
         Task<Call> UpdateCalls(int CallId, Call model);
         Task<bool> DeleteCall(int CallId);
         Task<Call[]> GetAllCallsAsync(bool IncludeMapa = false);
         Task<Call> GetCallsByIdAsync(int CallId, bool IncludeMapa = false);
         Task<Call[]> GetAllCallsByDescAsync(string Desc, bool IncludeMapa = false);
    }
}