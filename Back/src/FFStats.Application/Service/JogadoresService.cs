using System;
using System.Threading.Tasks;
using AutoMapper;
using FFStats.Application.Contratos;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class JogadoresService : IJogadoresService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly IJogadorPersistence _JogadoresPersistence;
        private readonly IMapper _mapper;
        public JogadoresService(IGeralPersistence geralPersistence,
               IJogadorPersistence JogadoresPersistence,
               IMapper mapper)
        {
            this._JogadoresPersistence = JogadoresPersistence;
            this._geralPersistence = geralPersistence;
            this._mapper = mapper;
        }

        public async Task<jogadoresDto> AddJogadoress(jogadoresDto model)
        {
            try
            {
                var jogador = _mapper.Map<Jogador>(model);
                _geralPersistence.Add<Jogador>(jogador);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    var jogadorRetorno =await _JogadoresPersistence.GetAllJogadoresByIdAsync(jogador.id, false);
                    return _mapper.Map<jogadoresDto>(jogadorRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<jogadoresDto> UpdateJogadoress(int JogadoresId, jogadoresDto model)
        {
            try
            {
                var jogador = await _JogadoresPersistence.GetAllJogadoresByIdAsync(JogadoresId, false);
                if(jogador == null) 
                    return null;

                model.Id = jogador.id;
                _mapper.Map(model, jogador);
                _geralPersistence.Update<Jogador>(jogador);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    var jogadorRetorno =await _JogadoresPersistence.GetAllJogadoresByIdAsync(jogador.id, false);
                    return _mapper.Map<jogadoresDto>(jogadorRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteJogador(int JogadorId)
        {
            try
            {
                var Jogadore = await _JogadoresPersistence.GetAllJogadoresByIdAsync(JogadorId, false);
                if(Jogadore == null) throw new Exception ("Erro: Jogadore nao encontrado para ser deletado!");

                _geralPersistence.Delete(Jogadore);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<jogadoresDto[]> GetAllJogadoresAsync(bool IncludePartidas = false)
        {
            try
            {
                var jogadores = await _JogadoresPersistence.GetAllJogadoresAsync(IncludePartidas);
                if(jogadores == null) return null;

                var resultado = _mapper.Map<jogadoresDto[]>(jogadores);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<jogadoresDto> GetJogadoresByIdAsync(int JogadoresId, bool IncludePartidas = false)
        {
            try
            {
                var jogadores = await _JogadoresPersistence.GetAllJogadoresByIdAsync(JogadoresId, IncludePartidas);
                if(jogadores == null) return null;
                var resultado = _mapper.Map<jogadoresDto>(jogadores);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<jogadoresDto[]> GetAllJogadoresByDescAsync(string Desc, bool IncludePartidas = false)
        {
            try
            {
                var jogadores = await _JogadoresPersistence.GetAllJogadoresByNomeAsync(Desc, IncludePartidas);
                if(jogadores == null) return null;
                var resultado = _mapper.Map<jogadoresDto[]>(jogadores);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}