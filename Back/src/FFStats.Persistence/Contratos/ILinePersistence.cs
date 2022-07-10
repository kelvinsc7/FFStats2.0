using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Persistence.Contratos
{
    public interface ILinePersistence
    {
         //Line
        Task<Line[]> GetAllLineByNomeAsync(string Nome, bool IncludeJogadores);
         Task<Line[]> GetAllLineAsync(bool IncludeJogadores);
         Task<Line> GetAllLineByIdAsync(int id, bool IncludeJogadores);
    }
}