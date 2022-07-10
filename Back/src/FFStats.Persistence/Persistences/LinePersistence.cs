using System.Linq;
using System.Threading.Tasks;
using FFStats.Domain.Models;
using FFStats.Persistence.Contextos;
using FFStats.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace FFStats.Persistence.Persistences
{
    public class LinePersistence : ILinePersistence
    {
        private readonly FFStatsContext _context;
        public LinePersistence(FFStatsContext context)
        {
            this._context = context;
        }
        public async  Task<Line[]> GetAllLineAsync(bool IncludeJogadores)
        {
            IQueryable<Line> query = _context.Lines
                                .Include(t => t.Jogadores);
            if(IncludeJogadores)
            {
                query = query.AsNoTracking().Include(t=> t.Jogadores);
            }
            query = query.OrderBy(t => t.id);
            return await query.ToArrayAsync();
        }

        public async Task<Line> GetAllLineByIdAsync(int id, bool IncludeJogadores)
        {
            IQueryable<Line> query = _context.Lines;
            if(IncludeJogadores)
            {
                query = query.AsNoTracking().Include(t=> t.Jogadores);
            }
            query = query.AsNoTracking().OrderBy(t => t.id).Where(t => t.id == id);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Line[]> GetAllLineByNomeAsync(string Nome, bool IncludeJogadores)
        {
            IQueryable<Line> query = _context.Lines;
            if(IncludeJogadores)
            {
                query = query.AsNoTracking().Include(t=> t.Jogadores);
            }
            query = query.AsNoTracking().OrderBy(t => t.id).Where(t => t.lineNome.ToLower().Contains(Nome.ToLower()));
            return await query.ToArrayAsync();
        }
    }
}