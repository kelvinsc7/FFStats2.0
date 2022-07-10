using System.Linq;
using System.Threading.Tasks;
using FFStats.Domain.Models;
using FFStats.Persistence.Contextos;
using FFStats.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace FFStats.Persistence.Persistences
{
    public class ModoPersistence : IModoPersistence
    {
        private readonly FFStatsContext _context;
        public ModoPersistence(FFStatsContext context)
        {
            this._context = context;
        }
        //Modos
        public async Task<Modo[]> GetAllModoAsync(bool IncludeSub)
        {
            IQueryable<Modo> query = _context.Modos;
            if(IncludeSub)
            {
                query = query.AsNoTracking().Include(m=> m.SubModos);
            }
            query = query.OrderBy(m => m.id);
            return await query.ToArrayAsync();
        }

        public async Task<Modo> GetAllModoByIdAsync(int id, bool IncludeSub)
        {
            IQueryable<Modo> query = _context.Modos;
            if(IncludeSub)
            {
                query = query.AsNoTracking().Include(m=> m.SubModos);
            }
            query = query.AsNoTracking().OrderBy(m => m.id).Where(m => m.id == id);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Modo[]> GetAllModoByNomeAsync(string Nome, bool IncludeSub)
        {
            IQueryable<Modo> query = _context.Modos;
            if(IncludeSub)
            {
                query = query.AsNoTracking().Include(m=> m.SubModos);
            }
            query = query.OrderBy(m => m.id).Where(m => m.modoDescricao.ToLower().Contains(Nome.ToLower()));
            return await query.ToArrayAsync();
        }
    }
}