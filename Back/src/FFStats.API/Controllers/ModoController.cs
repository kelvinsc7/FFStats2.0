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
    public class ModoController : ControllerBase
    {
        private readonly IModoService _ModoService;

        public ModoController(IModoService ModoService)
        {
            this._ModoService = ModoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var Modos = await _ModoService.GetAllModosAsync(true);
                if(Modos == null) return NotFound("Nenhuma Modo Encontrada!");

                return  Ok(Modos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Modo. Erro: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            try
            {
                var Modo = await _ModoService.GetModosByIdAsync(id,true);
                if(Modo == null) return NotFound("Nenhuma Modo Encontrada!");

                return  Ok(Modo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Modo. Erro: {ex.Message}");
            }
        }
        [HttpGet("{desc}/descricao")]
        public async Task<IActionResult> GetByDesc(string desc)
        {
            try
            {
                var Modo = await _ModoService.GetAllModosByDescAsync(desc, true);
                if(Modo == null) return NotFound("Nenhuma Modo Encontrada!");
                return  Ok(Modo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Modo. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(modoDto model)
        {
            try
            {
                var Modo = await _ModoService.AddModos(model);
                if(Modo == null) return BadRequest("Erro ao Tentar adicionar Modo");
                return  Ok(Modo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Adicionar Modo. Erro: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, modoDto model)
        {
            try
            {
                var Modo = await _ModoService.UpdateModos(id, model);
                if(Modo == null) return BadRequest("Erro ao Tentar Atualizar Modo");
                return  Ok(Modo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Atualizar Modo. Erro: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                return await _ModoService.DeleteModo(Id) ?
                        Ok(new {message = "Deletado"} ):
                        throw new Exception("Ocorreu um erro nao especifico!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Deletar Modo. Erro: {ex.Message}");
            }
        }
    }
}
