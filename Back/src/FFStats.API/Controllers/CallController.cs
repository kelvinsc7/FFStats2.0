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
    public class CallController : ControllerBase
    {
        private readonly ICallService _CallService;

        public CallController(ICallService CallService)
        {
            this._CallService = CallService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var Calls = await _CallService.GetAllCallsAsync(true);
                if(Calls == null) return NotFound("Nenhuma Call Encontrada!");

                return  Ok(Calls);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Call. Erro: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            try
            {
                var Call = await _CallService.GetCallsByIdAsync(id,true);
                if(Call == null) return NotFound("Nenhuma Call Encontrada!");

                return  Ok(Call);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Call. Erro: {ex.Message}");
            }
        }
        [HttpGet("{desc}/descricao")]
        public async Task<IActionResult> GetByDesc(string desc)
        {
            try
            {
                var Call = await _CallService.GetAllCallsByDescAsync(desc, true);
                if(Call == null) return NotFound("Nenhuma Call Encontrada!");
                return  Ok(Call);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Call. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(callDto model)
        {
            try
            {
                var Call = await _CallService.AddCalls(model);
                if(Call == null) return BadRequest("Erro ao Tentar adicionar Call");
                return  Ok(Call);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Adicionar Call. Erro: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, callDto model)
        {
            try
            {
                var Call = await _CallService.UpdateCalls(id, model);
                if(Call == null) return BadRequest("Erro ao Tentar Atualizar Call");
                return  Ok(Call);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Atualizar Call. Erro: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                return await _CallService.DeleteCall(Id) ?
                        Ok(new {message = "Deletado"} ):
                        throw new Exception("Ocorreu um erro nao especifico!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Deletar Call. Erro: {ex.Message}");
            }
        }
    }
}
