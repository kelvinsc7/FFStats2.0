using System;
using System.Linq;
using System.Threading.Tasks;
using FFStats.Application.Contratos;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace FFStats.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstatisticasController : ControllerBase
    {
        private readonly IEstatisticasService _EstatisticasService;

        public EstatisticasController(IEstatisticasService EstatisticasService)
        {
            this._EstatisticasService = EstatisticasService;
        }
        [HttpGet()]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var Estatisticas = await _EstatisticasService.GetAllEstatisticas();
                if(Estatisticas == null) return NotFound("Nenhuma Estatisticas Encontrada!");

                return  Ok(Estatisticas);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Estatisticas. Erro: {ex.Message}");
            }
        }

        [HttpGet("{partidaId}")]
        public async Task<IActionResult> Get(int partidaId)
        {
            try
            {
                var Estatisticas = await _EstatisticasService.GetEstatisticasByPartidaIdAsync(partidaId);
                if(Estatisticas == null) return NotFound("Nenhuma Estatisticas Encontrada!");

                return  Ok(Estatisticas);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Estatisticas. Erro: {ex.Message}");
            }
        }
        [HttpGet("Jogador/{jogadorId}")]
        public async Task<IActionResult> GetbyJogador(int jogadorId)
        {
            try
            {
                var Estatisticas = await _EstatisticasService.GetEstatisticasByJogadorIdAsync(jogadorId);
                if(Estatisticas == null) return NotFound("Nenhuma Estatisticas Encontrada!");

                return  Ok(Estatisticas);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Estatisticas. Erro: {ex.Message}");
            }
        }


        [HttpPut("{partidaId}")]
        public async Task<IActionResult> SaveEstatisticas(int partidaId, estatisticasDto[] models)
        {
            try
            {
                var Estatisticas = await _EstatisticasService.SaveEstatistica(partidaId, models);
                if(Estatisticas == null) return BadRequest("Erro ao Tentar Atualizar Estatisticas");
                return  Ok(Estatisticas);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Salvar Estatisticas. Erro: {ex.Message}");
            }
        }
        [HttpDelete("{partidaId}/{estatisticaId}")]
        public async Task<IActionResult> Delete(int partidaId, int estatisticaId)
        {
            try
            {
                var estatistica = await _EstatisticasService.GetEstatisticasByIdsAsync(partidaId, estatisticaId);
                if (estatistica == null) return NoContent();

                return await _EstatisticasService.DeleteEstatisticas(estatistica.partidaId, estatistica.id) ?
                        Ok(new {message = "Deletado"} ):
                        throw new Exception("Ocorreu um erro nao especifico!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Deletar Estatisticas. Erro: {ex.Message}");
            }
        }
    }
}
