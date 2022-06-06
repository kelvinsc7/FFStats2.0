import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Jogadores',
  templateUrl: './Jogadores.component.html',
  styleUrls: ['./Jogadores.component.scss']
})
export class JogadoresComponent implements OnInit {

  public jogadores: any=[];
  public jogadoresFiltrados: any = [];
  private _filtroLista: string = '';

  public get filtroLista()
  {
    return this._filtroLista;
  }
  public set filtroLista(value: string)
  {
    this._filtroLista = value;
    this.jogadoresFiltrados = this.filtroLista ? this.filtrarJogador(this.filtroLista): this.jogadores;
  }
  filtrarJogador(filtrarPor: string):any
  {
    filtrarPor = filtrarPor.toLowerCase();
    return this.jogadores.filter(
      (jogador: { jogadorNome: string; }) => jogador.jogadorNome.toLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getJogadores();
  }
  public getJogadores(): void{

    this.http.get('https://localhost:5001/api/Jogador').subscribe(
      response => {
        this.jogadores = response
        this.jogadoresFiltrados = this.jogadores
      },
      error => console.log(error)
      );
  }

}
