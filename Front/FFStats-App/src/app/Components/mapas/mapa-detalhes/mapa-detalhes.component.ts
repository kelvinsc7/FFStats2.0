import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mapa-detalhes',
  templateUrl: './mapa-detalhes.component.html',
  styleUrls: ['./mapa-detalhes.component.scss']
})
export class MapaDetalhesComponent implements OnInit {
  form!:FormGroup;

  get f():any{
     return this.form.controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }

  public validation():void{
    this.form = this.fb.group({
      nome: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
    });
  }
  public resetForm():void
  {
    this.form.reset();
  }
}
