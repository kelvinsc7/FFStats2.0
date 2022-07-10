using System.Linq;
using System.Threading.Tasks;
using FFStats.Domain.Models;
using FFStats.Persistence.Contextos;
using FFStats.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace FFStats.Persistence.Persistences
{
    public class SubmodoPersistence : ISubmodoPersistence
    {
        private readonly FFStatsContext _context;
        public SubmodoPersistence(FFStatsContext context)
        {
            this._context = context;
        }
        //Submodo
        public async Task<Submodo[]> GetAllSubmodoAsync(bool IncludeModo)
        {
            IQueryable<Submodo> query = _context.Submodos;
            if(IncludeModo)
            {
                query = query.AsNoTracking().Include(sm=> sm.modo);
            }
            query = query.OrderBy(sm => sm.id);
            return await query.ToArrayAsync();
        }

        public async Task<Submodo> GetAllSubmodoByIdAsync(int Id, bool IncludeModo)
        {
            IQueryable<Submodo> query = _context.Submodos;
            if(IncludeModo)
            {
                query = query.AsNoTracking().Include(sm=> sm.modo);
            }
            query = query.OrderBy(sm => sm.id).Where(sm => sm.id == Id);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Submodo[]> GetAllSubmodoByNomeAsync(string Nome, bool IncludeModo)
        {
            IQueryable<Submodo> query = _context.Submodos;
            if(IncludeModo)
            {
                query = query.AsNoTracking().Include(sm=> sm.modo);
            }
            query = query.OrderBy(sm => sm.submodoDescricao).Where(sm => sm.submodoDescricao.ToLower().Contains(Nome.ToLower()));
            return await query.ToArrayAsync();
        }
    }
}