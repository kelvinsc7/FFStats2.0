import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidaitorField } from '@app/helpers/ValidaitorField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form!:FormGroup;

  get f():any{
    return this.form.controls;
 }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }
  public validation():void{
    const formOptions: AbstractControlOptions = {
      validators: ValidaitorField.mustMatch('senha', 'csenha')
    };


    this.form = this.fb.group({
      pnome: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
      unome: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
      email: ['',[Validators.required, Validators.email, Validators.maxLength(25)]],
      user: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(12)]],
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
