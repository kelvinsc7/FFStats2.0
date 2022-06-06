using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Persistence.Contratos
{
    public interface IModoPersistence
    {
         //Modo
        Task<Modo[]> GetAllModoByNomeAsync(string Nome, bool IncludeSub);
         Task<Modo[]> GetAllModoAsync(bool IncludeSub);
         Task<Modo> GetAllModoByIdAsync(int id, bool IncludeSub);

    }
}