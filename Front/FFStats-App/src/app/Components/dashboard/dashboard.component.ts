import { Component, OnInit } from '@angular/core';
import { EstatisticaService } from '@app/Services/estatistica.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private estatisticaService: EstatisticaService) {}
  estatisticasCarregadas = false

  ngOnInit(): void {
    this.estatisticaService.reloadEstatisticas();
    this.estatisticaService.loadEstatisticas().subscribe({
      next: (estatisticas) => {
        console.log('Estatísticas carregadas:', estatisticas);
        this.estatisticasCarregadas = true; // Ativa os filhos apenas após os dados estarem disponíveis
      },
      error: (err) => {
        console.error('Erro ao carregar estatísticas:', err);
      },
    });
  }
}
