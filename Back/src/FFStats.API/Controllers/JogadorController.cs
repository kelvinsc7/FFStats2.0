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
    public class JogadorController : ControllerBase
    {
        private readonly IJogadoresService _JogadoresService;

        public JogadorController(IJogadoresService JogadoresService)
        {
            this._JogadoresService = JogadoresService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var Jogadors = await _JogadoresService.GetAllJogadoresAsync(true);
                if(Jogadors == null) 
                    return NotFound("Nenhuma Jogador Encontrada!");

                return  Ok(Jogadors);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Jogador. Erro: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            try
            {
                var Jogador = await _JogadoresService.GetJogadoresByIdAsync(id,true);
                if(Jogador == null) return NotFound("Nenhuma Jogador Encontrada!");

                return  Ok(Jogador);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Jogador. Erro: {ex.Message}");
            }
        }
        [HttpGet("idJogo/{id}")]
        public async Task<IActionResult> GetByIdJogoAsync(int id)
        {
            try
            {
                var Jogador = await _JogadoresService.GetJogadoresByIdJogoAsync(id,true);
                if(Jogador == null) return NotFound("Nenhuma Jogador Encontrada!");

                return  Ok(Jogador);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Jogador. Erro: {ex.Message}");
            }
        }
        [HttpGet("ffInfo/{id}")]
        public async Task<IActionResult> GetByUIdAsync(int id)
        {
            try
            {
                FreeFireApiService apiService = new FreeFireApiService();
                var Jogador = await apiService.GetPlayerDataAsync("br", id.ToString());
                if(Jogador == null) return NotFound("Nenhuma Jogador Encontrada!");

                return  Ok(Jogador);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Jogador. Erro: {ex.Message}");
            }
        }
        [HttpGet("freeffapi/{id}")]
        public async Task<IActionResult> GetByUId2Async(int id)
        {
            try
            {
                freeffapi apiService = new freeffapi();
                var Jogador = await apiService.GetPlayerStatsAsync(id.ToString());
                if(Jogador == null) return NotFound("Nenhuma Jogador Encontrada!");

                return  Ok(Jogador);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Jogador. Erro: {ex.Message}");
            }
        }
        [HttpGet("{desc}/descricao")]
        public async Task<IActionResult> GetByDesc(string desc)
        {
            try
            {
                var Jogador = await _JogadoresService.GetAllJogadoresByDescAsync(desc, true);
                if(Jogador == null) return NotFound("Nenhuma Jogador Encontrada!");
                return  Ok(Jogador);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Jogador. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(jogadoresDto model)
        {
            try
            {
                var Jogador = await _JogadoresService.AddJogadoress(model);
                if(Jogador == null) return BadRequest("Erro ao Tentar adicionar Jogador");
                return  Ok(Jogador);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Adicionar Jogador. Erro: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, jogadoresDto model)
        {
            try
            {
                var Jogador = await _JogadoresService.UpdateJogadoress(id, model);
                if(Jogador == null) 
                    return BadRequest("Erro ao Tentar Atualizar Jogador");
                return  Ok(Jogador);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Atualizar Jogador. Erro: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                return await _JogadoresService.DeleteJogador(Id) ?
                        Ok(new {message = "Deletado"} ):
                        throw new Exception("Ocorreu um erro nao especifico!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Deletar Jogador. Erro: {ex.Message}");
            }
        }
    }
}
