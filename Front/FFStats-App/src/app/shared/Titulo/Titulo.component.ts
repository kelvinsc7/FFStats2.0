import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Titulo',
  templateUrl: './Titulo.component.html',
  styleUrls: ['./Titulo.component.scss']
})
export class TituloComponent implements OnInit {

  @Input() titulo='';
  @Input() subtitulo='';
  @Input() iconclass='fa fa-user';
  @Input()  botaolistar = true;
  constructor(private router : Router) { }

  ngOnInit() {
  }

  listar(): void{
    this.router.navigate([`/${this.titulo.toLowerCase()}/lista`])
  }
}
