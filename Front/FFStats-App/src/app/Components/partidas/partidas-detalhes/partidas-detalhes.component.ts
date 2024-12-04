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

  //Variaveis
  modalRef: BsModalRef;
  currentDate: Date = new Date; //Data atual, usado no datapicker
  partidaId :number;
  soTreino: string = '0';
  soMapa: string = '0';
  soCall: string = '0';
  soModo: string = '0';
  soSubModo: string = '0';
  isLoading = false;
  alteracsm = false;
  currentView: string = 'visualizar';
  txtmodo = 'Editar Estatistica'


  treino:Treino[] = [];
  mapas:Mapa[] = [];
  modos:Modo[] = [];
  smodos:Submodo[]=[];
  calls: Call[] = [];
  partida={} as Partida;
  formPartida!:FormGroup;
  modeSave = 'postPartida';

  callFiltradas: Call[] = [];
  subModoFiltrados: Submodo[] = [];
  mapaSelecionado: number | null = null;
  modoSelecionado: number | null = null;
  estatisticaAtual = {id:0, indice :0}
  //Configurações da pagina
  get f():any{return this.formPartida.controls;}
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
    private spiner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private modalService: BsModalService,
    private estatisticaService: EstatisticaService)
    {this.localeService.use('pt-br');}
    public cssValidator(campoForm: FormControl | AbstractControl): any {
      return {'is-invalid': campoForm.errors && campoForm.touched}
    }

    //Metodos de inicialização
  ngOnInit() {
    this.partidaService.viewMode$.subscribe((mode) => {
      this.currentView = mode;
    });
    this.getMapas();
    this.getModo();
    this.getTreinos();
    this.validation();
    this.carregaDados();
    this.formPartida.valueChanges.subscribe(valores => console.log('Valores do formulário:', valores));
  }
    
  public getMapas(): void{
      this.mapaService.getMapas().subscribe(
        (mapa: Mapa[]) =>{
          this.mapas = mapa;
        },
        (error: any)=>{
        },
      )
  }
  public getCalls():Call[]{
    this.callService.getCalls().subscribe(
      (call: Call[]) =>{
        this.callFiltradas =  call
      },
      (error: any)=>{
        return []
      }
    )
    return this.callFiltradas
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
  public getSubModo(): Submodo[]{
    this.submodoService.getSubModos().subscribe(
      (sm: Submodo[]) =>{
        this.subModoFiltrados = sm;
      },
      (error: any)=>{
        return []
      },
    )
    return this.subModoFiltrados
  }
  public getTreinos(): void{
    this.treinoService.getTreinos().subscribe(
      (treino: Treino[]) =>{
        this.treino = treino
      },
      (error: any)=>{},
    )
  }
  public validation():void{
    this.formPartida = this.fb.group({
      partidaDescricao: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
      partidaData: ['', [Validators.required]],
      posicao: ['',[Validators.required, Validators.min(1),Validators.max(55)]],
      treinoId:['',[Validators.required,]],
      mapaId:['',[Validators.required,]],
      callId:['',[Validators.required,]],
      modoId:['',[Validators.required,]],
      submodoId:['',[Validators.required,]]
    });
  }
  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  public async carregaDados(): Promise<void> {
    this.partidaId = +this.activatedRouter.snapshot.paramMap.get('id');
  
    if (this.partidaId !== null && this.partidaId > 0) {
      this.spiner.show();
      this.modeSave = 'putPartida';
  
      try {
        // Aguarda a partida ser carregada
        this.partida = await this.partidaService.getPartidaById(this.partidaId).toPromise();
        this.mapaSelecionado = this.partida.mapaId;
        this.modoSelecionado = this.partida.modoId;
  
        // Aguarda chamadas relacionadas
        const calls = await this.callService.getCalls().toPromise();
        const subModos = await this.submodoService.getSubModos().toPromise();
  
        // Filtra os dados
        this.calls = calls.filter(c => c.mapaId === this.partida.mapaId);
        this.smodos = subModos.filter(sm => sm.modoId === this.partida.modoId);
  
        // Atualiza o formulário
        this.partida.partidaData = new Date(this.partida.partidaData);
        this.formPartida.patchValue(this.partida);
      } catch (error) {
        console.error(error);
        this.toaster.error('Erro ao carregar dados', 'Erro!');
      } finally {
        this.spiner.hide();
      }
    }
  }
  get modoEditar(): boolean{
    return this.modeSave === 'putPartida'
  }
  //Metodos da pagina
  //Atualizações
  onSelecionaMapa(){
      this.mapaSelecionado = +this.soMapa; // Obtém o mapa selecionado do combobox
      this.calls = this.getCalls().filter(c => c.mapaId == this.mapaSelecionado)

  }
  onSelecionaModo(){
    this.modoSelecionado = +this.soModo;
    this.smodos = this.getSubModo().filter(sm => sm.modoId == this.modoSelecionado)
  }
  public getCallByMap(mapaId: number):void{
    this.callService.getCallByMapaId(mapaId).subscribe(
      (calls: Call[]) => {
        this.calls = calls; // Atualiza as opções do combobox
      },
      (error: any) => {
        console.error('Erro ao carregar as Calls', error);
      }
    );
  }

  getSubmodesByMode(mode: number | null): any[] {
    this.getSubModo();
    return this.smodos.filter(submode => submode != null && submode.modoId === mode);
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
  public resetForm():void{
    this.formPartida.reset();
  }
  //Salvamentos
  public salvarPartida():void{
    this.isLoading = true;
    this.spiner.show();
    if(this.formPartida.valid)
    {
      this.partida =  (this.modeSave === 'postPartida')
                      ? {... this.formPartida.value}
                      : {id: this.partida.id,... this.formPartida.value}

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
  public decline():void{
    this.modalRef.hide();
  }
  public alterarEstatistica():void{
    if(this.currentView ==='editar'){
      this.partidaService.setViewMode('visualizar');
    }
    else{
      this.partidaService.setViewMode('editar');

    }
  }
}