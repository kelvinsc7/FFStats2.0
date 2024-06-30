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

        public async Task<Estatisticas> GetEstatisticasByIdsAsync(int partidaId, int estatisticaId)
        {
            IQueryable<Estatisticas> query = _context.Estatisticas;

            query = query.AsNoTracking().Where(e => e.partidaId == partidaId && e.id == estatisticaId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Estatisticas[]> GetEstatisticasByPartidaIdAsync(int partidaId)
        {
            IQueryable<Estatisticas> query = _context.Estatisticas;

            query = query.AsNoTracking().Where(e => e.partidaId == partidaId);

            return await query.ToArrayAsync();
        }
        public async Task<Estatisticas[]> GetEstatisticasByJogadorIdAsync(int jogadorId)
        {
            IQueryable<Estatisticas> query = _context.Estatisticas;

            query = query.AsNoTracking().Where(e => e.jogadorId == jogadorId);

            return await query.ToArrayAsync();
        }
    }
}