import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidaitorField } from '@app/helpers/ValidaitorField';

@Component({
  selector: 'app-Perfil',
  templateUrl: './Perfil.component.html',
  styleUrls: ['./Perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  form!:FormGroup;
  get f():any{
    return this.form.controls;
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.validation();
  }
  public validation():void{
    const formOptions: AbstractControlOptions = {
      validators: ValidaitorField.mustMatch('senha', 'csenha')
    };


    this.form = this.fb.group({
      senha: ['',[Validators.required, Validators.minLength(8),Validators.maxLength(16)]],
      csenha: ['',[Validators.required, Validators.minLength(8),Validators.maxLength(16)]],
    },
    formOptions);
  }
  public resetForm():void
  {
    this.form.reset();
  }

}
