using System.Linq;
using System.Threading.Tasks;
using FFStats.Domain.Models;
using FFStats.Persistence.Contextos;
using FFStats.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace FFStats.Persistence.Persistences
{
    public class PartidaJogadorPersistence : IPartidaJogadorPersistence
    {
        private readonly FFStatsContext _context;
        public PartidaJogadorPersistence(FFStatsContext context)
        {
            this._context = context;
        }
        //PartidaJogador
        public Task<PartidaJogador[]> GetAllPartidaJogadorAsync(bool IncludePartidas)
        {
            throw new System.NotImplementedException();
        }

        public Task<PartidaJogador> GetAllPartidaJogadorByIdAsync(int JogadorId, bool IncludePartidas)
        {
            throw new System.NotImplementedException();
        }

        public Task<PartidaJogador[]> GetAllPartidaJogadorByNomeAsync(string Nome, bool IncludePartidas)
        {
            throw new System.NotImplementedException();
        }
    }
}