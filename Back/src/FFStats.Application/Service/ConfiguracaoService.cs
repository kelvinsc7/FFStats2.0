using System;
using System.Threading.Tasks;
using AutoMapper;
using FFStats.Application.Contratos;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;
using FFStats.Persistence.Migrations;

namespace FFStats.Application.Service
{
    public class ConfiguracaoService : IConfiguracaoService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly IConfiguracaoPersistence _ConfiguracaoPersistence;
        public IMapper _mapper { get; }
        public ConfiguracaoService(IGeralPersistence geralPersistence, IConfiguracaoPersistence ConfiguracaoPersistence, IMapper mapper)
        {
            this._mapper = mapper;
            this._ConfiguracaoPersistence = ConfiguracaoPersistence;
            this._geralPersistence = geralPersistence;

        }

        public async Task<ConfiguracaoDTO[]> GetAllConfiguracoes()
        {
            try
            {
                var Configuracao = await _ConfiguracaoPersistence.GetAllConfiguracoes();
                if (Configuracao == null) return null;

                var resultado = _mapper.Map<ConfiguracaoDTO[]>(Configuracao);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ConfiguracaoDTO> UpdateConfiguracao(int id, ConfiguracaoDTO model)
        {
            try
            {
                var Configuracao = await _ConfiguracaoPersistence.GetAllConfiguracoesbyId(id);
                if (Configuracao == null) return null;

                model.Id = Configuracao.Id;

                _mapper.Map(model, Configuracao);

                _geralPersistence.Update<Configuracao>(Configuracao);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var ConfiguracaoRetorno = await _ConfiguracaoPersistence.GetAllConfiguracoesbyId(Configuracao.Id);
                    return _mapper.Map<ConfiguracaoDTO>(ConfiguracaoRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}