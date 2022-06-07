using System.Linq;
using System.Threading.Tasks;
using FFStats.Domain.Models;
using FFStats.Persistence.Contextos;
using FFStats.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace FFStats.Persistence.Persistences
{
    public class PartidaPersistence : IPartidaPersistence
    {
        private readonly FFStatsContext _context;
        public PartidaPersistence(FFStatsContext context)
        {
            this._context = context;
            //this._context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        //Partida
        public async Task<Partida[]> GetAllPartidasAsync(bool IncludeJogador = false)
        {
            IQueryable<Partida> query = _context.Partidas
                            .Include(p => p.treino)
                            .Include(p => p.mapa)
                            .Include(p => p.call)
                            .Include(p => p.modo)
                            .Include(p => p.sumodo);
            if(IncludeJogador)
            {
                query = query.AsNoTracking().Include(P=> P.PartidasJogadores).ThenInclude(PJ =>PJ.Jogador);
            }
            query = query.OrderBy(P => P.Id);
            return await query.ToArrayAsync();
        }
        public async Task<Partida> GetPartidasByIdAsync(int PartidaId, bool IncludeJogador = false)
        {
            IQueryable<Partida> query = _context.Partidas
                            .Include(p => p.treino)
                            .Include(p => p.mapa)
                            .Include(p => p.call)
                            .Include(p => p.modo)
                            .Include(p => p.sumodo);
            if(IncludeJogador)
            {
                query = query.Include(P=> P.PartidasJogadores).ThenInclude(PJ =>PJ.Jogador);
            }
            query = query.AsNoTracking().OrderBy(P => P.Id).Where(P => P.Id == PartidaId);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Partida[]> GetAllPartidasByDescAsync(string Desc, bool IncludeJogador = false)
        {
            IQueryable<Partida> query = _context.Partidas
                            .Include(p => p.treino)
                            .Include(p => p.mapa)
                            .Include(p => p.call)
                            .Include(p => p.modo)
                            .Include(p => p.sumodo);    
            if(IncludeJogador)
            {
                query = query.AsNoTracking().Include(P=> P.PartidasJogadores).ThenInclude(PJ =>PJ.Jogador);
            }
            query = query.OrderBy(P => P.Id).Where(P => P.partidaDescricao.ToLower().Contains(Desc.ToLower()));
            return await query.ToArrayAsync();
        }
    }
}