using System.Threading.Tasks;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;

namespace FFStats.Application.Contratos
{
    public interface ITemporadaService
    {
         Task<temporadaDto> AddTemporada(temporadaDto model);
         Task<temporadaDto> UpdateTemporada(int TemporadaId, temporadaDto model);
         Task<bool> DeleteTemporada(int TemporadaId);
         Task<temporadaDto[]> GetAllTemporadasAsync();
         Task<temporadaDto> GetTemporadasByIdAsync(int TemporadaId);
         Task<temporadaDto[]> GetAllTemporadasByDescAsync(string Desc);
    }
}