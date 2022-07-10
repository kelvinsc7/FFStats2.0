using System;
using System.Threading.Tasks;
using AutoMapper;
using FFStats.Application.Contratos;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class MapaService : IMapaService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly IMapaPersistence _MapaPersistence;
        public IMapper _mapper { get; }
        public MapaService(IGeralPersistence geralPersistence, IMapaPersistence MapaPersistence, IMapper mapper)
        {
            this._mapper = mapper;
            this._MapaPersistence = MapaPersistence;
            this._geralPersistence = geralPersistence;

        }
        public async Task<mapaDto> AddMapas(mapaDto model)
        {
            try
            {
                var mapa = _mapper.Map<Mapa>(model);
                _geralPersistence.Add<Mapa>(mapa);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var mapaRetorno = await _MapaPersistence.GetAllMapaByIdAsync(mapa.id, false);
                    return _mapper.Map<mapaDto>(mapaRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<mapaDto> UpdateMapas(int MapaId, mapaDto model)
        {
            try
            {
                var mapa = await _MapaPersistence.GetAllMapaByIdAsync(MapaId, false);
                if (mapa == null) return null;

                model.Id = mapa.id;
                _mapper.Map(model, mapa);
                _geralPersistence.Update<Mapa>(mapa);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var mapaRetorno = await _MapaPersistence.GetAllMapaByIdAsync(mapa.id, false);
                    return _mapper.Map<mapaDto>(mapaRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteMapa(int MapaId)
        {
            try
            {
                var Mapa = await _MapaPersistence.GetAllMapaByIdAsync(MapaId, false);
                if (Mapa == null) throw new Exception("Erro: Mapa nao encontrado para ser deletado!");

                _geralPersistence.Delete(Mapa);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<mapaDto[]> GetAllMapasAsync(bool IncludeJogador = false)
        {
            try
            {
                var mapa = await _MapaPersistence.GetAllMapaAsync(IncludeJogador);
                if (mapa == null) return null;

                var resultado = _mapper.Map<mapaDto[]>(mapa);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<mapaDto[]> GetAllMapasByDescAsync(string Desc, bool IncludeJogador = false)
        {
            try
            {
                var mapa = await _MapaPersistence.GetAllMapaByNomeAsync(Desc, IncludeJogador);
                if (mapa == null) return null;

                var resultado = _mapper.Map<mapaDto[]>(mapa);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<mapaDto> GetMapasByIdAsync(int MapaId, bool IncludeJogador = false)
        {
            try
            {
                var mapa = await _MapaPersistence.GetAllMapaByIdAsync(MapaId, IncludeJogador);
                if (mapa == null) return null;

                var resultado = _mapper.Map<mapaDto>(mapa);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}