import { Component, OnInit } from '@angular/core';
import { Estatistica } from '@app/Model/Estatistica';
import { Partida } from '@app/Model/Partida';
import { EstatisticaService } from '@app/Services/estatistica.service';
import { PartidaService } from '@app/Services/partida.service';
import {Chart, registerables } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-dash-partidas',
  templateUrl: './dash-partidas.component.html',
  styleUrls: ['./dash-partidas.component.scss']
})
export class DashPartidasComponent implements OnInit {

  
  estatisticas:Estatistica[];
  estatisticasFiltradas:Estatistica[];
  partidas:Partida[];
  partidaFiltradas:Partida[];

  //Variaveis de Totais
  totalPartidas:number;
  totalKills:number;
  totalMortes:number;
  totalDano:number;
  tempoTotal:string;
  totalBooyah:number;
  percentBooyah:string;
  percentTop3:string;
  percentTop5:string;
  maiorKill:number

  //variaveis dos graficos
  posicoesUnicas:number[];
  listaTotalPosicoes:{ posicao:number; total:string}[] = [];
  

  constructor(
    private estatisticaService: EstatisticaService,
    private partidaService: PartidaService
  ) { }

  ngOnInit() {
    const linhaMediaPlugin = {
      id: 'linhaMedia',
      beforeDraw: (chart) => {
        const { ctx, chartArea: { left, right }, scales: { y } } = chart;
  
        // Acessa a configuração da linha média diretamente no plugin
        const mediaData = chart.customData?.linhaMedia;
        if (!mediaData) return;
  
        const { mediaTempo, label } = mediaData;
  
        // Posição da média no eixo Y
        const yMedia = y.getPixelForValue(mediaTempo);
  
        // Desenha a linha da média
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(left, yMedia); // Começa à esquerda
        ctx.lineTo(right, yMedia); // Vai até a direita
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FF0000'; // Cor da linha (vermelha)
        ctx.stroke();
        ctx.restore();
  
        // Adiciona o texto da média ao lado da linha
        ctx.fillStyle = '#FF0000'; // Mesma cor da linha
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(`Média: ${label}`, left + 10, yMedia - 5); // Texto ajustado acima da linha
      }
    };
  
    // Registra o plugin
    Chart.register(ChartDataLabels, linhaMediaPlugin);
  
    this.carregarDados();
  }
  carregarDados() {
    // Usa forkJoin para garantir que ambas as chamadas sejam concluídas antes de prosseguir
    forkJoin({
      partidas: this.partidaService.getPartidas(),
      estatisticas: this.estatisticaService.getAllEstatisticas()
    }).subscribe({
      next: ({ partidas, estatisticas }) => {
        this.partidas = partidas;
        this.estatisticas = estatisticas;
  
        // Executa os cálculos e gera os gráficos após os dados serem carregados
        this.calculaItensPartidas();
        this.calculaTotaisEstatisticas();
        this.graficoTaxaVitórias();
        this.graficoHistoricoPartidas();
        this.graficoComparacaoEstatisticas();
        this.graficoKD();
        this.graficoTempoPartidas()
      },
      error: (error: any) => {
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  //Processamento de dados
  calculaTotaisEstatisticas(){
    //Somas de Estatisticas
    let tempoEmSegundos = 0;
    this.totalKills = 0;
    this.totalMortes = 0;
    this.totalDano = 0;
    this.estatisticas.forEach(e=>{
      this.totalKills += e.kill;
      this.totalMortes += e.morte;
      this.totalDano += e.dano;
      tempoEmSegundos += parseInt(e.tempo);
    });
    this.tempoTotal = this.converteToTimeHora(tempoEmSegundos)
  }
  calculaItensPartidas(){
    //quantidade de partidas
    this.totalBooyah = 0;
    this.totalPartidas = this.partidas? this.partidas.length : 0;
    this.partidas.forEach(p=>{
      if(p.posicao ===1)
        this.totalBooyah++;
    });
    this.maiorKill = this.getMaiorKillPorPartida();
    this.separaPosicoes();
  }
  getMaiorKillPorPartida(): number {
    let maiorKill = 0;
  
    this.partidas.forEach(partida => {
      if (partida.estatisticas && partida.estatisticas.length > 0) {
        // Soma os kills da partida
        const totalKills = partida.estatisticas.reduce((soma: number, estatistica: any) => {
          return soma + (estatistica.kill || 0);
        }, 0);
  
        // Verifica se esta soma é a maior
        if (totalKills > maiorKill) {
          maiorKill = totalKills;
        }
      }
    });
  
    return maiorKill;
  }
  separaPosicoes(){
    const posicoesUnicas = new Set<number>();
    const totalPosicoes : {[posicao:number]: number} = {};

    this.partidas.forEach(p =>{
      const posicao = p.posicao
      if(posicao !== undefined)
      {
        posicoesUnicas.add(posicao);
        if(totalPosicoes[posicao])
        {
          totalPosicoes[posicao]++;
        }
        else
        {
          totalPosicoes[posicao] = 1
        }
        this.posicoesUnicas = Array.from(posicoesUnicas);
        this.listaTotalPosicoes = Object.entries(totalPosicoes).map(([posicao,total])=>({
          posicao: Number(posicao),
          total: ((total/this.totalPartidas)*100).toFixed(2).toString()
        })
        );
      }
    })

    const posicaoBooyah = this.listaTotalPosicoes.find(p => p.posicao === 1);
    if (posicaoBooyah) {
      this.percentBooyah = parseFloat(posicaoBooyah.total).toFixed(2);
    }
    this.percentTop3 = this.listaTotalPosicoes
      .filter(p => p.posicao >= 1 && p.posicao <= 3) // Filtra posições 1, 2 e 3
      .reduce((acc, cur) => acc + parseFloat(cur.total), 0).toFixed(2);
    this.percentTop5 = this.listaTotalPosicoes
      .filter(p => p.posicao >= 1 && p.posicao <= 5) // Filtra posições 1, 2, 3, 4 e 5
      .reduce((acc, cur) => acc + parseFloat(cur.total), 0).toFixed(2);
  }
  converteToTimeHora(seconds: number): string {
    const hours = Math.floor(seconds / 3600); // Calcula as horas
    const minutes = Math.floor((seconds % 3600) / 60); // Calcula os minutos restantes
    const remainingSeconds = seconds % 60; // Calcula os segundos restantes
    
    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
  }
  converteToTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
  }
  
  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  private obterDadosDeTempo(): { labels: string[], tempos: string[], temposNumericos: number[] } {
    if (!this.partidas || this.partidas.length === 0) {
      return { labels: [], tempos: [], temposNumericos: [] };
    }
  
    // Extraindo tempos de estatísticas
    const temposNumericos = this.partidas.map(partida =>
      Math.max(...partida.estatisticas.map(estatistica => parseInt(estatistica.tempo)))
    );
  
    // Formata os tempos para mm:ss
    const tempos = temposNumericos.map(tempo => this.converteToTime(tempo));
  
    // Cria os labels para as partidas
    const labels = this.partidas.map((partida, index) => `Partida ${index + 1}`);
  
    return { labels, tempos, temposNumericos };
  }
  private calcularMediaTempos(tempos: number[]): number {
    const total = tempos.reduce((soma, tempo) => soma + tempo, 0);
    return total / tempos.length; // Calcula a média
  }

  //Gera Graficos
  graficoTaxaVitórias() {
    const valoresTotais = this.listaTotalPosicoes.map(item => parseFloat(item.total));
    const cores = [
      '#FFD700',
      '#FFB347',
      '#FF8C00',
      '#FF6347',
      '#FF4500',
      '#E9967A',
      '#CD5C5C',
      '#DB7093',
      '#BA55D3',
      '#9370DB',
      '#778899',
      '#708090',
      '#696969',
      '#A9A9A9',
      '#D3D3D3' 
    ];
    const ctx = document.getElementById('booyahChart') as HTMLCanvasElement;
    const labelInfo = document.getElementById('labelInfo') as HTMLElement;


    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.listaTotalPosicoes.map(item => `Top ${item.posicao}`),
        datasets: [{
          label: 'Total em %',
          data: valoresTotais, // Percentual de preenchimento
          backgroundColor: cores.slice(0, valoresTotais.length),
          borderWidth: 1,
          hoverOffset: 10
        }],
        
      },
      options: {
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
          tooltip: {
              enabled: true, // Ativa os tooltips
              callbacks:{
                label: function(context){
                  const value = context.raw;
                  const total = context.dataset.data.reduce((acc, cur) => acc + cur, 0);
                  const label = context.label === 'Top 1' ? 'Booyah' : context.label;
                  labelInfo.innerHTML = `${label}: ${value}%`;
                  return `${value}%`;
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: true, // Anima a rotação
          animateScale: true   // Anima o tamanho
        },
        hover: {
          mode: 'nearest',
        }
      }
    });

    ctx.addEventListener('mousemove', function(event) {
      const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
    
      if (points.length === 0) {
        labelInfo.innerHTML = ''; // Limpa a label ao sair do hover
      }
    });
  }
  graficoHistoricoPartidas(){
    const ctx = document.getElementById('historicoChart') as HTMLCanvasElement;
    const labels = this.partidas.map(partida => partida.partidaDescricao); // Label do eixo X
    const data = this.partidas.map(partida => partida.posicao);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          data: data, 
          fill:false,
          borderColor:'rgb(75, 192, 192)',
          tension: 0.2,
        }]
      },
      options: {
        scales: {
          y: {
            reverse: true,
            min: 0.5, // Adiciona uma margem para evitar corte do valor 1
            max: 15, // Adiciona uma margem superior também
            ticks: {
              stepSize: 1, // Exibe os valores inteiros
              callback: function(value) {
                return Number(value).toFixed(0);
              }
            },
            title: {
              display: true,
              text: 'Posição'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Partidas'
            },
          }
        },
        plugins: {
          legend: {
            display: false // Oculta as labels diretamente no gráfico
          },
          datalabels:{
            display:false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const partidaDescricao = labels[context.dataIndex];
                const posicao = data[context.dataIndex];
                return `Partida: ${partidaDescricao}, Posição: ${posicao}`;
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  graficoComparacaoEstatisticas() {
    // Filtra as últimas 10 partidas
    const ultimas10Partidas = this.partidas.slice(-10);
  
    // Extrai os dados das estatísticas
    const labelsPartidas = ultimas10Partidas.map((partida, index) => partida.partidaDescricao);
    const dadosKills = ultimas10Partidas.map(partida => 
      partida.estatisticas.reduce((total, estat) => total + estat.kill, 0)
    );
    const dadosDano = ultimas10Partidas.map(partida => 
      partida.estatisticas.reduce((total, estat) => total + (estat.dano / 1000), 0)
    );
    const dadosAssistencias = ultimas10Partidas.map(partida => 
      partida.estatisticas.reduce((total, estat) => total + estat.assistencia, 0)
    );
    const dadosMortes = ultimas10Partidas.map(partida => 
      partida.estatisticas.reduce((total, estat) => total + estat.morte, 0)
    );
    const dadosDerrubados = ultimas10Partidas.map(partida => 
      partida.estatisticas.reduce((total, estat) => total + estat.derrubado, 0)
    );
  
    // Configuração do gráfico
    const ctx = document.getElementById('comparacaoEstatisticasChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar', // Tipo de gráfico: barras
      data: {
        labels: labelsPartidas, // Rótulos das partidas
        datasets: [
          {
            label: 'Kills',
            data: dadosKills,
            backgroundColor: 'rgba(255, 0, 0, 0.7)', // Cor da seção de kills
          },
          {
            label: 'Dano',
            data: dadosDano,
            backgroundColor: 'rgba(22, 233, 127, 0.7)', // Cor da seção de dano
          },
          {
            label: 'Assistências',
            data: dadosAssistencias,
            backgroundColor: 'rgba(20, 17, 226, 0.7)', // Cor da seção de assistências
          },
          {
            label: 'Mortes',
            data: dadosMortes,
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Cor da seção de mortes
          },
          {
            label: 'Derrubados',
            data: dadosDerrubados,
            backgroundColor: 'rgba(221, 86, 255, 0.7)', // Cor da seção de derrubados
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top', // Legenda no topo
            display:true,
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
          tooltip: {
            enabled: true, // Ativa os tooltips
          },
        },
        scales: {
          x: {
            stacked: true, // Ativa empilhamento no eixo X
            title: {
              display: true,
              text: 'Partidas',
            },
          },
          y: {
            stacked: true, // Ativa empilhamento no eixo Y
            title: {
              display: true,
              text: 'Total Estatísticas',
            },
          },
        },
      },
    });
  }
  graficoKD() {
    const valorKD = this.totalKills / this.totalMortes; // Calcula o K/D
    const maxKD = 5; // Máximo possível
    const percentKD = (valorKD / maxKD) * 100; // Percentual relativo ao máximo
  
    const ctx = document.getElementById('graficoKD') as HTMLCanvasElement;
    const canvasContext = ctx.getContext('2d')!; // Obtém o contexto 2D para criar o gradiente
  
    // Criação do gradiente
    const gradient = canvasContext.createLinearGradient(90, 0, ctx.width, 0);
    gradient.addColorStop(0, '#FF0000');
    gradient.addColorStop(0.2, '#ff8c00');
    gradient.addColorStop(0.4, '#ffb347');
    gradient.addColorStop(0.6, '#FFFF00');
    gradient.addColorStop(0.8, '#5bf0a5');
    gradient.addColorStop(1, '#00FF00');
  
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [percentKD, 100 - percentKD], // Valor atual e restante
            backgroundColor: [gradient, '#E0E0E0'], // Gradiente dinâmico para o KD e cor de fundo
            borderWidth: 0,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%', // Define o espaço central vazio
        rotation: -90, // Começa no topo
        circumference: 180, // Limita o gráfico a um semicírculo
        plugins: {
          tooltip: {
            enabled: false // Desativa os tooltips
          },
          datalabels: {
            display: false
          },
          legend: {
            display: false // Oculta a legenda
          }
        },
        layout: {
          padding: 10
        },
        animation: {
          onComplete: function (animation) {
            const chartInstance = animation.chart; // Acessa o gráfico renderizado
            const ctx = chartInstance.ctx;
            const width = chartInstance.width;
            const height = chartInstance.height;
  
            const fontSize = height / 10; // Calcula um tamanho relativo para o texto
            const text = `${valorKD.toFixed(2)} K/D`;
  
            ctx.save(); // Salva o estado do contexto
            ctx.font = `bold ${fontSize}px sans-serif`;
            ctx.textBaseline = 'middle';
  
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 1.5; // Ajusta para o centro do semicírculo
  
            ctx.fillStyle = '#4CAF50';
            ctx.fillText(text, textX, textY);
            ctx.restore(); // Restaura o estado original do contexto
          }
        },
        hover: {
          mode: null, // Desativa o hover para evitar re-renderização
        }
      }
    });
  
    // Garante que o texto é desenhado apenas uma vez após o render
    chart.render();
  }
  
