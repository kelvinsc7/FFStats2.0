using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface ISubmodoService
    {
         Task<Submodo> AddSubmodos(Submodo model);
         Task<Submodo> UpdateSubmodos(int SubmodoId, Submodo model);
         Task<bool> DeleteSubmodo(int SubmodoId);
         Task<Submodo[]> GetAllSubmodosAsync(bool IncludeModo = false);
         Task<Submodo> GetSubmodosByIdAsync(int SubmodoId, bool IncludeModo = false);
         Task<Submodo[]> GetAllSubmodosByDescAsync(string Desc, bool IncludeModo = false);
    }
}