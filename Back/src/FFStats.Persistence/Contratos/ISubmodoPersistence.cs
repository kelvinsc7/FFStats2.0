using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Persistence.Contratos
{
    public interface ISubmodoPersistence
    {
         //Submodo
        Task<Submodo[]> GetAllSubmodoByNomeAsync(string Nome, bool IncludeModo);
        Task<Submodo[]> GetAllSubmodoAsync(bool IncludeModo);
        Task<Submodo> GetAllSubmodoByIdAsync(int id, bool IncludeModo);
        Task<Submodo[]> GetByModoIdAsync(int modoId, bool IncludeModo);
    }
}