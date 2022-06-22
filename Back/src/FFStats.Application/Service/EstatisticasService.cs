using System;
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
        public async Task<estatisticasDto> AddEstatisticass(estatisticasDto model)
        {
            try
            {
                var estatistica = _mapper.Map<Estatisticas>(model);
                _geralPersistence.Add<Estatisticas>(estatistica);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var estatisticaRetorno = await _EstatisticasPersistence.GetAllEstatisticasByIdAsync(estatistica.id, false);
                    return _mapper.Map<estatisticasDto>(estatisticaRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<estatisticasDto> UpdateEstatisticass(int EstatisticasId, estatisticasDto model)
        {
            try
            {
                var estatistica = await _EstatisticasPersistence.GetAllEstatisticasByIdAsync(EstatisticasId, false);
                if (estatistica == null) return null;

                model.id = estatistica.id;

                _mapper.Map(model,estatistica);

                _geralPersistence.Update<Estatisticas>(estatistica);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var estatisticaRetorno = await _EstatisticasPersistence.GetAllEstatisticasByIdAsync(estatistica.id, false);
                    return _mapper.Map<estatisticasDto>(estatisticaRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteEstatisticas(int EstatisticasId)
        {
            try
            {
                var Estatisticas = await _EstatisticasPersistence.GetAllEstatisticasByIdAsync(EstatisticasId, false);
                if (Estatisticas == null) throw new Exception("Erro: Estatisticas nao encontrado para ser deletado!");

                _geralPersistence.Delete(Estatisticas);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<estatisticasDto[]> GetAllEstatisticassAsync(bool IncludeJogador = false)
        {
            try
            {
                var estatisticas = await _EstatisticasPersistence.GetAllEstatisticasAsync(IncludeJogador);
                if (estatisticas == null) return null;

                var resultado = _mapper.Map<estatisticasDto[]>(estatisticas);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<estatisticasDto[]> GetAllEstatisticassByDescAsync(string Desc, bool IncludeJogador = false)
        {
            try
            {
                var estatisticas = await _EstatisticasPersistence.GetAllEstatisticasByNomeAsync(Desc, IncludeJogador);
                if (estatisticas == null) return null;

                var resultado = _mapper.Map<estatisticasDto[]>(estatisticas);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<estatisticasDto> GetEstatisticassByIdAsync(int EstatisticasId, bool IncludeJogador = false)
        {
            try
            {
                var estatisticas = await _EstatisticasPersistence.GetAllEstatisticasByIdAsync(EstatisticasId, IncludeJogador);
                if (estatisticas == null) return null;

                var resultado = _mapper.Map<estatisticasDto>(estatisticas);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}