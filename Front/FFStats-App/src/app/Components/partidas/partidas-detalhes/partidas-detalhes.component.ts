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
  maxFormsEstatistica = 4; //Variavel de controle de quantodade de estatisticas
  partidaId :number;
  soTreino: string = '0';
  soMapa: string = '0';
  soCall: string = '0';
  soModo: string = '0';
  soSubModo: string = '0';
  soJogador : string ='0';
  isLoading = false;
  alteracsm = false;


  treino:Treino[] = [];
  mapas:Mapa[] = [];
  modos:Modo[] = [];
  smodos:Submodo[]=[];
  calls: Call[] = [];
  jogador: Jogador[] = [];
  partida={} as Partida;
  formPartida!:FormGroup;
  formEstatistica!:FormGroup;
  modeSave = 'postPartida';

  callFiltradas: Call[] = [];
  subModoFiltrados: Submodo[] = [];
  mapaSelecionado: number | null = null;
  modoSelecionado: number | null = null;
  estatisticaAtual = {id:0, indice :0}
  //Configurações da pagina
  get f():any{return this.formPartida.controls;}
  get e():any{return this.formEstatistica.controls}
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
    public cssValidator(campoForm: FormControl | AbstractControl): any {
      return {'is-invalid': campoForm.errors && campoForm.touched}
    }

    //Metodos de inicialização
  ngOnInit() {
    // Chamadas que podem ser feitas imediatamente
    this.getMapas();
    //this.getCall();
    this.getModo();
    //this.getSubModo();
    this.getJogadores();
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
  public getJogadores(): void{
    this.jogadorService.getJogadores().subscribe(
      (jg: Jogador[]) =>{
        this.jogador = jg
      },
      (error:any)=>{

      },
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
    this.formEstatistica = this.fb.group({
      estatisticas: this.fb.array([]),
      tempo: ['', [Validators.required, Validators.pattern('^[0-5][0-9]:[0-5][0-9]$')]] 
    });
  }
  onTempoInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
  
    if (value.length > 2) {
      value = `${value.substring(0, 2)}:${value.substring(2, 4)}`;
    }
  
    input.value = value; // Atualiza o valor no input
    this.formEstatistica.get('tempo')?.setValue(value); // Atualiza o FormControl
  }
  converteToTime(seconds: string): string {
    const minutes = Math.floor(parseInt(seconds) / 60);
    const remainingSeconds = parseInt(seconds) % 60;
    return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
  }
  converteToSeconds(time: string): number {
    const [minutes, seconds] = time.split(':').map(Number);
    return (minutes * 60) + seconds;
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
  
        // Carrega estatísticas
        this.partida.estatisticas.forEach(estatistica => {
          estatistica.tempo = this.converteToTime(estatistica.tempo);
          this.estatisticas.push(this.criarEstatisticas(estatistica));
        });
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
  get estatisticas(): FormArray{
    return this.formEstatistica.get('estatisticas') as FormArray;
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
  //Estatisticas
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
  public resetForm():void{
    this.formPartida.reset();
  }
  public removerEstatistica(template : TemplateRef<any>, indice : number):void{

    this.estatisticaAtual.id = this.estatisticas.get(indice+'.id').value;
    this.estatisticaAtual.indice = indice;
    if(this.estatisticaAtual.id !== 0)
      this.modalRef = this.modalService.show(template, {class:'modal-sm'})
    else
      this.estatisticas.removeAt(this.estatisticaAtual.indice);
    
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
  public salvarEstatisticas():void{
    this.spiner.show();
    if (this.formEstatistica.controls['estatisticas'].valid){
      this.formEstatistica.value.estatisticas.forEach(estatistica => {
        estatistica.tempo = this.converteToSeconds(estatistica.tempo);
      });
      this.estatisticaService.saveEstatistica(this.partidaId, this.formEstatistica.value.estatisticas).subscribe(
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
  //Modal
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