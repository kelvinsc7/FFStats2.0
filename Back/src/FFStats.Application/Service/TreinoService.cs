using System;
using System.Threading.Tasks;
using AutoMapper;
using FFStats.Application.Contratos;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class TreinoService : ITreinoService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly ITreinoPersistence _TreinoPersistence;
        private readonly IMapper _mapper;
        public TreinoService(IGeralPersistence geralPersistence, ITreinoPersistence TreinoPersistence, IMapper mapper)
        {
            this._mapper = mapper;
            this._TreinoPersistence = TreinoPersistence;
            this._geralPersistence = geralPersistence;

        }
        public async Task<treinoDto> AddTreinos(treinoDto model)
        {
            try
            {
                var treino = _mapper.Map<Treino>(model);
                _geralPersistence.Add<Treino>(treino);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var treinoRetorno = await _TreinoPersistence.GetAllTreinoByIdAsync(treino.id, false);
                    return _mapper.Map<treinoDto>(treinoRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<treinoDto> UpdateTreinos(int TreinoId, treinoDto model)
        {
            try
            {
                var treino = await _TreinoPersistence.GetAllTreinoByIdAsync(TreinoId, false);
                if (treino == null) return null;

                model.Id = treino.id;
                
                _mapper.Map(model, treino);
                _geralPersistence.Update(treino);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var treinoRetorno = await _TreinoPersistence.GetAllTreinoByIdAsync(treino.id, false);
                    return _mapper.Map<treinoDto>(treinoRetorno);
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
                if (Treino == null) throw new Exception("Erro: Treino nao encontrado para ser deletado!");

                _geralPersistence.Delete(Treino);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<treinoDto[]> GetAllTreinosAsync(bool IncludeJogador = false)
        {
            try
            {
                var treino = await _TreinoPersistence.GetAllTreinoAsync(IncludeJogador);
                if (treino == null) return null;

                var resultado = _mapper.Map<treinoDto[]>(treino);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<treinoDto[]> GetAllTreinosByDescAsync(string Desc, bool IncludeJogador = false)
        {
            try
            {
                var treino = await _TreinoPersistence.GetAllTreinoByNomeAsync(Desc, IncludeJogador);
                if (treino == null) return null;

                var resultado = _mapper.Map<treinoDto[]>(treino);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<treinoDto> GetTreinosByIdAsync(int TreinoId, bool IncludeJogador = false)
        {
            try
            {
                var treino = await _TreinoPersistence.GetAllTreinoByIdAsync(TreinoId, IncludeJogador);
                if (treino == null) return null;

                var resultado = _mapper.Map<treinoDto>(treino);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}