using System;
using System.Threading.Tasks;
using FFStats.Application.Contratos;
using FFStats.Application.Dtos;
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

        public Task<partidajogadoresDto> AddPartidaJogadores(partidajogadoresDto model)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeletePartidaJogador(int PartidaJogadorId)
        {
            throw new NotImplementedException();
        }

        public Task<partidajogadoresDto[]> GetAllPartidaJogadoresAsync(bool IncludePartidas = false)
        {
            throw new NotImplementedException();
        }

        public Task<partidajogadoresDto[]> GetAllPartidaJogadoresByDescAsync(string Desc, bool IncludePartidas = false)
        {
            throw new NotImplementedException();
        }

        public Task<partidajogadoresDto> GetPartidaJogadoresByIdAsync(int PartidaJogadorId, bool IncludePartidas = false)
        {
            throw new NotImplementedException();
        }

        public Task<partidajogadoresDto> UpdatePartidaJogadores(int PartidaJogadorId, partidajogadoresDto model)
        {
            throw new NotImplementedException();
        }
    }
}