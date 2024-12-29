import { Component, Input, OnInit } from '@angular/core';
import { Estatistica } from '@app/Model/Estatistica';
import { Jogador } from '@app/Model/Jogador';
import { EstatisticaService } from '@app/Services/estatistica.service';
import { JogadorService } from '@app/Services/jogador.service';
import { Chart } from 'chart.js';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-dash-jogadores',
  templateUrl: './dash-jogadores.component.html',
  styleUrls: ['./dash-jogadores.component.scss']
})
export class DashJogadoresComponent implements OnInit {

  @Input() estatisticasCarregadas: boolean = false;

  estatisticas :Estatistica[];
  jogadores : Jogador[];
  topKill:string;
  topAssistencia:string;
  topDano:string;
  topKd:string;

  tolltipTopKill:string;
  tolltipTopAssistencia:string;
  tolltipTopDano:string;
  tolltipTopKd:string;

  graficoKills: Chart | null = null;
  graficoMortes: Chart | null = null;
  graficoAssistencia: Chart | null = null;
  graficoDano: Chart | null = null;
  graficoDerrubados: Chart | null = null;
  graficoCura: Chart | null = null;
  graficoLevantados: Chart | null = null;
  graficoRecussitou: Chart | null = null;
  
  constructor(
    private estatisticaService: EstatisticaService,
    private jogadorService: JogadorService
  ) { }

  ngOnInit() {
    this.carregarDados();
  }
  carregarDados() {
      // Usa forkJoin para garantir que ambas as chamadas sejam concluídas antes de prosseguir
      forkJoin({
        estatisticas: this.estatisticaService.loadEstatisticas(),
        jogador: this.jogadorService.getJogadores()
      }).subscribe({
        next: ({ jogador, estatisticas }) => {
          this.estatisticas = estatisticas;
          this.jogadores = jogador
          this.carregarTops();
          this.gerarGraficoKills();
          this.gerarGraficoMortes();
          this.gerarGraficoAssistencia();
          this.gerarGraficoDano();
          this.gerarGraficoDerrubados();
          this.gerarGraficoCura();
          this.gerarGraficoLevantados();
          this.gerarGraficoRecussitados();
        },
        error: (error: any) => {
          console.error('Erro ao carregar dados:', error);
        }
      });
    }
    carregarTops(){
      let totalKill = 0
      let maximoKill = 0
      let totalAssistencia = 0
      let maximoAssistencia = 0
      let totalDano = 0
      let maximoDano = 0
      let totalMortes = 0
      let maximoKd = 0

      this.jogadores.forEach(j =>{
        const estatisticaFiltrada = this.estatisticas.filter(e=>e.jogadorId === j.id)

        totalKill = this.carregaKIll(estatisticaFiltrada)
        if(totalKill > maximoKill)
        {
          maximoKill = totalKill;
          this.topKill = j.jogadorNick;
          this.tolltipTopKill = totalKill+' Kills'
        }

        totalAssistencia = this.carregaAssistencia(estatisticaFiltrada)
        if(totalAssistencia>maximoAssistencia)
        {
          maximoAssistencia = totalAssistencia;
          this.topAssistencia = j.jogadorNick;
          this.tolltipTopAssistencia = totalAssistencia+' Assistências'
        }

        totalDano = this.carregaDano(estatisticaFiltrada)
        if(totalDano>maximoDano)
        {
          maximoDano = totalDano;
          this.topDano = j.jogadorNick;
          this.tolltipTopDano = totalDano+' de dano'
        }

        totalMortes = this.carregaMortes(estatisticaFiltrada)
        if((totalKill/totalMortes)>maximoKd)
        {
          maximoKd = (totalKill/totalMortes);
          this.topKd = j.jogadorNick;
          this.tolltipTopKd = maximoKd.toFixed(2)+' de K/D'
        }
      })
    }
    
