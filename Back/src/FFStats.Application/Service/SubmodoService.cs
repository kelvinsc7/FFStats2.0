using System;
using System.Threading.Tasks;
using FFStats.Application.Contratos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class SubmodoService : ISubmodoService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly ISubmodoPersistence _SubmodoPersistence;
        public SubmodoService(IGeralPersistence geralPersistence, ISubmodoPersistence SubmodoPersistence)
        {
            this._SubmodoPersistence = SubmodoPersistence;
            this._geralPersistence = geralPersistence;

        }
        public async Task<Submodo> AddSubmodos(Submodo model)
        {
            try
            {
                _geralPersistence.Add<Submodo>(model);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    return await _SubmodoPersistence.GetAllSubmodoByIdAsync(model.submodoId, false);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Submodo> UpdateSubmodos(int SubmodoId, Submodo model)
        {
            try
            {
                var Submodo = await _SubmodoPersistence.GetAllSubmodoByIdAsync(SubmodoId, false);
                if(Submodo == null) return null;

                model.submodoId = Submodo.submodoId;
                
                _geralPersistence.Update(model);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    return await _SubmodoPersistence.GetAllSubmodoByIdAsync(model.submodoId, false);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteSubmodo(int SubmodoId)
        {
            try
            {
                var Submodo = await _SubmodoPersistence.GetAllSubmodoByIdAsync(SubmodoId, false);
                if(Submodo == null) throw new Exception ("Erro: Submodo nao encontrado para ser deletado!");

                _geralPersistence.Delete(Submodo);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Submodo[]> GetAllSubmodosAsync(bool IncludeJogador = false)
        {
            try
            {
                var Submodos = await _SubmodoPersistence.GetAllSubmodoAsync(IncludeJogador);
                if(Submodos == null) return null;

                return Submodos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Submodo[]> GetAllSubmodosByDescAsync(string Desc, bool IncludeJogador = false)
        {
            try
            {
                var Submodos = await _SubmodoPersistence.GetAllSubmodoByNomeAsync(Desc, IncludeJogador);
                if(Submodos == null) return null;

                return Submodos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Submodo> GetSubmodosByIdAsync(int SubmodoId, bool IncludeJogador = false)
        {
            try
            {
                var Submodos = await _SubmodoPersistence.GetAllSubmodoByIdAsync(SubmodoId, IncludeJogador);
                if(Submodos == null) return null;

                return Submodos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}