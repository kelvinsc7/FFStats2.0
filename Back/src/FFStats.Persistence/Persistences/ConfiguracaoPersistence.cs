using System.Linq;
using System.Threading.Tasks;
using FFStats.Domain.Models;
using FFStats.Persistence.Contextos;
using FFStats.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace FFStats.Persistence.Persistences
{
    public class ConfiguracaoPersistence : IConfiguracaoPersistence
    {
        private readonly FFStatsContext _context;
        public ConfiguracaoPersistence(FFStatsContext context)
        {
            this._context = context;
        }

        public async Task<Configuracao[]> GetAllConfiguracoes()
        {
            IQueryable<Configuracao> query = _context.Configuracoes;
            query = query.OrderBy(C => C.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Configuracao> GetAllConfiguracoesbyId(int Id)
        {
            IQueryable<Configuracao> query = _context.Configuracoes;
            query = query.AsNoTracking().OrderBy(c => c.Id).Where(c => c.Id == Id);
            return await query.FirstOrDefaultAsync();
        }
    }
}