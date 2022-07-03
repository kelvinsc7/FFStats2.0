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
  get f():any{
     return this.form.controls;
  }

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
              {
                this.localeService.use('pt-br');
              }

  public carregaDados():void{
    const dadosIdParam = this.router.snapshot.paramMap.get('id');

    if(dadosIdParam!== null)
    {
      this.spiner.show();

      this.modeSave = 'putPartida';

      this.partidaService.getPartidaById(+dadosIdParam).subscribe({
        next:(partida: Partida)=>{
          this.partida = {...partida};
          this.form.patchValue(this.partida);
        },
        error:()=>{
          console.error(Error);
          this.toaster.error('Erro ao carregar partida', 'Erro!')
          this.spiner.hide();
        },
        complete:()=>{ this.spiner.hide();},
      })
    }

  }
  public getCall():void{
    this.callService.getCalls().subscribe({
      next: (call: Call[]) =>{
        this.calls = call

      },
      error: (error: any)=>{

      },
      complete: () => {}
    })
  }
  public getTreinos(): void{
    this.treinoService.getTreinos().subscribe({
      next: (treino: Treino[]) =>{
        this.treino = treino

      },
      error: (error: any)=>{

      },
      complete: () => {}
    })
  }
  public getMapas(): void{
    this.mapaService.getMapas().subscribe({
      next: (mapa: Mapa[]) =>{
        this.mapas = mapa

      },
      error: (error: any)=>{

      },
      complete: () => {}
    })
  }
  public getModo(): void{
    this.modoService.getModos().subscribe({
      next: (modo: Modo[]) =>{
        this.modos = modo

      },
      error: (error: any)=>{

      },
      complete: () => {}
    })
  }
  public getSubModo(): void{
    this.submodoService.getSubModos().subscribe({
      next: (sm: Submodo[]) =>{
        this.smodos = sm

      },
      error: (error: any)=>{

      },
      complete: () => {}
    })
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
      partidaData: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(10)]],
      posicao: ['',[Validators.required, Validators.min(1),Validators.max(55)]],
      treinoId:['',[Validators.required,]],
      mapaId:['',[Validators.required,]],
      callId:['',[Validators.required,]],
      modoId:['',[Validators.required,]],
      submodoId:['',[Validators.required,]],
    });


    // this.mapasel = this.form.get('mapaId')?.valueChanges
    //   .pipe(
    //     tap(mapa => console.log('Novo Mapa: ', mapa)),
    //     map(mapa => this.mapas.filter(m => m.id === mapa)),
    //     map(mapas => mapas && mapas.length >0? mapas[0].id:empty),
    //   ).subscribe();
  }

  public resetForm():void
  {
    this.form.reset();
  }

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
