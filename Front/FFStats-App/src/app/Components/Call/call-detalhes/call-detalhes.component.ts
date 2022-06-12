import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-call-detalhes',
  templateUrl: './call-detalhes.component.html',
  styleUrls: ['./call-detalhes.component.scss']
})
export class CallDetalhesComponent implements OnInit {

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
      nome: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(25)]],
    });
  }
  public resetForm():void
  {
    this.form.reset();
  }
}
