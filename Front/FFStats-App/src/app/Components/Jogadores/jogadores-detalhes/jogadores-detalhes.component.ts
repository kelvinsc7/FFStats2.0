import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-jogadores-detalhes',
  templateUrl: './jogadores-detalhes.component.html',
  styleUrls: ['./jogadores-detalhes.component.scss']
})
export class JogadoresDetalhesComponent implements OnInit {

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
      nome: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(10)]],
      nick: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(10)]],
      idjogo: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(10)]],
    });
  }

  public resetForm():void
  {
    this.form.reset();
  }
}
