using System;
using System.Linq;
using System.Threading.Tasks;
using FFStats.Application.Contratos;
using FFStats.Application.Dtos;
using FFStats.Application.Service;
using FFStats.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace FFStats.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LineController : ControllerBase
    {
        private readonly ILineService _LineService;

        public LineController(ILineService LineService)
        {
            this._LineService = LineService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var Treinos = await _LineService.GetAllLinesAsync(true);
                if(Treinos == null) return NotFound("Nenhuma Line Encontrada!");

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
                var Treino = await _LineService.GetLinesByIdAsync(id,true);
                if(Treino == null) return NotFound("Nenhuma Line Encontrada!");

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
                var Treino = await _LineService.GetAllLinesByDescAsync(desc, true);
                if(Treino == null) return NotFound("Nenhuma Treino Encontrada!");
                return  Ok(Treino);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Treino. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(LineDto model)
        {
            try
            {
                var Treino = await _LineService.AddLines(model);
                if(Treino == null) return BadRequest("Erro ao Tentar adicionar Treino");
                return  Ok(Treino);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Adicionar Treino. Erro: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, LineDto model)
        {
            try
            {
                var Treino = await _LineService.UpdateLines(id, model);
                if(Treino == null) return BadRequest("Erro ao Tentar Atualizar Line");
                return  Ok(Treino);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Atualizar Line. Erro: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                return await _LineService.DeleteLine(Id) ?
                        Ok(new {message = "Deletado"} ):
                        throw new Exception("Ocorreu um erro nao especifico!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Deletar Treino. Erro: {ex.Message}");
            }
        }
    }
}
