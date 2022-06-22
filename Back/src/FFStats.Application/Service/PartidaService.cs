using System;
using System.Threading.Tasks;
using FFStats.Application.Contratos;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;
using AutoMapper;

namespace FFStats.Application.Service
{
    public class PartidaService : IPartidaService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly IPartidaPersistence _partidaPersistence;
        private readonly IMapper _mapper;
        public PartidaService(IGeralPersistence geralPersistence, IPartidaPersistence partidaPersistence, IMapper mapper)
        {
            this._partidaPersistence = partidaPersistence;
            this._geralPersistence = geralPersistence;
            this._mapper = mapper;

        }
        public async Task<partidaDto> AddPartidas(partidaDto model)
        {
            try
            {
                var partida = _mapper.Map<Partida>(model);

                _geralPersistence.Add<Partida>(partida);

                if (await _geralPersistence.SaveChangeAsync())
                {
                    var partidaRetorno = await _partidaPersistence.GetPartidasByIdAsync(partida.Id, false);
                    return _mapper.Map<partidaDto>(partidaRetorno); 
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<partidaDto> UpdatePartidas(int partidaId, partidaDto model)
        {
            try
            {
                var partida = await _partidaPersistence.GetPartidasByIdAsync(partidaId, false);
                if (partida == null) return null;

                model.Id = partida.Id;

                _mapper.Map(model, partida);

                _geralPersistence.Update<Partida>(partida);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var partidaRetorno = await _partidaPersistence.GetPartidasByIdAsync(partida.Id, false);
                    return _mapper.Map<partidaDto>(partidaRetorno); 
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
                if (partida == null) throw new Exception("Erro: Partida nao encontrado para ser deletado!");

                _geralPersistence.Delete(partida);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<partidaDto[]> GetAllPartidasAsync(bool IncludeJogador = false)
        {
            try
            {
                var partidas = await _partidaPersistence.GetAllPartidasAsync(IncludeJogador);
                if (partidas == null) return null;

                var resultado = _mapper.Map<partidaDto[]>(partidas);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<partidaDto[]> GetAllPartidasByDescAsync(string Desc, bool IncludeJogador = false)
        {
            try
            {
                var partidas = await _partidaPersistence.GetAllPartidasByDescAsync(Desc, IncludeJogador);
                if (partidas == null) return null;

                var resultado = _mapper.Map<partidaDto[]>(partidas);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<partidaDto> GetPartidasByIdAsync(int PartidaId, bool IncludeJogador = false)
        {
            try
            {
                var partidas = await _partidaPersistence.GetPartidasByIdAsync(PartidaId, IncludeJogador);
                if (partidas == null) return null;
                var resultado = _mapper.Map<partidaDto>(partidas);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<partidaDto[]> GetPartidasByMapaIdAsync(int id, bool IncludeJogador = false)
        {
            try
            {
                var partidas = await _partidaPersistence.GetPartidasByMapaIdAsync(id, IncludeJogador);
                if (partidas == null) return null;

                var resultado = _mapper.Map<partidaDto[]>(partidas);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}