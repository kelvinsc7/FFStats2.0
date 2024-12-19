using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Persistence.Contratos
{
    public interface IEstatisticasPersistence
    {
         /// <summary>
         /// Buscar estatisticas por partidas
         /// </summary>
         /// <param name="partidaId">Código chave da tabela partida</param>
         /// <returns>Uma lista de estatisticas</returns>
         Task<Estatisticas[]> GetEstatisticasByPartidaIdAsync(int partidaId);
         /// <summary>
         /// Metodo que retornara apenas uma estatistica
         /// </summary>
         /// <param name="partidaId">Código chave da tabela partida</param>
         /// <param name="estatisticaId">Código chave da tabela Estatistica</param>
         /// <returns>Apenas uma estatistica</returns>
         
         Task<Estatisticas[]> GetEstatisticasByJogadorIdAsync(int partidaId);
         Task<Estatisticas[]> GetAllEstatisticas();
         Task<Estatisticas> GetEstatisticasByIdsAsync(int partidaId, int estatisticaId );
    }
}