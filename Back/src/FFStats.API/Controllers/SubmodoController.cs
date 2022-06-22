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
    public class SubmodoController : ControllerBase
    {
        private readonly ISubmodoService _SubmodoService;

        public SubmodoController(ISubmodoService SubmodoService)
        {
            this._SubmodoService = SubmodoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var Submodos = await _SubmodoService.GetAllSubmodosAsync(true);
                if(Submodos == null) return NotFound("Nenhuma Submodo Encontrada!");

                return  Ok(Submodos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Submodo. Erro: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            try
            {
                var Submodo = await _SubmodoService.GetSubmodosByIdAsync(id,true);
                if(Submodo == null) return NotFound("Nenhuma Submodo Encontrada!");

                return  Ok(Submodo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Submodo. Erro: {ex.Message}");
            }
        }
        [HttpGet("{desc}/descricao")]
        public async Task<IActionResult> GetByDesc(string desc)
        {
            try
            {
                var Submodo = await _SubmodoService.GetAllSubmodosByDescAsync(desc, true);
                if(Submodo == null) return NotFound("Nenhuma Submodo Encontrada!");
                return  Ok(Submodo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Submodo. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(subModoDto model)
        {
            try
            {
                var Submodo = await _SubmodoService.AddSubmodos(model);
                if(Submodo == null) return BadRequest("Erro ao Tentar adicionar Submodo");
                return  Ok(Submodo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Adicionar Submodo. Erro: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, subModoDto model)
        {
            try
            {
                var Submodo = await _SubmodoService.UpdateSubmodos(id, model);
                if(Submodo == null) return BadRequest("Erro ao Tentar Atualizar Submodo");
                return  Ok(Submodo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Atualizar Submodo. Erro: {ex.Message}");
            }
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                return await _SubmodoService.DeleteSubmodo(Id) ?
                        Ok("Deletado"):
                        BadRequest("Submodo Não Deletada");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Deletar Submodo. Erro: {ex.Message}");
            }
        }
    }
}
