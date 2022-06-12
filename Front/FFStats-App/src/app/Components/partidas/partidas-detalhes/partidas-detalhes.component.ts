import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export class DemoDatepickerBasicComponent {}

@Component({
  selector: 'app-partidas-detalhes',
  templateUrl: './partidas-detalhes.component.html',
  styleUrls: ['./partidas-detalhes.component.scss']
})
export class PartidasDetalhesComponent implements OnInit {

  form!:FormGroup;

  get f():any{
     return this.form.controls;
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.validation();
  }
  public validation():void{
    this.form = this.fb.group({
      descricao: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
      data: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(10)]],
      posicao: ['',[Validators.required, Validators.min(1),Validators.max(55)]],
    });
  }
  public resetForm():void
  {
    this.form.reset();
  }

}
