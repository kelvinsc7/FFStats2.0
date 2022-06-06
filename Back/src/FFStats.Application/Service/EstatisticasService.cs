using System;
using System.Threading.Tasks;
using FFStats.Application.Contratos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class EstatisticasService : IEstatisticasService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly IEstatisticasPersistence _EstatisticasPersistence;
        public EstatisticasService(IGeralPersistence geralPersistence, IEstatisticasPersistence EstatisticasPersistence)
        {
            this._EstatisticasPersistence = EstatisticasPersistence;
            this._geralPersistence = geralPersistence;

        }
        public async Task<Estatisticas> AddEstatisticass(Estatisticas model)
        {
            try
            {
                _geralPersistence.Add<Estatisticas>(model);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    return await _EstatisticasPersistence.GetAllEstatisticasByIdAsync(model.id, false);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Estatisticas> UpdateEstatisticass(int EstatisticasId, Estatisticas model)
        {
            try
            {
                var Estatisticas = await _EstatisticasPersistence.GetAllEstatisticasByIdAsync(EstatisticasId, false);
                if(Estatisticas == null) return null;

                model.id = Estatisticas.id;
                
                _geralPersistence.Update(model);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    return await _EstatisticasPersistence.GetAllEstatisticasByIdAsync(model.id, false);
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
                if(Estatisticas == null) throw new Exception ("Erro: Estatisticas nao encontrado para ser deletado!");

                _geralPersistence.Delete(Estatisticas);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Estatisticas[]> GetAllEstatisticassAsync(bool IncludeJogador = false)
        {
            try
            {
                var Estatisticass = await _EstatisticasPersistence.GetAllEstatisticasAsync(IncludeJogador);
                if(Estatisticass == null) return null;

                return Estatisticass;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Estatisticas[]> GetAllEstatisticassByDescAsync(string Desc, bool IncludeJogador = false)
        {
            try
            {
                var Estatisticass = await _EstatisticasPersistence.GetAllEstatisticasByNomeAsync(Desc, IncludeJogador);
                if(Estatisticass == null) return null;

                return Estatisticass;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Estatisticas> GetEstatisticassByIdAsync(int EstatisticasId, bool IncludeJogador = false)
        {
            try
            {
                var Estatisticass = await _EstatisticasPersistence.GetAllEstatisticasByIdAsync(EstatisticasId, IncludeJogador);
                if(Estatisticass == null) return null;

                return Estatisticass;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}