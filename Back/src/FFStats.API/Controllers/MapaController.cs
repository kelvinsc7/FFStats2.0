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
    public class MapaController : ControllerBase
    {
        private readonly IMapaService _MapaService;

        public MapaController(IMapaService MapaService)
        {
            this._MapaService = MapaService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var Mapas = await _MapaService.GetAllMapasAsync(true);
                if(Mapas == null) return NotFound("Nenhuma Mapa Encontrada!");

                return  Ok(Mapas);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Mapa. Erro: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            try
            {
                var Mapa = await _MapaService.GetMapasByIdAsync(id,true);
                if(Mapa == null) return NotFound("Nenhuma Mapa Encontrada!");

                return  Ok(Mapa);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Mapa. Erro: {ex.Message}");
            }
        }
        [HttpGet("{desc}/descricao")]
        public async Task<IActionResult> GetByDesc(string desc)
        {
            try
            {
                var Mapa = await _MapaService.GetAllMapasByDescAsync(desc, true);
                if(Mapa == null) return NotFound("Nenhuma Mapa Encontrada!");
                return  Ok(Mapa);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Recuperar Mapa. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(mapaDto model)
        {
            try
            {
                var Mapa = await _MapaService.AddMapas(model);
                if(Mapa == null) return BadRequest("Erro ao Tentar adicionar Mapa");
                return  Ok(Mapa);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Adicionar Mapa. Erro: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, mapaDto model)
        {
            try
            {
                var Mapa = await _MapaService.UpdateMapas(id, model);
                if(Mapa == null) return BadRequest("Erro ao Tentar Atualizar Mapa");
                return  Ok(Mapa);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Atualizar Mapa. Erro: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                return await _MapaService.DeleteMapa(Id) ?
                        Ok(new {message = "Deletado"} ):
                        throw new Exception("Ocorreu um erro nao especifico!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro Ao tentar Deletar Mapa. Erro: {ex.Message}");
            }
        }
    }
}
