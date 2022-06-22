using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using FFStats.Persistence.Contextos;
using FFStats.Application.Contratos;
using FFStats.Application.Service;
using FFStats.Persistence.Contratos;
using FFStats.Persistence.Persistences;
using AutoMapper;
using System;

namespace FFStats.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<FFStatsContext>(
                context => context.UseSqlite(Configuration.GetConnectionString("Default"))
            );
            services.AddControllers().AddNewtonsoftJson( x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddScoped<ICallService, CallService>();
            services.AddScoped<IEstatisticasService, EstatisticasService>();
            services.AddScoped<IJogadoresService, JogadoresService>();
            services.AddScoped<IMapaService, MapaService>();
            services.AddScoped<IModoService, ModoService>();
            services.AddScoped<IPartidaService, PartidaService>();
            services.AddScoped<IPartidaJogadorService, PartidaJogadorService>();    
            services.AddScoped<ISubmodoService, SubmodoService>();
            services.AddScoped<ITreinoService, TreinoService>();

            services.AddScoped<ICallPersistence, CallPersistence>();
            services.AddScoped<IEstatisticasPersistence, EstatisticasPersistence>();
            services.AddScoped<IGeralPersistence, GeralPersistence>();
            services.AddScoped<IJogadorPersistence, JogadorPersistence>();
            services.AddScoped<IMapaPersistence, MapaPersistence>();
            services.AddScoped<IModoPersistence, ModoPersistence>();
            services.AddScoped<IPartidaJogadorPersistence, PartidaJogadorPersistence>();
            services.AddScoped<IPartidaPersistence, PartidaPersistence>();
            services.AddScoped<ISubmodoPersistence, SubmodoPersistence>();
            services.AddScoped<ITreinoPersistence, TreinoPersistence>();

            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "FFStats.API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "FFStats.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(x => x.AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowAnyOrigin());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
