import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Jogador } from '@app/Model/Jogador';
import { JogadorService } from '@app/Services/jogador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jogadores-detalhes',
  templateUrl: './jogadores-detalhes.component.html',
  styleUrls: ['./jogadores-detalhes.component.scss']
})
export class JogadoresDetalhesComponent implements OnInit {

  jogador={} as Jogador;
  form!:FormGroup;
  modeSave = 'postJogador'

  get f():any{
     return this.form.controls;
  }

  constructor(private fb: FormBuilder,
              private router: ActivatedRoute,
              private jogadorService: JogadorService,
              private spiner: NgxSpinnerService,
              private toaster: ToastrService
            ) { }

  public carregaDados():void{
    const dadosIdParam = this.router.snapshot.paramMap.get('id');

    if(dadosIdParam!== null)
    {
      this.spiner.show();

      this.modeSave = 'putJogador'

      this.jogadorService.getJogadorById(+dadosIdParam).subscribe({
        next:(jogador: Jogador)=>{
          this.jogador = {...jogador};
          this.form.patchValue(this.jogador);
        },
        error:()=>{
          console.error(Error);
        },
        complete:()=>this.spiner.hide(),
      })
    }

  }
  ngOnInit(): void {
    this.carregaDados();
    this.validation();
  }

  public validation():void{
    this.form = this.fb.group({
      jogadorNome: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(10)]],
      jogadorNick: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(10)]],
      idjogo: ['',[ Validators.minLength(4),Validators.maxLength(10)]],
      idLine: ['',[]],
    });
  }

  public resetForm():void
  {
    this.form.reset();
  }

  public salvarAlteracao():void{
    this.spiner.show();
    if(this.form.valid)
    {
      this.jogador =  (this.modeSave === 'postJogador')
                      ? {... this.form.value}
                      : {id: this.jogador.id,... this.form.value}

        this.jogadorService[this.modeSave](this.jogador).subscribe(
        () =>this.toaster.success('Call Salva com Sucesso', 'Sucesso!'),
        (error: any) =>{
          console.error(error);
          this.toaster.error('Erro ao salvar a Call', 'Error');
        },

    ).add(() =>this.spiner.hide());

    }
  }
}
