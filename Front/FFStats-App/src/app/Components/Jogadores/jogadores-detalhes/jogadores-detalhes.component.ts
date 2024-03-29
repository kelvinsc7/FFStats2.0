import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Jogador } from '@app/Model/Jogador';
import { Line } from '@app/Model/Line';
import { JogadorService } from '@app/Services/jogador.service';
import { LineService } from '@app/Services/Line.service';
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
  lines: Line[] = [];
  isLoading=false;

  get f():any{return this.form.controls;}

  constructor(private fb: FormBuilder,
              private router: ActivatedRoute,
              private jogadorService: JogadorService,
              private lineService: LineService,
              private spiner: NgxSpinnerService,
              private toaster: ToastrService
            ) { }

  public carregaDados():void{
    const dadosIdParam = this.router.snapshot.paramMap.get('id');

    if(dadosIdParam!== null)
    {
      this.spiner.show();

      this.modeSave = 'putJogador'

      this.jogadorService.getJogadorById(+dadosIdParam).subscribe(
        (jogador: Jogador)=>{
          this.jogador = {...jogador};
          this.form.patchValue(this.jogador);
        },
        ()=>{
          console.error(Error);
        },
      ).add(()=>this.spiner.hide())
    }
  }
  public getLine():void{
    this.lineService.getLines().subscribe(
      (line: Line[]) =>{
        this.lines = line
      },
      (error: any)=>{
      }
    )
  }

  ngOnInit(): void {
    this.carregaDados();
    this.getLine();
    this.validation();
  }

  public validation():void{
    this.form = this.fb.group({
      jogadorNome: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
      jogadorNick: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
      idJogo: ['',[ Validators.minLength(4),Validators.maxLength(10)]],
      lineId: ['',[]],
    });
  }

  public resetForm():void{this.form.reset();}

  public salvarAlteracao():void{
    this.isLoading = true;
    this.spiner.show();
    if(this.form.valid)
    {
      this.jogador =  (this.modeSave === 'postJogador')
                      ? {... this.form.value}
                      : {id: this.jogador.id,... this.form.value}

        this.jogadorService[this.modeSave](this.jogador).subscribe(
        () =>this.toaster.success('Jogador Salva com Sucesso', 'Sucesso!'),
        (error: any) =>{
          console.error(error);
          this.toaster.error('Erro ao salvar a Jogador', 'Error');
        },

    ).add(() =>this.spiner.hide());

    }
    this.isLoading = false;
  }
}
