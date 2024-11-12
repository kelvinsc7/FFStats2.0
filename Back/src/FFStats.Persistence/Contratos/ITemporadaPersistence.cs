using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Persistence.Contratos
{
    public interface ITemporadaPersistence
    {
         //Treino
        Task<Temporada> GetAllTemporadaByDescAsync(string Nome);
         Task<Temporada[]> GetAllTemporadaAsync();
         Task<Temporada> GetAllTemporadaByIdAsync(int id);

    }
}