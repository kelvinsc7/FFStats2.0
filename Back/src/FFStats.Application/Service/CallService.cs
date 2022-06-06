using System;
using System.Threading.Tasks;
using FFStats.Application.Contratos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class CallService : ICallService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly ICallPersistence _CallPersistence;
        public CallService(IGeralPersistence geralPersistence, ICallPersistence CallPersistence)
        {
            this._CallPersistence = CallPersistence;
            this._geralPersistence = geralPersistence;

        }
        public async Task<Call> AddCalls(Call model)
        {
            try
            {
                _geralPersistence.Add<Call>(model);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    return await _CallPersistence.GetAllCallByIdAsync(model.Id, false);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Call> UpdateCalls(int CallId, Call model)
        {
            try
            {
                var Call = await _CallPersistence.GetAllCallByIdAsync(CallId, false);
                if(Call == null) return null;

                model.Id = Call.Id;
                
                _geralPersistence.Update(model);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    return await _CallPersistence.GetAllCallByIdAsync(model.Id, false);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteCall(int CallId)
        {
            try
            {
                var Call = await _CallPersistence.GetAllCallByIdAsync(CallId, false);
                if(Call == null) throw new Exception ("Erro: Call nao encontrado para ser deletado!");

                _geralPersistence.Delete(Call);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Call[]> GetAllCallsAsync(bool IncludeJogador = false)
        {
            try
            {
                var Calls = await _CallPersistence.GetAllCallAsync(IncludeJogador);
                if(Calls == null) return null;

                return Calls;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Call[]> GetAllCallsByDescAsync(string Desc, bool IncludeJogador = false)
        {
            try
            {
                var Calls = await _CallPersistence.GetAllCallByNomeAsync(Desc, IncludeJogador);
                if(Calls == null) return null;

                return Calls;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Call> GetCallsByIdAsync(int CallId, bool IncludeJogador = false)
        {
            try
            {
                var Calls = await _CallPersistence.GetAllCallByIdAsync(CallId, IncludeJogador);
                if(Calls == null) return null;

                return Calls;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}