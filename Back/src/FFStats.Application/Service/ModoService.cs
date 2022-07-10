using System;
using System.Threading.Tasks;
using AutoMapper;
using FFStats.Application.Contratos;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class ModoService : IModoService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly IModoPersistence _ModoPersistence;
        private readonly IMapper _mapper;
        public ModoService(IGeralPersistence geralPersistence, IModoPersistence ModoPersistence, IMapper mapper)
        {
            this._mapper = mapper;
            this._ModoPersistence = ModoPersistence;
            this._geralPersistence = geralPersistence;

        }
        public async Task<modoDto> AddModos(modoDto model)
        {
            try
            {
                var modo = _mapper.Map<Modo>(model);
                _geralPersistence.Add<Modo>(modo);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var modoRetorno = await _ModoPersistence.GetAllModoByIdAsync(modo.id, false);
                    return _mapper.Map<modoDto>(modoRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<modoDto> UpdateModos(int ModoId, modoDto model)
        {
            try
            {
                var modo = await _ModoPersistence.GetAllModoByIdAsync(ModoId, false);
                if (modo == null) return null;

                model.Id = modo.id;
                _mapper.Map(modo, model);
                _geralPersistence.Update(model);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var modoRetorno = await _ModoPersistence.GetAllModoByIdAsync(modo.id, false);
                    return _mapper.Map<modoDto>(modoRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteModo(int ModoId)
        {
            try
            {
                var Modo = await _ModoPersistence.GetAllModoByIdAsync(ModoId, false);
                if (Modo == null) throw new Exception("Erro: Modo nao encontrado para ser deletado!");

                _geralPersistence.Delete(Modo);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<modoDto[]> GetAllModosAsync(bool IncludeSub = false)
        {
            try
            {
                var modos = await _ModoPersistence.GetAllModoAsync(IncludeSub);
                if (modos == null) return null;

                var resultado = _mapper.Map<modoDto[]>(modos);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<modoDto[]> GetAllModosByDescAsync(string Desc, bool IncludeSub = false)
        {
            try
            {
                var modos = await _ModoPersistence.GetAllModoByNomeAsync(Desc, IncludeSub);
                if (modos == null) return null;

                var resultado = _mapper.Map<modoDto[]>(modos);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<modoDto> GetModosByIdAsync(int ModoId, bool IncludeSub = false)
        {
            try
            {
                var modos = await _ModoPersistence.GetAllModoByIdAsync(ModoId, IncludeSub);
                if (modos == null) return null;

                var resultado = _mapper.Map<modoDto>(modos);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}