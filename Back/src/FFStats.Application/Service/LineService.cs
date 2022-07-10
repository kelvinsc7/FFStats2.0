using System;
using System.Threading.Tasks;
using AutoMapper;
using FFStats.Application.Contratos;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class LineService : ILineService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly ILinePersistence _LinePersistence;
        private readonly IMapper _mapper;
        public LineService(IGeralPersistence geralPersistence, ILinePersistence LinePersistence, IMapper mapper)
        {
            this._mapper = mapper;
            this._LinePersistence = LinePersistence;
            this._geralPersistence = geralPersistence;

        }
        public async Task<LineDto> AddLines(LineDto model)
        {
            try
            {
                var line = _mapper.Map<Line>(model);
                _geralPersistence.Add<Line>(line);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var lineRetorno = await _LinePersistence.GetAllLineByIdAsync(line.id, false);
                    return _mapper.Map<LineDto>(lineRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<LineDto> UpdateLines(int LineId, LineDto model)
        {
            try
            {
                var line = await _LinePersistence.GetAllLineByIdAsync(LineId, false);
                if (line == null) return null;

                model.Id = line.id;
                
                _mapper.Map(model, line);
                _geralPersistence.Update(line);
                if (await _geralPersistence.SaveChangeAsync())
                {
                    var lineRetorno = await _LinePersistence.GetAllLineByIdAsync(line.id, false);
                    return _mapper.Map<LineDto>(lineRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> DeleteLine(int LineId)
        {
            try
            {
                var line = await _LinePersistence.GetAllLineByIdAsync(LineId, false);
                if (line == null) throw new Exception("Erro: Line nao encontrado para ser deletado!");

                _geralPersistence.Delete(line);
                return await _geralPersistence.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<LineDto[]> GetAllLinesAsync(bool IncludeJogador = false)
        {
            try
            {
                var line = await _LinePersistence.GetAllLineAsync(IncludeJogador);
                if (line == null) return null;

                var resultado = _mapper.Map<LineDto[]>(line);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LineDto> GetLinesByIdAsync(int LineId, bool IncludeJogador = false)
        {
            try
            {
                var line = await _LinePersistence.GetAllLineByIdAsync(LineId, IncludeJogador);
                if (line == null) return null;

                var resultado = _mapper.Map<LineDto>(line);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LineDto[]> GetAllLinesByDescAsync(string Desc, bool IncludeJogador = false)
        {
            try
            {
                var line = await _LinePersistence.GetAllLineByNomeAsync(Desc, IncludeJogador);
                if (line == null) return null;

                var resultado = _mapper.Map<LineDto[]>(line);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        
    }
}