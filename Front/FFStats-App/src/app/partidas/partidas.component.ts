import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.scss']
})
export class PartidasComponent implements OnInit {

  public partidas: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPartidas();
  }

  public getPartidas(): void{

    this.http.get('https://localhost:5001/api/partida').subscribe(
      response => this.partidas = response,
      error => console.log(error)
      );
  }

}
