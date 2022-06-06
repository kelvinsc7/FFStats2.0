using System;
using System.Threading.Tasks;
using FFStats.Application.Contratos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class MapaService : IMapaService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly IMapaPersistence _MapaPersistence;
        public MapaService(IGeralPersistence geralPersistence, IMapaPersistence MapaPersistence)
        {
            this._MapaPersistence = MapaPersistence;
            this._geralPersistence = geralPersistence;

        }
        public async Task<Mapa> AddMapas(Mapa model)
        {
            try
            {
                _geralPersistence.Add<Mapa>(model);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    return await _MapaPersistence.GetAllMapaByIdAsync(model.Id, false);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Mapa> UpdateMapas(int MapaId, Mapa model)
        {
            try
            {
                var Mapa = await _MapaPersistence.GetAllMapaByIdAsync(MapaId, false);
                if(Mapa == null) return null;

                model.Id = Mapa.Id;
                
                _geralPersistence.Update(model);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    return await _MapaPersistence.GetAllMapaByIdAsync(model.Id, false);
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
                if(Mapa == null) throw new Exception ("Erro: Mapa nao encontrado para ser deletado!");

                _geralPersistence.Delete(Mapa);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Mapa[]> GetAllMapasAsync(bool IncludeJogador = false)
        {
            try
            {
                var Mapas = await _MapaPersistence.GetAllMapaAsync(IncludeJogador);
                if(Mapas == null) return null;

                return Mapas;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Mapa[]> GetAllMapasByDescAsync(string Desc, bool IncludeJogador = false)
        {
            try
            {
                var Mapas = await _MapaPersistence.GetAllMapaByNomeAsync(Desc, IncludeJogador);
                if(Mapas == null) return null;

                return Mapas;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Mapa> GetMapasByIdAsync(int MapaId, bool IncludeJogador = false)
        {
            try
            {
                var Mapas = await _MapaPersistence.GetAllMapaByIdAsync(MapaId, IncludeJogador);
                if(Mapas == null) return null;

                return Mapas;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}