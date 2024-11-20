# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /app

# Copiar o arquivo de solução e projetos
COPY FFStats.sln ./
COPY FFStats.Application/*.csproj ./FFStats.Application/
COPY FFStats.Domain/*.csproj ./FFStats.Domain/
COPY FFStats.Persistence/*.csproj ./FFStats.Persistence/
COPY FFStats.API/*.csproj ./FFStats.API/
COPY FFStats.API/appsettings.json ./FFStats.API/
RUN mkdir -p MyDatabase
COPY FFStats.API/FFStats.db MyDatabase/FFStats.db

# Restaurar dependências
RUN dotnet restore

# Copiar todo o conteúdo do projeto
COPY . ./

# Publicar o projeto
WORKDIR /app/FFStats.API
RUN dotnet publish -c Release -o /out

# Etapa 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime
WORKDIR /app

# Copiar arquivos publicados
COPY --from=build /out ./

# Copiar o banco de dados para o runtime
COPY --from=build /app/MyDatabase MyDatabase

ENTRYPOINT ["dotnet", "FFStats.API.dll"]
