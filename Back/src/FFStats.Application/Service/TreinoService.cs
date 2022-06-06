using System;
using System.Threading.Tasks;
using FFStats.Application.Contratos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class TreinoService : ITreinoService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly ITreinoPersistence _TreinoPersistence;
        public TreinoService(IGeralPersistence geralPersistence, ITreinoPersistence TreinoPersistence)
        {
            this._TreinoPersistence = TreinoPersistence;
            this._geralPersistence = geralPersistence;

        }
        public async Task<Treino> AddTreinos(Treino model)
        {
            try
            {
                _geralPersistence.Add<Treino>(model);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    return await _TreinoPersistence.GetAllTreinoByIdAsync(model.treinoId, false);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Treino> UpdateTreinos(int TreinoId, Treino model)
        {
            try
            {
                var Treino = await _TreinoPersistence.GetAllTreinoByIdAsync(TreinoId, false);
                if(Treino == null) return null;

                model.treinoId = Treino.treinoId;
                
                _geralPersistence.Update(model);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    return await _TreinoPersistence.GetAllTreinoByIdAsync(model.treinoId, false);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteTreino(int TreinoId)
        {
            try
            {
                var Treino = await _TreinoPersistence.GetAllTreinoByIdAsync(TreinoId, false);
                if(Treino == null) throw new Exception ("Erro: Treino nao encontrado para ser deletado!");

                _geralPersistence.Delete(Treino);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Treino[]> GetAllTreinosAsync(bool IncludeJogador = false)
        {
            try
            {
                var Treinos = await _TreinoPersistence.GetAllTreinoAsync(IncludeJogador);
                if(Treinos == null) return null;

                return Treinos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Treino[]> GetAllTreinosByDescAsync(string Desc, bool IncludeJogador = false)
        {
            try
            {
                var Treinos = await _TreinoPersistence.GetAllTreinoByNomeAsync(Desc, IncludeJogador);
                if(Treinos == null) return null;

                return Treinos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Treino> GetTreinosByIdAsync(int TreinoId, bool IncludeJogador = false)
        {
            try
            {
                var Treinos = await _TreinoPersistence.GetAllTreinoByIdAsync(TreinoId, IncludeJogador);
                if(Treinos == null) return null;

                return Treinos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}