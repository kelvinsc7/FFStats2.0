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
    public class TreinoController : ControllerBase
    {
        private readonly ITreinoService _TreinoService;

        public TreinoController(ITreinoService TreinoService)
        {
            this._TreinoService = TreinoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var Treinos = await _TreinoService.GetAllTreinosAsync(true);
                if(Treinos == null) return NotFound("Nenhuma Treino Encontrada!");

                return  Ok(Treinos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Treino. Erro: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            try
            {
                var Treino = await _TreinoService.GetTreinosByIdAsync(id,true);
                if(Treino == null) return NotFound("Nenhuma Treino Encontrada!");

                return  Ok(Treino);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Treino. Erro: {ex.Message}");
            }
        }
        [HttpGet("{desc}/descricao")]
        public async Task<IActionResult> GetByDesc(string desc)
        {
            try
            {
                var Treino = await _TreinoService.GetAllTreinosByDescAsync(desc, true);
                if(Treino == null) return NotFound("Nenhuma Treino Encontrada!");
                return  Ok(Treino);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Treino. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(treinoDto model)
        {
            try
            {
                var Treino = await _TreinoService.AddTreinos(model);
                if(Treino == null) return BadRequest("Erro ao Tentar adicionar Treino");
                return  Ok(Treino);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Adicionar Treino. Erro: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, treinoDto model)
        {
            try
            {
                var Treino = await _TreinoService.UpdateTreinos(id, model);
                if(Treino == null) return BadRequest("Erro ao Tentar Atualizar Treino");
                return  Ok(Treino);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Atualizar Treino. Erro: {ex.Message}");
            }
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                return await _TreinoService.DeleteTreino(Id) ?
                        Ok("Deletado"):
                        BadRequest("Treino Não Deletada");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Deletar Treino. Erro: {ex.Message}");
            }
        }
    }
}
