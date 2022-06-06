using System;
using System.Threading.Tasks;
using FFStats.Application.Contratos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class PartidaJogadorService : IPartidaJogadorService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly IPartidaJogadorPersistence _PartidaJogadorPersistence;
        public PartidaJogadorService(IGeralPersistence geralPersistence, IPartidaJogadorPersistence PartidaJogadorPersistence)
        {
            this._PartidaJogadorPersistence = PartidaJogadorPersistence;
            this._geralPersistence = geralPersistence;
        }

        public Task<PartidaJogador> AddPartidaJogadores(PartidaJogador model)
        {
            throw new NotImplementedException();
        }
        public Task<PartidaJogador> UpdatePartidaJogadores(int PartidaJogadorId, PartidaJogador model)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeletePartidaJogador(int PartidaJogadorId)
        {
            throw new NotImplementedException();
        }

        public Task<PartidaJogador[]> GetAllPartidaJogadoresAsync(bool IncludePartidas = false)
        {
            throw new NotImplementedException();
        }

        public Task<PartidaJogador[]> GetAllPartidaJogadoresByDescAsync(string Desc, bool IncludePartidas = false)
        {
            throw new NotImplementedException();
        }

        public Task<PartidaJogador> GetPartidaJogadoresByIdAsync(int PartidaJogadorId, bool IncludePartidas = false)
        {
            throw new NotImplementedException();
        }

    }
}