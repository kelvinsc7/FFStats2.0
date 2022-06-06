using System.Linq;
using System.Threading.Tasks;
using FFStats.Domain.Models;
using FFStats.Persistence.Contextos;
using FFStats.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace FFStats.Persistence.Persistences
{
    public class MapaPersistence : IMapaPersistence
    {
        private readonly FFStatsContext _context;
        public MapaPersistence(FFStatsContext context)
        {
            this._context = context;
        }
        //Mapa
        public async Task<Mapa[]> GetAllMapaAsync(bool IncludeCall)
        {
            IQueryable<Mapa> query = _context.Mapas;
            if(IncludeCall)
            {
                query = query.AsNoTracking().Include(m=> m.Calls);
            }
            query = query.OrderBy(P => P.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Mapa> GetAllMapaByIdAsync(int id, bool IncludeCall)
        {
            IQueryable<Mapa> query = _context.Mapas;
            if(IncludeCall)
            {
                query = query.Include(m=> m.Calls);
            }
            query = query.AsNoTracking().OrderBy(m => m.Id).Where(m => m.Id == id);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Mapa[]> GetAllMapaByNomeAsync(string Nome, bool IncludeCall)
        {
            IQueryable<Mapa> query = _context.Mapas;
            if(IncludeCall)
            {
                query = query.AsNoTracking().Include(m=> m.Calls);
            }
            query = query.OrderBy(m => m.Id).Where(m => m.mapaNome.ToLower().Contains(Nome.ToLower()));;
            return await query.ToArrayAsync();
        }
    }
}