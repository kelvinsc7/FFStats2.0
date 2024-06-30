import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Call } from '@app/Model/Call';
import { Estatistica } from '@app/Model/Estatistica';
import { Jogador } from '@app/Model/Jogador';
import { Mapa } from '@app/Model/Mapa';
import { Modo } from '@app/Model/Modo';
import { Partida } from '@app/Model/Partida';
import { Submodo } from '@app/Model/Submodo';
import { Treino } from '@app/Model/Treino';
import { CallService } from '@app/Services/call.service';
import { EstatisticaService } from '@app/Services/estatistica.service';
import { JogadorService } from '@app/Services/jogador.service';
import { MapaService } from '@app/Services/mapa.service';
import { ModoService } from '@app/Services/modo.service';
import { PartidaService } from '@app/Services/partida.service';
import { SubmodoService } from '@app/Services/submodoService.service';
import { TreinoService } from '@app/Services/treino.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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

  modalRef: BsModalRef;
  currentDate: Date = new Date; //Data atual, usado no datapicker
  maxFormsEstatistica = 4; //Variavel de controle de quantodade de estatisticas
  partidaId :number;
  //SelectedOptions
  soTreino: string = '0';
  soMapa: string = '0';
  soCall: string = '0';
  soModo: string = '0';
  soSubModo: string = '0';
  soJogador : string ='0';
  // sojogador1: string ='0';
  // sojogador2: string ='0';
  // sojogador3: string ='0';
  // sojogador4: string ='0';
  isLoading = false;

  treino:Treino[] = [];
  mapas:Mapa[] = [];
  modos:Modo[] = [];
  smodos:Submodo[]=[];
  calls: Call[] = [];
  jogador: Jogador[] = [];
  partida={} as Partida;
  form!:FormGroup;
  modeSave = 'postPartida';

  estatisticaAtual = {id:0, indice :0}

  get modoEditar(): boolean{
    return this.modeSave === 'putPartida'
  }

  get estatisticas(): FormArray{
    return this.form.get('estatisticas') as FormArray;
  }

  get f():any{return this.form.controls;}

  get bsConfig():any{
    return { isAnimated: true, adaptivePosition: true,
             dateInputFormat: 'DD/MM/YYYY',
             containerClass: 'theme-default',
             showWeekNumbers: false,
             initialValue : this.currentDate
            }
  }

  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private activatedRouter: ActivatedRoute,
              private partidaService: PartidaService,
              private treinoService: TreinoService,
              private mapaService: MapaService,
              private callService: CallService,
              private modoService: ModoService,
              private submodoService: SubmodoService,
              private jogadorService: JogadorService,
              private spiner: NgxSpinnerService,
              private toaster: ToastrService,
              private router: Router,
              private modalService: BsModalService,
              private estatisticaService: EstatisticaService)
              {this.localeService.use('pt-br');}

  public carregaDados():void{
    this.partidaId = +this.activatedRouter.snapshot.paramMap.get('id');

    if(this.partidaId!== null && this.partidaId>0)
    {
      this.spiner.show();

      this.modeSave = 'putPartida';

      this.partidaService.getPartidaById(this.partidaId).subscribe(
        (partida: Partida)=>{
          this.partida = {...partida};
          this.form.patchValue(this.partida);

          console.log(this.jogador)
          this.partida.estatisticas.forEach(estatistica =>{ 
            this.estatisticas.push(this.criarEstatisticas(estatistica));
          });
          //this.carregaEstatisticas();
        },
        (Error)=>{
          console.error(Error);
          this.toaster.error('Erro ao carregar partida', 'Erro!')
        },
      ).add(()=>{ this.spiner.hide();},)
    }

  }
  // public carregaEstatisticas():void{
  //     this.estatisticaService.getEstatisticasByPartidaId(this.partidaId).subscribe(
  //       (estatisticaRetorno: Estatistica[]) =>{
  //         estatisticaRetorno.forEach(estatistica =>{ 
  //           this.estatisticas.push(this.criarEstatisticas(estatistica))
  //         }
  //       )
  //       },
  //       (error :any) =>{
  //         this.toaster.error('Erro ao tentar carregar as Estatisticas', 'Erro!');
  //         console.error(error);
  //       }
  //     ).add(()=>{ this.spiner.hide();},)
  // }
  public getCall():void{
    if(this.soMapa == '0')
    {
      this.callService.getCalls().subscribe(
        (call: Call[]) =>{
          this.calls = call
        },
        (error: any)=>{
        }
      )
    }
    else
    {
      this.callService.getCallByMapaId(Number(this.soMapa)).subscribe(
        (call: Call[]) =>{
          this.calls = call
        },
        (error: any)=>{
        }
      )
    }
    
  }
  getJogadorControl(index: number): string {
    return this.estatisticas.at(index).get('jogadorId').value;
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
    if(this.soModo  == '0'){
      this.submodoService.getSubModos().subscribe(
        (sm: Submodo[]) =>{
          this.smodos = sm
        },
        (error: any)=>{
        },
      )
    }
    else
    this.submodoService.getSubModoByModoId(Number(this.soModo)).subscribe(
      (sm: Submodo[]) =>{
        this.smodos = sm
      },
      (error: any)=>{
      },
    )
  }
  public getJogadores(): void{
    this.jogadorService.getJogadores().subscribe(
      (jg: Jogador[]) =>{
        this.jogador = jg
      },
      (error:any)=>{

      },
    )
  }

  onSelecionaMapa(){
    this.getCall();
  }
  onSelecionaModo(){
    this.getSubModo();
  }

  getFullNgModelName(index: number): string{
    console.log(`${this.soJogador}${index}`);
    return `${this.soJogador}${index}`;
  }

  ngOnInit() {
    this.getJogadores();
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
      estatisticas: this.fb.array([])
    });
  }
  
  adicionarEstatisticas(): void{
      if (this.estatisticas.length < this.maxFormsEstatistica)
        this.estatisticas.push(this.criarEstatisticas({id : 0} as Estatistica));
  }

  buttonAdicionarDisabled(): boolean{
    return this.estatisticas.length < this.maxFormsEstatistica
  }

  criarEstatisticas(estatistica: Estatistica): FormGroup{
    return this.fb.group({
      id: [estatistica.id],
      jogadorId: [estatistica.jogadorId, Validators.required],
      kill: [estatistica.kill, Validators.required],
      morte: [estatistica.morte, Validators.required],
      assistencia: [estatistica.assistencia, Validators.required],
      dano: [estatistica.dano, Validators.required],
      derrubado: [estatistica.derrubado, Validators.required],
      cura: [estatistica.cura, Validators.required],
      levantados: [estatistica.levantados, Validators.required],
      ressucitou: [estatistica.ressucitou, Validators.required],
      tempo: [estatistica.tempo, Validators.required],
    })
  }

  public resetForm():void{this.form.reset();}

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched}
  }

  public salvarPartida():void{
    this.isLoading = true;
    this.spiner.show();
    if(this.form.valid)
    {
      this.partida =  (this.modeSave === 'postPartida')
                      ? {... this.form.value}
                      : {id: this.partida.id,... this.form.value}

        this.partidaService[this.modeSave](this.partida).subscribe(
        (partidaRetorno: Partida) =>{
          this.toaster.success('Partida Salva com Sucesso', 'Sucesso!');
          this.router.navigate([`partidas/detalhes/${partidaRetorno.id}`])
        },
        (error: any) =>{
          console.error(error);
          this.toaster.error('Erro ao salvar a partida', 'Error');
        },
      ).add(() =>this.spiner.hide());
    }
    this.isLoading = false;
  }

  public salvarEstatisticas():void{
    this.spiner.show();
    if (this.form.controls['estatisticas'].valid){
      this.estatisticaService.saveEstatistica(this.partidaId, this.form.value.estatisticas).subscribe(
        () =>{
          this.toaster.success('Estatisticas salvos com Sucesso!', 'Sucesso!');
          //this.estatisticas.reset();
        },
        (error:any ) =>{
          this.toaster.error('Erro ao tentar Salvar as Estatisticas', 'Error!');
          console.error(error);
        }
      ).add(() => this.spiner.hide())
    }
  }

  public removerEstatistica(template : TemplateRef<any>, indice : number):void{

    this.estatisticaAtual.id = this.estatisticas.get(indice+'.id').value;
    this.estatisticaAtual.indice = indice;
    if(this.estatisticaAtual.id !== 0)
      this.modalRef = this.modalService.show(template, {class:'modal-sm'})
    else
      this.estatisticas.removeAt(this.estatisticaAtual.indice);
    
  }
  public confirm():void{
    this.modalRef.hide();
    this.spiner.show();

    this.estatisticaService.deleteEstatistica(this.partidaId, this.estatisticaAtual.id).subscribe(
      ()=>{
        this.toaster.success('Estatistica deletada com sucesso', 'Sucesso');
        this.estatisticas.removeAt(this.estatisticaAtual.indice);
      },
      (error: any)=>{
        this.toaster.error('Erro ao deletar a estatistica', 'Erro');
        console.error(error);
      }
    ).add(() => this.spiner.hide())
  }
  public decline():void{
    this.modalRef.hide();
  }
}