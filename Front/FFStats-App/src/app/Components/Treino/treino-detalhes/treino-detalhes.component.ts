import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-treino-detalhes',
  templateUrl: './treino-detalhes.component.html',
  styleUrls: ['./treino-detalhes.component.scss']
})
export class TreinoDetalhesComponent implements OnInit {

  form!:FormGroup;

  get f():any
  {
    return this.form.controls
  }
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.validation();
  }

  public validation():void{
    this.form = this.fb.group({
      descricao: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
    });
  }
  public resetForm():void
  {
    this.form.reset();
  }
}
