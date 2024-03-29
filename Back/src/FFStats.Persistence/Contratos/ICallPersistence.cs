using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Persistence.Contratos
{
    public interface ICallPersistence
    {
         //Call
        Task<Call[]> GetAllCallByNomeAsync(string Nome, bool IncludeMapa);
         Task<Call[]> GetAllCallAsync(bool IncludeMapa);
         Task<Call> GetAllCallByIdAsync(int id, bool IncludeMapa);
         Task<Call[]> GetAllCallByMapaIdAsync(int mapaId, bool IncludeMapa);

    }
}