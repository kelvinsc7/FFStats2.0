import { Component, Input, OnInit } from '@angular/core';
import { Estatistica } from '@app/Model/Estatistica';
import { Jogador } from '@app/Model/Jogador';
import { EstatisticaService } from '@app/Services/estatistica.service';
import { JogadorService } from '@app/Services/jogador.service';
import { funcoes } from '@app/Util/funcoes';
import { Chart } from 'chart.js';
import { forkJoin } from 'rxjs';

export interface jogadorPrecisao {
  jogadorId: number;
  nick: string;
  danoCausado: number;
  kills: number;
  precisao:number
  mediaTempo:string
  mediaTempoNumerico:number
}

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
  precisao:jogadorPrecisao[];

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
  graficoPrecisao: Chart | null = null;
  graficoMediaTempo: Chart | null = null;
  
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
          this.calcularPrecisao();
          this.gerarGraficoPrecisao();
          this.gerarGraficoMediaTempo()
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
    calcularPrecisao() {
      const DANO_POR_KILL = 200;
      const mapaJogadores = new Map<number, { danoCausado: number; kills: number; tempoTotal: number; partidas: number }>();
    
      this.estatisticas.forEach((estatistica) => {
        const { jogadorId, kill, dano, tempo } = estatistica; // Certifique-se de que `tempoSobrevivencia` está presente
    
        if (!mapaJogadores.has(jogadorId)) {
          mapaJogadores.set(jogadorId, { danoCausado: 0, kills: 0, tempoTotal: 0, partidas: 0 });
        }
    
        const dadosJogador = mapaJogadores.get(jogadorId)!;
        dadosJogador.danoCausado += dano;
        dadosJogador.kills += kill;
        dadosJogador.tempoTotal += parseInt(tempo); // Soma o tempo de sobrevivência
        dadosJogador.partidas++; // Conta o número de partidas
      });
    
      const jogadoresPrecisao: jogadorPrecisao[] = this.jogadores.map((jogador) => {
        const dados = mapaJogadores.get(jogador.id) || { danoCausado: 0, kills: 0, tempoTotal: 0, partidas: 0 };
        const precisao = dados.kills / (dados.danoCausado / DANO_POR_KILL) || 0; // Evitar divisão por zero
        const mediaTempo = dados.partidas > 0 ? dados.tempoTotal / dados.partidas : 0; // Calcula a média de tempo
    
        return {
          jogadorId: jogador.id,
          nick: jogador.jogadorNick,
          danoCausado: dados.danoCausado,
          kills: dados.kills,
          precisao: Number(precisao.toFixed(2)), // Limita a precisão a 2 casas decimais
          mediaTempo: funcoes.converteToTime(mediaTempo), // Agora representa a média de tempo
          mediaTempoNumerico:mediaTempo
        };
      });
    
      this.precisao = jogadoresPrecisao;
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
    gerarGraficoPrecisao() {
      // Obtem os nicks dos jogadores e os valores de precisão
      const labels = this.precisao.map((j) => j.nick);
      const dadosPrecisao = this.precisao.map((j) => j.precisao);
  
      // Configuração do gráfico de barras
      this.graficoPrecisao = new Chart('graficoPrecisao', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Precisão dos Jogadores',
              data: dadosPrecisao,
              backgroundColor: 'rgba(75, 192, 192, 0.6)', // Cor de preenchimento das barras
              borderColor: 'rgba(75, 192, 192, 1)', // Cor da borda das barras
              borderWidth: 1, // Largura da borda
            },
          ],
        },
        options: {
          responsive: true, // Gráfico responsivo
          plugins: {
            legend: {
              display: true, // Exibe a legenda
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
              }
            },
            datalabels:{
              display:false
            },
            tooltip: {
              enabled: true, // Habilita tooltips
            },
          },
          scales: {
            y: {
              beginAtZero: true, // Eixo Y inicia do zero
            },
          },
        },
      });
    }
    gerarGraficoMediaTempo() {
      // Obtem os nicks dos jogadores e os valores de precisão
      const labels = this.precisao.map((j) => j.nick);
      const mediaTempo = this.precisao.map((j) => j.mediaTempoNumerico);
  
      // Configuração do gráfico de barras
      this.graficoMediaTempo = new Chart('graficoMediaTempo', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Tempo Médio (mm:ss)',
              data: mediaTempo,
              backgroundColor: 'rgba(37, 212, 37, 0.6)', // Cor de preenchimento das barras
              borderColor: 'rgba(29, 163, 29, 0.6)', // Cor da borda das barras
              borderWidth: 1, // Largura da borda
            },
          ],
        },
        options: {
          responsive: true, // Gráfico responsivo
          plugins: {
            tooltip: {
              enabled: true, // Habilita tooltips
              callbacks: {
                label: (context) => {
                  const seconds = context.raw as number;
                  return `Tempo: ${funcoes.converteToTime(seconds)}`; // Mostra o tempo formatado
                }
              }
            },
            legend: {
              display: true, // Exibe a legenda
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
              }
            },
            datalabels:{
              display:false
            },
          },
          scales: {
            y: {
              beginAtZero: true, // Eixo Y inicia do zero
              ticks: {
                callback: (value) => funcoes.converteToTime(value as number), // Formata o eixo Y para mm:ss
              },
            },
          },
        },
      });
    }
  }