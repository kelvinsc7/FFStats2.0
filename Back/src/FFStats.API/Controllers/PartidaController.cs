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
    public class PartidaController : ControllerBase
    {
        private readonly IPartidaService _partidaService;

        public PartidaController(IPartidaService partidaService)
        {
            this._partidaService = partidaService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var partidas = await _partidaService.GetAllPartidasAsync(true);
                if(partidas == null) return NotFound("Nenhuma Partida Encontrada!");

                return  Ok(partidas);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Partida. Erro: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            try
            {
                var partida = await _partidaService.GetPartidasByIdAsync(id,true);
                if(partida == null) return NotFound("Nenhuma Partida Encontrada!");

                return  Ok(partida);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Partida. Erro: {ex.Message}");
            }
        }
        [HttpGet("{id}/mapa")]
        public async Task<IActionResult> GetByMapaIdAsync(int id)
        {
            try
            {
                var partida = await _partidaService.GetPartidasByMapaIdAsync(id,true);
                if(partida == null) return NotFound("Nenhuma Partida Encontrada!");

                return  Ok(partida);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Partida. Erro: {ex.Message}");
            }
        }
        [HttpGet("{desc}/descricao")]
        public async Task<IActionResult> GetByDesc(string desc)
        {
            try
            {
                var partida = await _partidaService.GetAllPartidasByDescAsync(desc, true);
                if(partida == null) return NotFound("Nenhuma Partida Encontrada!");
                return  Ok(partida);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Partida. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(partidaDto model)
        {
            try
            {
                var partida = await _partidaService.AddPartidas(model);
                if(partida == null) return BadRequest("Erro ao Tentar adicionar Partida");
                return  Ok(partida);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Adicionar Partida. Erro: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, partidaDto model)
        {
            try
            {
                var partida = await _partidaService.UpdatePartidas(id, model);
                if(partida == null) return BadRequest("Erro ao Tentar Atualizar Partida");
                return  Ok(partida);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Atualizar Partida. Erro: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                return await _partidaService.DeletePartida(Id) ?
                        Ok(new {message = "Deletado"} ):
                        throw new Exception("Ocorreu um erro nao especifico!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Deletar Partida. Erro: {ex.Message}");
            }
        }
    }
}
