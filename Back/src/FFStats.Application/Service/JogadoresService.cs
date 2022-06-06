using System;
using System.Threading.Tasks;
using FFStats.Application.Contratos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class JogadoresService : IJogadoresService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly IJogadorPersistence _JogadoresPersistence;
        public JogadoresService(IGeralPersistence geralPersistence, IJogadorPersistence JogadoresPersistence)
        {
            this._JogadoresPersistence = JogadoresPersistence;
            this._geralPersistence = geralPersistence;

        }

        public async Task<Jogador> AddJogadoress(Jogador model)
        {
            try
            {
                _geralPersistence.Add<Jogador>(model);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    return await _JogadoresPersistence.GetAllJogadoresByIdAsync(model.Id, false);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<Jogador> UpdateJogadoress(int JogadoresId, Jogador model)
        {
            try
            {
                var jogador = await _JogadoresPersistence.GetAllJogadoresByIdAsync(JogadoresId, false);
                if(jogador == null) return null;

                model.Id = jogador.Id;
                
                _geralPersistence.Update(model);
                if(await _geralPersistence.SaveChangeAsync())
                {
                    return await _JogadoresPersistence.GetAllJogadoresByIdAsync(model.Id, false);
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

        public async Task<Jogador[]> GetAllJogadoresAsync(bool IncludeJogadores = false)
        {
            try
            {
                var Jogadores = await _JogadoresPersistence.GetAllJogadoresAsync(IncludeJogadores);
                if(Jogadores == null) return null;

                return Jogadores;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Jogador[]> GetAllJogadoresByDescAsync(string Desc, bool IncludeJogadores = false)
        {
            try
            {
                var Jogadores = await _JogadoresPersistence.GetAllJogadoresByNomeAsync(Desc, IncludeJogadores);
                if(Jogadores == null) return null;

                return Jogadores;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Jogador> GetJogadoresByIdAsync(int JogadoresId, bool IncludeJogadores = false)
        {
            try
            {
                var Jogadores = await _JogadoresPersistence.GetAllJogadoresByIdAsync(JogadoresId, IncludeJogadores);
                if(Jogadores == null) return null;

                return Jogadores;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}