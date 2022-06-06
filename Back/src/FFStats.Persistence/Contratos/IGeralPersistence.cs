using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Persistence.Contratos
{
    public interface IGeralPersistence
    {
        //GERAL
         void Add<T>(T Entity) where T: class;
         void Update<T>(T Entity) where T: class;
         void Delete<T>(T Entity) where T: class;
         void DeleteRange<T>(T[] Entity) where T: class;
         Task<bool> SaveChangeAsync();
    }
}