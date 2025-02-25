using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FFStats.Application.Contratos;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class EstatisticasService : IEstatisticasService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly IEstatisticasPersistence _EstatisticasPersistence;
        public IMapper _mapper { get; }
        public EstatisticasService(IGeralPersistence geralPersistence, IEstatisticasPersistence EstatisticasPersistence, IMapper mapper)
        {
            this._mapper = mapper;
            this._EstatisticasPersistence = EstatisticasPersistence;
            this._geralPersistence = geralPersistence;

        }
        public async Task AddEstatisticas(int partidaId, estatisticasDto model)
        {
            try
            {
                var estatistica = _mapper.Map<Estatisticas>(model);
                estatistica.partidaId = partidaId;
                _geralPersistence.Add<Estatisticas>(estatistica);
                await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<estatisticasDto[]> SaveEstatistica(int partidaId, estatisticasDto[] models)
        {
            try
            {
                var estatistica = await _EstatisticasPersistence.GetEstatisticasByPartidaIdAsync(partidaId);
                if (estatistica == null) return null;

                foreach (var model in models)
                {
                    if (model.id == 0)
                    {
                        await AddEstatisticas(partidaId, model);
                    }
                    else
                    {
                        var est = estatistica.FirstOrDefault(est => est.id == model.id);
                        model.partidaId = partidaId;

                        _mapper.Map(model, est);

                        _geralPersistence.Update<Estatisticas>(est);
                        await _geralPersistence.SaveChangeAsync();
                    }                    
                }
                var estatisticaRetorno = await _EstatisticasPersistence.GetEstatisticasByPartidaIdAsync(partidaId);
                return _mapper.Map<estatisticasDto[]>(estatisticaRetorno);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteEstatisticas(int partidaId, int EstatisticasId)
        {
            try
            {
                var Estatisticas = await _EstatisticasPersistence.GetEstatisticasByIdsAsync(partidaId, EstatisticasId);
                if (Estatisticas == null) throw new Exception("Erro: Estatisticas nao encontrado para ser deletado!");

                _geralPersistence.Delete(Estatisticas);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<estatisticasDto[]> GetEstatisticasByPartidaIdAsync(int partidaId)
        {
            try
            {
                var estatisticas = await _EstatisticasPersistence.GetEstatisticasByPartidaIdAsync(partidaId);
                if (estatisticas == null) return null;

                var resultado = _mapper.Map<estatisticasDto[]>(estatisticas);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<estatisticasDto[]> GetEstatisticasByJogadorIdAsync(int jogadorId)
        {
            try
            {
                var estatisticas = await _EstatisticasPersistence.GetEstatisticasByJogadorIdAsync(jogadorId);
                if (estatisticas == null) return null;

                var resultado = _mapper.Map<estatisticasDto[]>(estatisticas);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<estatisticasDto> GetEstatisticasByIdsAsync(int EstatisticasId, int estatisticaId)
        {
            try
            {
                var estatisticas = await _EstatisticasPersistence.GetEstatisticasByIdsAsync(EstatisticasId, estatisticaId);
                if (estatisticas == null) return null;

                var resultado = _mapper.Map<estatisticasDto>(estatisticas);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<estatisticasDto[]> GetAllEstatisticas()
        {
            try
            {
                var estatisticas = await _EstatisticasPersistence.GetAllEstatisticas();
                if (estatisticas == null) return null;

                var resultado = _mapper.Map<estatisticasDto[]>(estatisticas);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}