  graficoTempoPartidas() {
    const { labels, temposNumericos } = this.obterDadosDeTempo();
  
    if (labels.length === 0 || temposNumericos.length === 0) {
      console.error('Nenhuma partida encontrada ou dados inválidos.');
      return;
    }
  
    // Calcula a média dos tempos
    const mediaTempo = this.calcularMediaTempos(temposNumericos);
  
    const ctx = document.getElementById('graficoTempoPartidas') as HTMLCanvasElement;
  
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels, // Labels das partidas
        datasets: [{
          label: 'Tempo por Partida (mm:ss)',
          data: temposNumericos, // Tempos em segundos
          borderColor: '#4CAF50', // Cor da linha principal
          backgroundColor: 'rgba(76, 175, 80, 0.2)', // Cor de fundo da linha
          fill: true, // Preenchimento abaixo da linha
          tension: 0.4, // Suavidade da curva
          pointRadius: 5, // Tamanho dos pontos
          pointBackgroundColor: '#FF5722' // Cor dos pontos
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const seconds = context.raw as number;
                return `Tempo: ${this.converteToTime(seconds)}`; // Mostra o tempo formatado
              }
            }
          },
          datalabels: {
            display: false
          },
          legend: {
            display: false // Mostra a legenda do gráfico
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Partidas',
            }
          },
          y: {
            title: {
              display: true,
              text: 'Tempo (segundos)',
            },
            ticks: {
              callback: (value) => this.converteToTime(value as number), // Formata o eixo Y para mm:ss
            },
            beginAtZero: true
          }
        }
      }
    });
  
    // Armazena os dados personalizados diretamente no gráfico
    // chart.customData = {
    //   linhaMedia: {
    //     mediaTempo: mediaTempo, // Valor da média
    //     label: this.converteToTime(mediaTempo) // Texto formatado para a linha
    //   }
    // };
  }
  }
