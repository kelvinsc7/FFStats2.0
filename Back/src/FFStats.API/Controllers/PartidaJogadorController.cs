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
    public class PartidaJogadorController : ControllerBase
    {
        private readonly IPartidaJogadorService _PartidaJogadorService;

        public PartidaJogadorController(IPartidaJogadorService PartidaJogadorService)
        {
            this._PartidaJogadorService = PartidaJogadorService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var PartidaJogadors = await _PartidaJogadorService.GetAllPartidaJogadoresAsync(true);
                if(PartidaJogadors == null) return NotFound("Nenhuma PartidaJogador Encontrada!");

                return  Ok(PartidaJogadors);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar PartidaJogador. Erro: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            try
            {
                var PartidaJogador = await _PartidaJogadorService.GetPartidaJogadoresByIdAsync(id,true);
                if(PartidaJogador == null) return NotFound("Nenhuma PartidaJogador Encontrada!");

                return  Ok(PartidaJogador);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar PartidaJogador. Erro: {ex.Message}");
            }
        }
        [HttpGet("{desc}/descricao")]
        public async Task<IActionResult> GetByDesc(string desc)
        {
            try
            {
                var PartidaJogador = await _PartidaJogadorService.GetAllPartidaJogadoresByDescAsync(desc, true);
                if(PartidaJogador == null) return NotFound("Nenhuma PartidaJogador Encontrada!");
                return  Ok(PartidaJogador);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar PartidaJogador. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(partidajogadoresDto model)
        {
            try
            {
                var PartidaJogador = await _PartidaJogadorService.AddPartidaJogadores(model);
                if(PartidaJogador == null) return BadRequest("Erro ao Tentar adicionar PartidaJogador");
                return  Ok(PartidaJogador);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Adicionar PartidaJogador. Erro: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, partidajogadoresDto model)
        {
            try
            {
                var PartidaJogador = await _PartidaJogadorService.UpdatePartidaJogadores(id, model);
                if(PartidaJogador == null) return BadRequest("Erro ao Tentar Atualizar PartidaJogador");
                return  Ok(PartidaJogador);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Atualizar PartidaJogador. Erro: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                return await _PartidaJogadorService.DeletePartidaJogador(Id) ?
                        Ok(new {message = "Deletado"} ):
                        throw new Exception("Ocorreu um erro nao especifico!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Deletar PartidaJogador. Erro: {ex.Message}");
            }
        }
    }
}
