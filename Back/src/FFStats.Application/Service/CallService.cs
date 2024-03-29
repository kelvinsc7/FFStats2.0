using System;
using System.Threading.Tasks;
using AutoMapper;
using FFStats.Application.Contratos;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class CallService : ICallService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly ICallPersistence _CallPersistence;
        public IMapper _mapper { get; }
        public CallService(IGeralPersistence geralPersistence, ICallPersistence CallPersistence, IMapper mapper)
        {
            this._mapper = mapper;
            this._CallPersistence = CallPersistence;
            this._geralPersistence = geralPersistence;

        }
        public async Task<callDto> AddCalls(callDto model)
        {
            try
            {
                var call = _mapper.Map<Call>(model);

                _geralPersistence.Add<Call>(call);

                if (await _geralPersistence.SaveChangeAsync())
                {
                    var callRetorno = await _CallPersistence.GetAllCallByIdAsync(call.id, false);
                    return _mapper.Map<callDto>(callRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<callDto> UpdateCalls(int CallId, callDto model)
        {
            try
            {
                var Call = await _CallPersistence.GetAllCallByIdAsync(CallId, false);
                if (Call == null) return null;

                model.Id = Call.id;

                _mapper.Map(model, Call);

                _geralPersistence.Update<Call>(Call);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var callRetorno = await _CallPersistence.GetAllCallByIdAsync(Call.id, false);
                    return _mapper.Map<callDto>(callRetorno);
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
                if (Call == null) throw new Exception("Erro: Call nao encontrado para ser deletado!");

                _geralPersistence.Delete(Call);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<callDto[]> GetAllCallsAsync(bool IncludeJogador = false)
        {
            try
            {
                var Calls = await _CallPersistence.GetAllCallAsync(IncludeJogador);
                if (Calls == null) return null;

                var resultado = _mapper.Map<callDto[]>(Calls);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<callDto[]> GetAllCallsByDescAsync(string Desc, bool IncludeJogador = false)
        {
            try
            {
                var Calls = await _CallPersistence.GetAllCallByNomeAsync(Desc, IncludeJogador);
                if (Calls == null) return null;

                var resultado = _mapper.Map<callDto[]>(Calls);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<callDto> GetCallsByIdAsync(int CallId, bool IncludeJogador = false)
        {
            try
            {
                var Calls = await _CallPersistence.GetAllCallByIdAsync(CallId, IncludeJogador);
                if (Calls == null) return null;

                var resultado = _mapper.Map<callDto>(Calls);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<callDto[]> GetAllCallByMapaId(int mapaId, bool IncludeMapa = false)
        {
            try
            {
                var Calls = await _CallPersistence.GetAllCallByMapaIdAsync(mapaId, IncludeMapa);
                if (Calls == null) return null;

                var resultado = _mapper.Map<callDto[]>(Calls);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}