    public carregaKIll(est : Estatistica[]) :number {
      let totalKills = 0; 
      if(!est || est.length ===0)
        return totalKills
      est.forEach(item => { totalKills += item.kill; }); 
      return totalKills; 
      
    }
    public carregaAssistencia(est : Estatistica[]) :number {
      let totalAssistencia = 0; 
      if(!est || est.length ===0)
        return totalAssistencia
      est.forEach(item => { totalAssistencia += item.assistencia; }); 
      return totalAssistencia; 
      
    }
    public carregaDano(est : Estatistica[]) :number {
      let totalDano = 0; 
      if(!est || est.length ===0)
        return totalDano
      est.forEach(item => { totalDano += item.dano; }); 
      return totalDano; 
      
    }
    public carregaMortes(est : Estatistica[]) :number {
      let totalMortes = 0; 
      if(!est || est.length ===0)
        return totalMortes
      est.forEach(item => { totalMortes += item.morte; }); 
      return totalMortes; 
      
    }

    gerarGraficoKills() {
      // Passo 1: Agrupar kills por jogadorId
      const killsPorJogador: { [jogadorId: number]: number } = {};
  
      this.estatisticas.forEach((estatistica) => {
        const { jogadorId, kill } = estatistica;
        killsPorJogador[jogadorId] = (killsPorJogador[jogadorId] || 0) + kill;
      });
  
      // Passo 2: Mapear jogadorId para nomes e organizar os dados
      const nomes: string[] = [];
      const kills: number[] = [];
  
      Object.entries(killsPorJogador).forEach(([jogadorId, totalKills]) => {
        const jogador = this.jogadores.find((j) => j.id === +jogadorId);
        if (jogador) {
          nomes.push(jogador.jogadorNick);
          kills.push(totalKills as number);
        }
      });
  
      // Passo 3: Renderizar o gráfico usando Chart.js
      const ctx = document.getElementById('graficoKillsJogadores') as HTMLCanvasElement;
  
      if (this.graficoKills) {
        this.graficoKills.destroy(); // Destroi o gráfico existente antes de criar outro
      }
  
      this.graficoKills = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: nomes,
          datasets: [
            {
              data: kills,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              borderWidth: 1,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'center',
              labels: {
                font: {
                  size: 10,
                  family: "'Arial', sans-serif",
                  style: 'italic',
                  weight: 'bold',
                },
                color: '#444',
                boxWidth: 30,
                boxHeight: 10,
                padding: 10,
                usePointStyle: true,
                pointStyle: 'circle',
              },
            },
            datalabels:{
              display:false
            },
          },
        animation: {
          animateRotate: true, // Anima a rotação
          animateScale: true   // Anima o tamanho
        },
        hover: {
          mode: 'nearest',
        }
        },
      });
    }
    gerarGraficoMortes() {
      // Passo 1: Agrupar Mortes por jogadorId
      const MortesPorJogador: { [jogadorId: number]: number } = {};
  
      this.estatisticas.forEach((estatistica) => {
        const { jogadorId, morte } = estatistica;
        MortesPorJogador[jogadorId] = (MortesPorJogador[jogadorId] || 0) + morte;
      });
  
      // Passo 2: Mapear jogadorId para nomes e organizar os dados
      const nomes: string[] = [];
      const Mortes: number[] = [];
  
      Object.entries(MortesPorJogador).forEach(([jogadorId, totalMortes]) => {
        const jogador = this.jogadores.find((j) => j.id === +jogadorId);
        if (jogador) {
          nomes.push(jogador.jogadorNick);
          Mortes.push(totalMortes as number);
        }
      });
  
      // Passo 3: Renderizar o gráfico usando Chart.js
      const ctx = document.getElementById('graficoMortesJogadores') as HTMLCanvasElement;
  
      if (this.graficoMortes) {
        this.graficoMortes.destroy(); // Destroi o gráfico existente antes de criar outro
      }
  
      this.graficoMortes = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: nomes,
          datasets: [
            {
              data: Mortes,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              borderWidth: 1,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'center',
              labels: {
                font: {
                  size: 10,
                  family: "'Arial', sans-serif",
                  style: 'italic',
                  weight: 'bold',
                },
                color: '#444',
                boxWidth: 30,
                boxHeight: 10,
                padding: 10,
                usePointStyle: true,
                pointStyle: 'circle',
              },
            },
            datalabels:{
              display:false
            },
          },
        animation: {
          animateRotate: true, // Anima a rotação
          animateScale: true   // Anima o tamanho
        },
        hover: {
          mode: 'nearest',
        }
        },
      });
    }
    gerarGraficoAssistencia() {
      // Passo 1: Agrupar Assistencia por jogadorId
      const AssistenciaPorJogador: { [jogadorId: number]: number } = {};
  
      this.estatisticas.forEach((estatistica) => {
        const { jogadorId, assistencia } = estatistica;
        AssistenciaPorJogador[jogadorId] = (AssistenciaPorJogador[jogadorId] || 0) + assistencia;
      });
  
      // Passo 2: Mapear jogadorId para nomes e organizar os dados
      const nomes: string[] = [];
      const Assistencia: number[] = [];
  
      Object.entries(AssistenciaPorJogador).forEach(([jogadorId, totalAssistencia]) => {
        const jogador = this.jogadores.find((j) => j.id === +jogadorId);
        if (jogador) {
          nomes.push(jogador.jogadorNick);
          Assistencia.push(totalAssistencia as number);
        }
      });
  
      // Passo 3: Renderizar o gráfico usando Chart.js
      const ctx = document.getElementById('graficoAssistenciaJogadores') as HTMLCanvasElement;
  
      if (this.graficoAssistencia) {
        this.graficoAssistencia.destroy(); // Destroi o gráfico existente antes de criar outro
      }
  
      this.graficoAssistencia = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: nomes,
          datasets: [
            {
              data: Assistencia,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              borderWidth: 1,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'center',
              labels: {
                font: {
                  size: 10,
                  family: "'Arial', sans-serif",
                  style: 'italic',
                  weight: 'bold',
                },
                color: '#444',
                boxWidth: 30,
                boxHeight: 10,
                padding: 10,
                usePointStyle: true,
                pointStyle: 'circle',
              },
            },
            datalabels:{
              display:false
            },
          },
        animation: {
          animateRotate: true, // Anima a rotação
          animateScale: true   // Anima o tamanho
        },
        hover: {
          mode: 'nearest',
        }
        },
      });
    }
    gerarGraficoDano() {
      // Passo 1: Agrupar Dano por jogadorId
      const DanoPorJogador: { [jogadorId: number]: number } = {};
  
      this.estatisticas.forEach((estatistica) => {
        const { jogadorId, dano } = estatistica;
        DanoPorJogador[jogadorId] = (DanoPorJogador[jogadorId] || 0) + dano;
      });
  
      // Passo 2: Mapear jogadorId para nomes e organizar os dados
      const nomes: string[] = [];
      const Dano: number[] = [];
  
      Object.entries(DanoPorJogador).forEach(([jogadorId, totalDano]) => {
        const jogador = this.jogadores.find((j) => j.id === +jogadorId);
        if (jogador) {
          nomes.push(jogador.jogadorNick);
          Dano.push(totalDano as number);
        }
      });
  
      // Passo 3: Renderizar o gráfico usando Chart.js
      const ctx = document.getElementById('graficoDanoJogadores') as HTMLCanvasElement;
  
      if (this.graficoDano) {
        this.graficoDano.destroy(); // Destroi o gráfico existente antes de criar outro
      }
  
      this.graficoDano = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: nomes,
          datasets: [
            {
              data: Dano,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              borderWidth: 1,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'center',
              labels: {
                font: {
                  size: 10,
                  family: "'Arial', sans-serif",
                  style: 'italic',
                  weight: 'bold',
                },
                color: '#444',
                boxWidth: 30,
                boxHeight: 10,
                padding: 10,
                usePointStyle: true,
                pointStyle: 'circle',
              },
            },
            datalabels:{
              display:false
            },
          },
        animation: {
          animateRotate: true, // Anima a rotação
          animateScale: true   // Anima o tamanho
        },
        hover: {
          mode: 'nearest',
        }
        },
      });
    }
    gerarGraficoDerrubados() {
      // Passo 1: Agrupar Derrubados por jogadorId
      const DerrubadosPorJogador: { [jogadorId: number]: number } = {};
  
      this.estatisticas.forEach((estatistica) => {
        const { jogadorId, derrubado } = estatistica;
        DerrubadosPorJogador[jogadorId] = (DerrubadosPorJogador[jogadorId] || 0) + derrubado;
      });
  
      // Passo 2: Mapear jogadorId para nomes e organizar os dados
      const nomes: string[] = [];
      const Derrubados: number[] = [];
  
      Object.entries(DerrubadosPorJogador).forEach(([jogadorId, totalDerrubados]) => {
        const jogador = this.jogadores.find((j) => j.id === +jogadorId);
        if (jogador) {
          nomes.push(jogador.jogadorNick);
          Derrubados.push(totalDerrubados as number);
        }
      });
  
      // Passo 3: Renderizar o gráfico usando Chart.js
      const ctx = document.getElementById('graficoDerrubadosJogadores') as HTMLCanvasElement;
  
      if (this.graficoDerrubados) {
        this.graficoDerrubados.destroy(); // Destroi o gráfico existente antes de criar outro
      }
  
      this.graficoDerrubados = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: nomes,
          datasets: [
            {
              data: Derrubados,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              borderWidth: 1,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'center',
              labels: {
                font: {
                  size: 10,
                  family: "'Arial', sans-serif",
                  style: 'italic',
                  weight: 'bold',
                },
                color: '#444',
                boxWidth: 30,
                boxHeight: 10,
                padding: 10,
                usePointStyle: true,
                pointStyle: 'circle',
              },
            },
            datalabels:{
              display:false
            },
          },
        animation: {
          animateRotate: true, // Anima a rotação
          animateScale: true   // Anima o tamanho
        },
        hover: {
          mode: 'nearest',
        }
        },
      });
    }
    gerarGraficoCura() {
      // Passo 1: Agrupar Cura por jogadorId
      const CuraPorJogador: { [jogadorId: number]: number } = {};
  
      this.estatisticas.forEach((estatistica) => {
        const { jogadorId, cura } = estatistica;
        CuraPorJogador[jogadorId] = (CuraPorJogador[jogadorId] || 0) + cura;
      });
  
      // Passo 2: Mapear jogadorId para nomes e organizar os dados
      const nomes: string[] = [];
      const Cura: number[] = [];
  
      Object.entries(CuraPorJogador).forEach(([jogadorId, totalCura]) => {
        const jogador = this.jogadores.find((j) => j.id === +jogadorId);
        if (jogador) {
          nomes.push(jogador.jogadorNick);
          Cura.push(totalCura as number);
        }
      });
  
      // Passo 3: Renderizar o gráfico usando Chart.js
      const ctx = document.getElementById('graficoCuraJogadores') as HTMLCanvasElement;
  
      if (this.graficoCura) {
        this.graficoCura.destroy(); // Destroi o gráfico existente antes de criar outro
      }
  
      this.graficoCura = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: nomes,
          datasets: [
            {
              data: Cura,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              borderWidth: 1,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'center',
              labels: {
                font: {
                  size: 10,
                  family: "'Arial', sans-serif",
                  style: 'italic',
                  weight: 'bold',
                },
                color: '#444',
                boxWidth: 30,
                boxHeight: 10,
                padding: 10,
                usePointStyle: true,
                pointStyle: 'circle',
              },
            },
            datalabels:{
              display:false
            },
          },
        animation: {
          animateRotate: true, // Anima a rotação
          animateScale: true   // Anima o tamanho
        },
        hover: {
          mode: 'nearest',
        }
        },
      });
    }
    gerarGraficoLevantados() {
      // Passo 1: Agrupar Levantados por jogadorId
      const LevantadosPorJogador: { [jogadorId: number]: number } = {};
  
      this.estatisticas.forEach((estatistica) => {
        const { jogadorId, levantados } = estatistica;
        LevantadosPorJogador[jogadorId] = (LevantadosPorJogador[jogadorId] || 0) + levantados;
      });
  
      // Passo 2: Mapear jogadorId para nomes e organizar os dados
      const nomes: string[] = [];
      const Levantados: number[] = [];
  
      Object.entries(LevantadosPorJogador).forEach(([jogadorId, totalLevantados]) => {
        const jogador = this.jogadores.find((j) => j.id === +jogadorId);
        if (jogador) {
          nomes.push(jogador.jogadorNick);
          Levantados.push(totalLevantados as number);
        }
      });
  
      // Passo 3: Renderizar o gráfico usando Chart.js
      const ctx = document.getElementById('graficoLevantadosJogadores') as HTMLCanvasElement;
  
      if (this.graficoLevantados) {
        this.graficoLevantados.destroy(); // Destroi o gráfico existente antes de criar outro
      }
  
      this.graficoLevantados = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: nomes,
          datasets: [
            {
              data: Levantados,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              borderWidth: 1,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'center',
              labels: {
                font: {
                  size: 10,
                  family: "'Arial', sans-serif",
                  style: 'italic',
                  weight: 'bold',
                },
                color: '#444',
                boxWidth: 30,
                boxHeight: 10,
                padding: 10,
                usePointStyle: true,
                pointStyle: 'circle',
              },
            },
            datalabels:{
              display:false
            },
          },
        animation: {
          animateRotate: true, // Anima a rotação
          animateScale: true   // Anima o tamanho
        },
        hover: {
          mode: 'nearest',
        }
        },
      });
    }
    gerarGraficoRecussitados() {
      // Passo 1: Agrupar Levantados por jogadorId
      const RecussitouPorJogador: { [jogadorId: number]: number } = {};
  
      this.estatisticas.forEach((estatistica) => {
        const { jogadorId, ressucitou } = estatistica;
        RecussitouPorJogador[jogadorId] = (RecussitouPorJogador[jogadorId] || 0) + ressucitou;
      });
  
      // Passo 2: Mapear jogadorId para nomes e organizar os dados
      const nomes: string[] = [];
      const Recussitou: number[] = [];
  
      Object.entries(RecussitouPorJogador).forEach(([jogadorId, totalRecussitou]) => {
        const jogador = this.jogadores.find((j) => j.id === +jogadorId);
        if (jogador) {
          nomes.push(jogador.jogadorNick);
          Recussitou.push(totalRecussitou as number);
        }
      });
  
      // Passo 3: Renderizar o gráfico usando Chart.js
      const ctx = document.getElementById('graficoRecussitouJogadores') as HTMLCanvasElement;
  
      if (this.graficoRecussitou) {
        this.graficoRecussitou.destroy(); // Destroi o gráfico existente antes de criar outro
      }
  
      this.graficoRecussitou = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: nomes,
          datasets: [
            {
              data: Recussitou,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
              borderWidth: 1,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'center',
              labels: {
                font: {
                  size: 10,
                  family: "'Arial', sans-serif",
                  style: 'italic',
                  weight: 'bold',
                },
                color: '#444',
                boxWidth: 30,
                boxHeight: 10,
                padding: 10,
                usePointStyle: true,
                pointStyle: 'circle',
              },
            },
            datalabels:{
              display:false
            },
          },
        animation: {
          animateRotate: true, // Anima a rotação
          animateScale: true   // Anima o tamanho
        },
        hover: {
          mode: 'nearest',
        }
        },
      });
    }
  }
