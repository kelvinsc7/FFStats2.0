using System.Linq;
using System.Threading.Tasks;
using FFStats.Domain.Models;
using FFStats.Persistence.Contextos;
using FFStats.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace FFStats.Persistence.Persistences
{
    public class TemporadaPersistence : ITemporadaPersistence
    {
        private readonly FFStatsContext _context;
        public TemporadaPersistence(FFStatsContext context)
        {
            this._context = context;
        }

        public async Task<Temporada[]> GetAllTemporadaAsync()
        {
            IQueryable<Temporada> query = _context.Temporadas;
            query = query.OrderBy(t => t.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Temporada> GetAllTemporadaByDescAsync(string Descricao)
        {
            IQueryable<Temporada> query = _context.Temporadas;

            query = query.AsNoTracking().OrderBy(t => t.Id).Where(t => t.Descricao == Descricao);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Temporada> GetAllTemporadaByIdAsync(int id)
        {
            IQueryable<Temporada> query = _context.Temporadas;

            query = query.AsNoTracking().OrderBy(t => t.Id).Where(t => t.Id == id);

            return await query.FirstOrDefaultAsync();
        }
    }
}