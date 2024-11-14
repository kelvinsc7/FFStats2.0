using System.Threading.Tasks;
using FFStats.Domain.Models;

namespace FFStats.Persistence.Contratos
{
    public interface IConfiguracaoPersistence
    {
         //Call
        Task<Configuracao[]> GetAllConfiguracoes();

        Task<Configuracao> GetAllConfiguracoesbyId(int id);
    }
}