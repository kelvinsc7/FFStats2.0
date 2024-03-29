using System.Linq;
using System.Threading.Tasks;
using FFStats.Domain.Models;
using FFStats.Persistence.Contextos;
using FFStats.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace FFStats.Persistence.Persistences
{
    public class CallPersistence : ICallPersistence
    {
        private readonly FFStatsContext _context;
        public CallPersistence(FFStatsContext context)
        {
            this._context = context;
        }
        //Call
        public async Task<Call[]> GetAllCallAsync(bool IncludeMapa)
        {
            IQueryable<Call> query = _context.Calls;
            if(IncludeMapa)
            {
                query = query.AsNoTracking().Include(c=> c.mapa);
            }
            query = query.OrderBy(P => P.id);
            return await query.ToArrayAsync();
        }

        public async Task<Call> GetAllCallByIdAsync(int Id, bool IncludeMapa)
        {
            IQueryable<Call> query = _context.Calls;
            if(IncludeMapa)
            {
                query = query.Include(c=> c.mapa);
            }
            query = query.AsNoTracking().OrderBy(c => c.id).Where(c => c.id == Id);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Call[]> GetAllCallByNomeAsync(string Nome, bool IncludePartidas)
        {
            IQueryable<Call> query = _context.Calls;
            if(IncludePartidas)
            {
                query = query.Include(c=> c.mapa);
            }
            query = query.AsNoTracking().OrderBy(c => c.id).Where(c => c.callCidade.ToLower().Contains(Nome.ToLower()));
            return await query.ToArrayAsync();
        }
        public async Task<Call[]> GetAllCallByMapaIdAsync(int mapaId, bool IncludeMapa)
        {
            IQueryable<Call> query = _context.Calls;

            if(IncludeMapa)
            {
                query = query.AsNoTracking().Include(c=> c.mapa);
            }
            query = query.OrderBy(P => P.id).Where(P => P.mapaId == mapaId);
            return await query.ToArrayAsync();
        }
    }
}