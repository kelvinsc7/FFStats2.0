using System;
using System.Threading.Tasks;
using FFStats.Application.Contratos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class PartidaService : IPartidaService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly IPartidaPersistence _partidaPersistence;
        public PartidaService(IGeralPersistence geralPersistence, IPartidaPersistence partidaPersistence)
        {
            this._partidaPersistence = partidaPersistence;
            this._geralPersistence = geralPersistence;

        }
        public async Task<Partida> AddPartidas(Partida model)
        {
            try
            {
                _geralPersistence.Add<Partida>(model);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    return await _partidaPersistence.GetPartidasByIdAsync(model.Id, false);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Partida> UpdatePartidas(int partidaId, Partida model)
        {
            try
            {
                var partida = await _partidaPersistence.GetPartidasByIdAsync(partidaId, false);
                if(partida == null) return null;

                model.Id = partida.Id;
                
                _geralPersistence.Update(model);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    return await _partidaPersistence.GetPartidasByIdAsync(model.Id, false);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeletePartida(int partidaId)
        {
            try
            {
                var partida = await _partidaPersistence.GetPartidasByIdAsync(partidaId, false);
                if(partida == null) throw new Exception ("Erro: Partida nao encontrado para ser deletado!");

                _geralPersistence.Delete(partida);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Partida[]> GetAllPartidasAsync(bool IncludeJogador = false)
        {
            try
            {
                var partidas = await _partidaPersistence.GetAllPartidasAsync(IncludeJogador);
                if(partidas == null) return null;

                return partidas;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Partida[]> GetAllPartidasByDescAsync(string Desc, bool IncludeJogador = false)
        {
            try
            {
                var partidas = await _partidaPersistence.GetAllPartidasByDescAsync(Desc, IncludeJogador);
                if(partidas == null) return null;

                return partidas;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Partida> GetPartidasByIdAsync(int PartidaId, bool IncludeJogador = false)
        {
            try
            {
                var partidas = await _partidaPersistence.GetPartidasByIdAsync(PartidaId, IncludeJogador);
                if(partidas == null) return null;

                return partidas;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}