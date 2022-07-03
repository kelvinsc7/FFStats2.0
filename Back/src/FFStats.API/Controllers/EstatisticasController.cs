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

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var Estatisticass = await _EstatisticasService.GetAllEstatisticassAsync(true);
                if(Estatisticass == null) return NotFound("Nenhuma Estatisticas Encontrada!");

                return  Ok(Estatisticass);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Estatisticas. Erro: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            try
            {
                var Estatisticas = await _EstatisticasService.GetEstatisticassByIdAsync(id,true);
                if(Estatisticas == null) return NotFound("Nenhuma Estatisticas Encontrada!");

                return  Ok(Estatisticas);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Estatisticas. Erro: {ex.Message}");
            }
        }
        [HttpGet("{desc}/descricao")]
        public async Task<IActionResult> GetByDesc(string desc)
        {
            try
            {
                var Estatisticas = await _EstatisticasService.GetAllEstatisticassByDescAsync(desc, true);
                if(Estatisticas == null) return NotFound("Nenhuma Estatisticas Encontrada!");
                return  Ok(Estatisticas);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Estatisticas. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(estatisticasDto model)
        {
            try
            {
                var Estatisticas = await _EstatisticasService.AddEstatisticass(model);
                if(Estatisticas == null) return BadRequest("Erro ao Tentar adicionar Estatisticas");
                return  Ok(Estatisticas);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Adicionar Estatisticas. Erro: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, estatisticasDto model)
        {
            try
            {
                var Estatisticas = await _EstatisticasService.UpdateEstatisticass(id, model);
                if(Estatisticas == null) return BadRequest("Erro ao Tentar Atualizar Estatisticas");
                return  Ok(Estatisticas);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Atualizar Estatisticas. Erro: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                return await _EstatisticasService.DeleteEstatisticas(Id) ?
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
