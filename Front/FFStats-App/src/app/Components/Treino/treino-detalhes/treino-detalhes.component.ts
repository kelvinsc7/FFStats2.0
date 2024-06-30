import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Treino } from '@app/Model/Treino';
import { TreinoService } from '@app/Services/treino.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-treino-detalhes',
  templateUrl: './treino-detalhes.component.html',
  styleUrls: ['./treino-detalhes.component.scss']
})
export class TreinoDetalhesComponent implements OnInit {

  form!:FormGroup;
  treino ={} as Treino;
  modeSave = 'postTreino'
  isLoading=false;

  get f():any{return this.form.controls}

  constructor(private fb: FormBuilder,
              private router: ActivatedRoute,
              private treinoService: TreinoService,
              private spinner: NgxSpinnerService,
              private toaster: ToastrService) { }


  public carregaDados():void{
    const dadosIdParam = this.router.snapshot.paramMap.get('id');
    if(dadosIdParam!== null)
    {
      this.spinner.show();
      this.modeSave = 'putTreino';
      this.treinoService.getTreinoById(+dadosIdParam).subscribe(
        (treino: Treino)=>{
          this.treino = {...treino};
          this.form.patchValue(this.treino);
        },
        ()=>{
          console.error(Error);
          this.toaster.error('Erro ao carregar treino', 'Erro!')
        },

      ).add(()=>{ this.spinner.hide()},)
    }
  }
  ngOnInit() {
    this.carregaDados();
    this.validation();
  }

  public validation():void{
    this.form = this.fb.group({
      treinoDescricao: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
    });
  }

  public resetForm():void{this.form.reset();}

  public salvarAlteracao():void{
    this.isLoading = true;
    this.spinner.show();
    if(this.form.valid)
    {
      this.treino =  (this.modeSave === 'postTreino')
                      ? {... this.form.value}
                      : {treinoId: this.treino.id,... this.form.value}

        this.treinoService[this.modeSave](this.treino).subscribe(
        () =>this.toaster.success('Treino Salvo com Sucesso', 'Sucesso!'),
        (error: any) =>{
          console.error(error);
          this.toaster.error('Erro ao salvar a Treino', 'Error');
        },

    ).add(() =>this.spinner.hide());

    }
    this.isLoading = false;
  }
}
