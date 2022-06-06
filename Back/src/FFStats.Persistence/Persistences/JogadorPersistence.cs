using System.Linq;
using System.Threading.Tasks;
using FFStats.Domain.Models;
using FFStats.Persistence.Contextos;
using FFStats.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace FFStats.Persistence.Persistences
{
    public class JogadorPersistence : IJogadorPersistence
    {
        private readonly FFStatsContext _context;
        public JogadorPersistence(FFStatsContext context)
        {
            this._context = context;
        }
        //Jogador
        public async Task<Jogador[]> GetAllJogadoresAsync(bool IncludePartidas = false)
        {
            IQueryable<Jogador> query = _context.Jogadores;
            if(IncludePartidas)
            {
                query = query.AsNoTracking().Include(J=> J.PartidasJogadores).ThenInclude(PJ =>PJ.Partida);
            }
            query = query.OrderBy(J => J.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Jogador> GetAllJogadoresByIdAsync(int JogadorId, bool IncludePartidas)
        {
            IQueryable<Jogador> query = _context.Jogadores;
            if(IncludePartidas)
            {
                query = query.AsNoTracking().Include(J=> J.PartidasJogadores).ThenInclude(PJ =>PJ.Partida);
            }
            query = query.OrderBy(J => J.Id).Where(J=> J.Id == JogadorId);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Jogador[]> GetAllJogadoresByNomeAsync(string Nome, bool IncludePartidas = false)
        {
            IQueryable<Jogador> query = _context.Jogadores;
            if(IncludePartidas)
            {
                query = query.AsNoTracking().Include(J=> J.PartidasJogadores).ThenInclude(PJ =>PJ.Partida);
            }
            query = query.OrderBy(J => J.Id).Where(J=> J.jogadorNome.ToLower().Contains(Nome.ToLower()));
            return await query.ToArrayAsync();
        }
    }
}