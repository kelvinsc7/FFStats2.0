using System.Linq;
using System.Threading.Tasks;
using FFStats.Domain.Models;
using FFStats.Persistence.Contextos;
using FFStats.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace FFStats.Persistence.Persistences
{
    public class EstatisticasPersistence : IEstatisticasPersistence
    {
        private readonly FFStatsContext _context;
        public EstatisticasPersistence(FFStatsContext context)
        {
            this._context = context;
        }

        public async Task<Estatisticas[]> GetAllEstatisticasAsync(bool includeAll)
        {
            IQueryable<Estatisticas> query = _context.Estatisticas;
            if(includeAll)
            {
                query = query.AsNoTracking().Include(e=> e.Jogador)
                                            .Include(e =>e.Partida);
            }
            query = query.OrderBy(e => e.id);
            return await query.ToArrayAsync();
        }

        public async Task<Estatisticas> GetAllEstatisticasByIdAsync(int id, bool includeAll)
        {
            IQueryable<Estatisticas> query = _context.Estatisticas;
            if(includeAll)
            {
                query = query.AsNoTracking().Include(e=> e.Jogador)
                                            .Include(e =>e.Partida);
            }
            query = query.AsNoTracking().OrderBy(e => e.id).Where(e => e.id == id);
            return await query.FirstOrDefaultAsync();
        }

        public Task<Estatisticas[]> GetAllEstatisticasByNomeAsync(string Nome, bool includeAll)
        {
            throw new System.NotImplementedException();
        }

    }
}