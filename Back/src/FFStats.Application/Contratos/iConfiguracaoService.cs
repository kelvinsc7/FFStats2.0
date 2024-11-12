using System.Threading.Tasks;
using FFStats.Application.Dtos;


namespace FFStats.Application.Contratos
{
    public interface IConfiguracaoService
{
    Task<ConfiguracaoDTO[]> GetAllConfiguracoes();
    Task <ConfiguracaoDTO>UpdateConfiguracao(int id, ConfiguracaoDTO model);
}
}