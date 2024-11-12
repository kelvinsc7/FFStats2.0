using System;
using System.Threading.Tasks;
using FFStats.Application.Contratos;
using FFStats.Application.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace FFStats.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfiguracaoController : ControllerBase
    {
        private readonly IConfiguracaoService _ConfiguracaoService;

        public ConfiguracaoController(IConfiguracaoService ConfiguracaoService)
        {
            this._ConfiguracaoService = ConfiguracaoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var configuracoes = await _ConfiguracaoService.GetAllConfiguracoes();
                if(configuracoes ==null) return NotFound("Nenhuma Configuração Encontrada");

                return Ok(configuracoes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Configurações. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ConfiguracaoDTO model)
        {
            try
            {
                var configuracoes = await _ConfiguracaoService.UpdateConfiguracao(id, model);
                if(configuracoes == null) return BadRequest("Erro ao Tentar Atualizar configurações");
                return Ok(configuracoes);
            }
            catch(Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Atualizar Configurações. Erro: {ex.Message}");
            }
        }
    }
}
