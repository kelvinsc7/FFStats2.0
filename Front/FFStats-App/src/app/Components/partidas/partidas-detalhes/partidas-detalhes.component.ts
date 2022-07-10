import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Call } from '@app/Model/Call';
import { Mapa } from '@app/Model/Mapa';
import { Modo } from '@app/Model/Modo';
import { Partida } from '@app/Model/Partida';
import { Submodo } from '@app/Model/Submodo';
import { Treino } from '@app/Model/Treino';
import { CallService } from '@app/Services/call.service';
import { MapaService } from '@app/Services/mapa.service';
import { ModoService } from '@app/Services/modo.service';
import { PartidaService } from '@app/Services/partida.service';
import { SubmodoService } from '@app/Services/submodoService.service';
import { TreinoService } from '@app/Services/treino.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { empty, map, switchMap, tap } from 'rxjs';

export class DemoDatepickerBasicComponent {}

@Component({
  selector: 'app-partidas-detalhes',
  templateUrl: './partidas-detalhes.component.html',
  styleUrls: ['./partidas-detalhes.component.scss']
})
export class PartidasDetalhesComponent implements OnInit {

  mapasel:number = 0;
  treino:Treino[] = [];
  mapas:Mapa[] = [];
  modos:Modo[] = [];
  smodos:Submodo[]=[];
  calls: Call[] = [];
  partida={} as Partida;
  form!:FormGroup;
  modeSave = 'postPartida';

  get f():any{return this.form.controls;}

  get bsConfig():any{
    return { isAnimated: true, adaptivePosition: true,
             dateInputFormat: 'DD/MM/YYYY',
             containerClass: 'theme-default',
             showWeekNumbers: false,
            }
  }


  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private router: ActivatedRoute,
              private partidaService: PartidaService,
              private treinoService: TreinoService,
              private mapaService: MapaService,
              private callService: CallService,
              private modoService: ModoService,
              private submodoService: SubmodoService,
              private spiner: NgxSpinnerService,
              private toaster: ToastrService)
              {this.localeService.use('pt-br');}

  public carregaDados():void{
    const dadosIdParam = this.router.snapshot.paramMap.get('id');

    if(dadosIdParam!== null)
    {
      this.spiner.show();

      this.modeSave = 'putPartida';

      this.partidaService.getPartidaById(+dadosIdParam).subscribe(
        (partida: Partida)=>{
          this.partida = {...partida};
          this.form.patchValue(this.partida);
        },
        ()=>{
          console.error(Error);
          this.toaster.error('Erro ao carregar partida', 'Erro!')
        },
      ).add(()=>{ this.spiner.hide();},)
    }

  }
  public getCall():void{
    this.callService.getCalls().subscribe(
      (call: Call[]) =>{
        this.calls = call
      },
      (error: any)=>{
      }
    )
  }
  public getTreinos(): void{
    this.treinoService.getTreinos().subscribe(
      (treino: Treino[]) =>{
        this.treino = treino
      },
      (error: any)=>{},
    )
  }
  public getMapas(): void{
    this.mapaService.getMapas().subscribe(
      (mapa: Mapa[]) =>{
        this.mapas = mapa
      },
      (error: any)=>{
      },
    )
  }
  public getModo(): void{
    this.modoService.getModos().subscribe(
      (modo: Modo[]) =>{
        this.modos = modo
      },
      (error: any)=>{
      },
    )
  }
  public getSubModo(): void{
    this.submodoService.getSubModos().subscribe(
      (sm: Submodo[]) =>{
        this.smodos = sm
      },
      (error: any)=>{
      },
    )
  }
  ngOnInit() {
    this.getTreinos();
    this.getMapas();
    this.getCall();
    this.getModo();
    this.getSubModo();
    this.carregaDados();
    this.validation();
  }
  public validation():void{
    this.form = this.fb.group({
      partidaDescricao: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
      partidaData: ['', [Validators.required]],
      posicao: ['',[Validators.required, Validators.min(1),Validators.max(55)]],
      treinoId:['',[Validators.required,]],
      mapaId:['',[Validators.required,]],
      callId:['',[Validators.required,]],
      modoId:['',[Validators.required,]],
      submodoId:['',[Validators.required,]],
    });
  }

  public resetForm():void{this.form.reset();}

  public salvarAlteracao():void{
    this.spiner.show();
    if(this.form.valid)
    {
      this.partida =  (this.modeSave === 'postPartida')
                      ? {... this.form.value}
                      : {id: this.partida.id,... this.form.value}

        this.partidaService[this.modeSave](this.partida).subscribe(
        () =>this.toaster.success('Partida Salva com Sucesso', 'Sucesso!'),
        (error: any) =>{
          console.error(error);
          this.toaster.error('Erro ao salvar a partida', 'Error');
        },
      ).add(() =>this.spiner.hide());
    }
  }
}
