using System;
using System.Threading.Tasks;
using FFStats.Application.Contratos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class ModoService : IModoService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly IModoPersistence _ModoPersistence;
        public ModoService(IGeralPersistence geralPersistence, IModoPersistence ModoPersistence)
        {
            this._ModoPersistence = ModoPersistence;
            this._geralPersistence = geralPersistence;

        }
        public async Task<Modo> AddModos(Modo model)
        {
            try
            {
                _geralPersistence.Add<Modo>(model);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    return await _ModoPersistence.GetAllModoByIdAsync(model.Id, false);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Modo> UpdateModos(int ModoId, Modo model)
        {
            try
            {
                var Modo = await _ModoPersistence.GetAllModoByIdAsync(ModoId, false);
                if(Modo == null) return null;

                model.Id = Modo.Id;
                
                _geralPersistence.Update(model);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    return await _ModoPersistence.GetAllModoByIdAsync(model.Id, false);
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
                if(Modo == null) throw new Exception ("Erro: Modo nao encontrado para ser deletado!");

                _geralPersistence.Delete(Modo);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Modo[]> GetAllModosAsync(bool IncludeSub = false)
        {
            try
            {
                var Modos = await _ModoPersistence.GetAllModoAsync(IncludeSub);
                if(Modos == null) return null;

                return Modos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Modo[]> GetAllModosByDescAsync(string Desc, bool IncludeSub = false)
        {
            try
            {
                var Modos = await _ModoPersistence.GetAllModoByNomeAsync(Desc, IncludeSub);
                if(Modos == null) return null;

                return Modos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Modo> GetModosByIdAsync(int ModoId, bool IncludeSub = false)
        {
            try
            {
                var Modos = await _ModoPersistence.GetAllModoByIdAsync(ModoId, IncludeSub);
                if(Modos == null) return null;

                return Modos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}