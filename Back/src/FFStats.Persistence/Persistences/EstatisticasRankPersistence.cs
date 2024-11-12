using System.Linq;
using System.Threading.Tasks;
using FFStats.Domain.Models;
using FFStats.Persistence.Contextos;
using FFStats.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace FFStats.Persistence.Persistences
{
    public class EstatisticasRankPersistence : IEstatisticasRankPersistence
    {
        private readonly FFStatsContext _context;
        public EstatisticasRankPersistence(FFStatsContext context)
        {
            this._context = context;
        }

        public async Task<EstatisticasRank> GetEstatisticasRankByIdsAsync(int id)
        {
            IQueryable<EstatisticasRank> query = _context.EstatisticasRanks;

            query = query.AsNoTracking().Where(e => e.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<EstatisticasRank[]> GetEstatisticasRankByJogadorIdAsync(int jogadorId)
        {
            IQueryable<EstatisticasRank> query = _context.EstatisticasRanks;

            query = query.AsNoTracking().Where(e => e.JogadorId == jogadorId);

            return await query.ToArrayAsync();
        }

        public async Task<EstatisticasRank[]> GetEstatisticasRankByTempIdJogadorIdAsync(int temporadaId, int jogadorId)
        {
            IQueryable<EstatisticasRank> query = _context.EstatisticasRanks;

            query = query.AsNoTracking().Where(e => e.JogadorId == jogadorId && e.TemporadaId == temporadaId);

            return await query.ToArrayAsync();
        }

        public async Task<EstatisticasRank[]> GetEstatisticasRankByTemporadaIdAsync(int temporadaId)
        {
            IQueryable<EstatisticasRank> query = _context.EstatisticasRanks;

            query = query.AsNoTracking().Where(e => e.TemporadaId == temporadaId);

            return await query.ToArrayAsync();
        }
    }
}