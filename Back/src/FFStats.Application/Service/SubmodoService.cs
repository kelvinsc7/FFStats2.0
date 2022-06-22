using System;
using System.Threading.Tasks;
using AutoMapper;
using FFStats.Application.Contratos;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class SubmodoService : ISubmodoService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly ISubmodoPersistence _SubmodoPersistence;
        private readonly IMapper _mapper;
        public SubmodoService(IGeralPersistence geralPersistence, ISubmodoPersistence SubmodoPersistence, IMapper mapper)
        {
            this._mapper = mapper;
            this._SubmodoPersistence = SubmodoPersistence;
            this._geralPersistence = geralPersistence;

        }
        public async Task<subModoDto> AddSubmodos(subModoDto model)
        {
            try
            {
                var submodo = _mapper.Map<Submodo>(model);
                _geralPersistence.Add<Submodo>(submodo);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var submodoRetorno = await _SubmodoPersistence.GetAllSubmodoByIdAsync(submodo.submodoId, false);
                    return _mapper.Map<subModoDto>(submodoRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<subModoDto> UpdateSubmodos(int SubmodoId, subModoDto model)
        {
            try
            {
                var submodo = await _SubmodoPersistence.GetAllSubmodoByIdAsync(SubmodoId, false);
                if (submodo == null) return null;

                model.submodoId = submodo.submodoId;
                _mapper.Map(model, submodo);
                _geralPersistence.Update(model);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var submodoRetorno = await _SubmodoPersistence.GetAllSubmodoByIdAsync(submodo.submodoId, false);
                    return _mapper.Map<subModoDto>(submodoRetorno);
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
                if (Submodo == null) throw new Exception("Erro: Submodo nao encontrado para ser deletado!");

                _geralPersistence.Delete(Submodo);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<subModoDto[]> GetAllSubmodosAsync(bool IncludeJogador = false)
        {
            try
            {
                var submodo = await _SubmodoPersistence.GetAllSubmodoAsync(IncludeJogador);
                if (submodo == null) return null;

                var resultado = _mapper.Map<subModoDto[]>(submodo);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<subModoDto[]> GetAllSubmodosByDescAsync(string Desc, bool IncludeJogador = false)
        {
            try
            {
                var submodo = await _SubmodoPersistence.GetAllSubmodoByNomeAsync(Desc, IncludeJogador);
                if (submodo == null) return null;

                var resultado = _mapper.Map<subModoDto[]>(submodo);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<subModoDto> GetSubmodosByIdAsync(int SubmodoId, bool IncludeJogador = false)
        {
            try
            {
                var submodo = await _SubmodoPersistence.GetAllSubmodoByIdAsync(SubmodoId, IncludeJogador);
                if (submodo == null) return null;

                var resultado = _mapper.Map<subModoDto>(submodo);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}