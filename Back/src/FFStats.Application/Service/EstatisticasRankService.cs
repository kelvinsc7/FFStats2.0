using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FFStats.Application.Contratos;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;
using FFStats.Persistence.Contratos;

namespace FFStats.Application.Service
{
    public class EstatisticasRankService : IEstatisticasRankService
    {
        private readonly IGeralPersistence _geralPersistence;
        private readonly IEstatisticasRankPersistence _EstatisticasRankPersistence;
        public IMapper _mapper { get; }
        public EstatisticasRankService(IGeralPersistence geralPersistence, IEstatisticasRankPersistence EstatisticasRankPersistence, IMapper mapper)
        {
            this._mapper = mapper;
            this._EstatisticasRankPersistence = EstatisticasRankPersistence;
            this._geralPersistence = geralPersistence;

        }

        public  Task<estatisticasRankDto[]> SaveEstatisticaRank(int EstatisticasId, estatisticasRankDto[] models)
        {
             throw new NotImplementedException();
        }

        public Task<bool> DeleteEstatisticaRank(int Id)
        {
            throw new NotImplementedException();
        }

        public Task<estatisticasRankDto> GetEstatisticasRankByIdsAsync(int Id)
        {
            throw new NotImplementedException();
        }

        public Task<estatisticasRankDto[]> GetEstatisticasRankByTemporadaIdAsync(int temporadaId)
        {
            throw new NotImplementedException();
        }

        public Task<estatisticasRankDto[]> GetEstatisticasRankByJogadorIdAsync(int jogadorId)
        {
            throw new NotImplementedException();
        }

        public Task<estatisticasRankDto[]> GetEstatisticasRankByTempIdJogadorIdAsync(int jogadorId)
        {
            throw new NotImplementedException();
        }
    }
}