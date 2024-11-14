using AutoMapper;
using FFStats.Application.Dtos;
using FFStats.Domain.Models;

namespace FFStats.Application.Helpers
{
    public class FFStatsProfile : Profile
    {
        public FFStatsProfile()
        {
            CreateMap<Call, callDto>().ReverseMap();
            CreateMap<Estatisticas, estatisticasDto>().ReverseMap();
            CreateMap<Jogador, jogadoresDto>().ReverseMap();
            CreateMap<Mapa, mapaDto>().ReverseMap();
            CreateMap<Modo, modoDto>().ReverseMap();
            CreateMap<Partida, partidaDto>().ReverseMap();
            CreateMap<Submodo, subModoDto>().ReverseMap();
            CreateMap<Treino, treinoDto>().ReverseMap();  
            CreateMap<PartidaJogador, partidajogadoresDto>().ReverseMap();
            CreateMap<Line, LineDto>().ReverseMap();
            CreateMap<Temporada, temporadaDto>().ReverseMap();
            CreateMap<EstatisticasRank, estatisticasRankDto>().ReverseMap();
            CreateMap<Configuracao, ConfiguracaoDTO>().ReverseMap();
        }
    }
}