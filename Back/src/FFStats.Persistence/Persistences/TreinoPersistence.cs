using System.Linq;
using System.Threading.Tasks;
using FFStats.Domain.Models;
using FFStats.Persistence.Contextos;
using FFStats.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace FFStats.Persistence.Persistences
{
    public class TreinoPersistence : ITreinoPersistence
    {
        private readonly FFStatsContext _context;
        public TreinoPersistence(FFStatsContext context)
        {
            this._context = context;
        }

        public async Task<Treino[]> GetAllTreinoAsync(bool IncludePartidas)
        {
            IQueryable<Treino> query = _context.Treinos;
            if(IncludePartidas)
            {
                query = query.AsNoTracking().Include(t=> t.Partidas);
            }
            query = query.OrderBy(t => t.treinoId);
            return await query.ToArrayAsync();
        }

        public async Task<Treino> GetAllTreinoByIdAsync(int Id, bool IncludePartidas)
        {
            IQueryable<Treino> query = _context.Treinos;
            if(IncludePartidas)
            {
                query = query.AsNoTracking().Include(t=> t.Partidas);
            }
            query = query.AsNoTracking().OrderBy(t => t.treinoId).Where(t => t.treinoId == Id);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Treino[]> GetAllTreinoByNomeAsync(string Nome, bool IncludePartidas)
        {
            IQueryable<Treino> query = _context.Treinos;
            if(IncludePartidas)
            {
                query = query.AsNoTracking().Include(t=> t.Partidas);
            }
            query = query.AsNoTracking().OrderBy(t => t.treinoId).Where(t => t.treinoDescricao.ToLower().Contains(Nome.ToLower()));
            return await query.ToArrayAsync();
        }
    }
}