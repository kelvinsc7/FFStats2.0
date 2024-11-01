using System;
using System.Threading.Tasks;
using AutoMapper;
using FFStats.Application.Contratos;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class TemporadaService : ITemporadaService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly ITemporadaPersistence _TemporadaPersistence;
        private readonly IMapper _mapper;
        public TemporadaService(IGeralPersistence geralPersistence, ITemporadaPersistence TemporadaPersistence, IMapper mapper)
        {
            this._mapper = mapper;
            this._TemporadaPersistence = TemporadaPersistence;
            this._geralPersistence = geralPersistence;

        }

        public async Task<temporadaDto> AddTemporada(temporadaDto model)
        {
             try
            {
                var temporada = _mapper.Map<Temporada>(model);
                _geralPersistence.Add<Temporada>(temporada);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var temporadaRetorno = await _TemporadaPersistence.GetAllTemporadaByIdAsync(temporada.Id);
                    return _mapper.Map<temporadaDto>(temporadaRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<temporadaDto> UpdateTemporada(int TemporadaId, temporadaDto model)
        {
            try
            {
                var temporada = await _TemporadaPersistence.GetAllTemporadaByIdAsync(TemporadaId);
                if (temporada == null) return null;

                model.Id = temporada.Id;
                
                _mapper.Map(model, temporada);
                _geralPersistence.Update(temporada);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var temporadaRetorno = await _TemporadaPersistence.GetAllTemporadaByIdAsync(temporada.Id);
                    return _mapper.Map<temporadaDto>(temporadaRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> DeleteTemporada(int TemporadaId)
        {
            try
            {
                var Temporada = await _TemporadaPersistence.GetAllTemporadaByIdAsync(TemporadaId);
                if (Temporada == null) throw new Exception("Erro: Temporada nao encontrado para ser deletado!");

                _geralPersistence.Delete(Temporada);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<temporadaDto[]> GetAllTemporadasAsync()
        {
            try
            {
                var temporada = await _TemporadaPersistence.GetAllTemporadaAsync();
                if (temporada == null) return null;

                var resultado = _mapper.Map<temporadaDto[]>(temporada);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<temporadaDto[]> GetAllTemporadasByDescAsync(string Desc)
        {
            try
            {
                var temporada = await _TemporadaPersistence.GetAllTemporadaByDescAsync(Desc);
                if (temporada == null) return null;

                var resultado = _mapper.Map<temporadaDto[]>(temporada);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<temporadaDto> GetTemporadasByIdAsync(int TemporadaId)
        {
            try
            {
                var temporada = await _TemporadaPersistence.GetAllTemporadaByIdAsync(TemporadaId);
                if (temporada == null) return null;

                var resultado = _mapper.Map<temporadaDto>(temporada);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}