import { JogadorService } from '@app/Services/jogador.service';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Estatistica } from '@app/Model/Estatistica';
import { EstatisticaService } from '@app/Services/estatistica.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Jogador } from '@app/Model/Jogador';
import { ActivatedRoute } from '@angular/router';
import { PartidaService } from '@app/Services/partida.service';

@Component({
  selector: 'app-estatistica-editar',
  templateUrl: './estatistica-editar.component.html',
  styleUrls: ['./estatistica-editar.component.scss']
})
export class EstatisticaEditarComponent implements OnInit {
  @Input() modo!: string;
  formEstatistica!:FormGroup;
  estatisticaAtual = {id:0, indice :0}
  modalRef: BsModalRef;
  template: TemplateRef<any>;
  maxFormsEstatistica = 4;
  partidaId : number = +this.activatedRouter.snapshot.paramMap.get('id');
  jogador: Jogador[];
  stats: Estatistica[];
  modeSave = 'postPartida'

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private estatisticaService: EstatisticaService,
    private spiner: NgxSpinnerService,
    private toaster: ToastrService,
    private jogadorService: JogadorService,
    private activatedRouter: ActivatedRoute,
    private partidaService: PartidaService,
  ) { }
  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched}
  }
  

  get e():any{return this.formEstatistica.controls}

  ngOnInit() {
    this.formEstatistica = this.fb.group({
      estatisticas: this.fb.array([]) // Inicializa um FormArray vazio
    });
    this.getJogadores();
    this.carregaDados();
  }

  public async carregaDados(): Promise<void> {
    this.partidaId = +this.activatedRouter.snapshot.paramMap.get('id');
  
    if (this.partidaId !== null && this.partidaId > 0) {
      this.spiner.show();
      this.modeSave = 'putPartida';
  
      try {
        // Aguarda a partida ser carregada
        this.stats = await this.estatisticaService.getEstatisticasByPartidaId(this.partidaId).toPromise();
        this.stats.forEach(estatistica => {
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

  public getJogadores(): void{
    this.jogadorService.getJogadores().subscribe(
      (jg: Jogador[]) =>{
        this.jogador = jg
      },
      (error:any)=>{

      },
    )
  }
  get modoEditar(): boolean{
    return this.modeSave === 'putPartida'
  }
  get estatisticas(): FormArray{
    return this.formEstatistica.get('estatisticas') as FormArray;
  }
  public removerEstatistica(template : TemplateRef<any>, indice : number):void{

    this.estatisticaAtual.id = this.estatisticas.get(indice+'.id').value;
    this.estatisticaAtual.indice = indice;
    if(this.estatisticaAtual.id !== 0)
      this.modalRef = this.modalService.show(template, {class:'modal-sm'})
    else
      this.estatisticas.removeAt(this.estatisticaAtual.indice);
    
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
  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  buttonAdicionarDisabled(): boolean{
    return this.estatisticas.length < this.maxFormsEstatistica
  }
  adicionarEstatisticas(): void{
    if (this.estatisticas.length < this.maxFormsEstatistica)
      this.estatisticas.push(this.criarEstatisticas({id : 0} as Estatistica));
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
  public salvarEstatisticas():void{
    this.spiner.show();
    if (this.formEstatistica.controls['estatisticas'].valid){
      this.formEstatistica.value.estatisticas.forEach(estatistica => {
        estatistica.tempo = this.converteToSeconds(estatistica.tempo);
      });
      this.estatisticaService.saveEstatistica(this.partidaId, this.formEstatistica.value.estatisticas).subscribe(
        (estatisticasSalvas) =>{
          this.toaster.success('Estatisticas salvos com Sucesso!', 'Sucesso!');
          this.partidaService.updateStats(estatisticasSalvas)
        },
        (error:any ) =>{
          this.toaster.error('Erro ao tentar Salvar as Estatisticas', 'Error!');
          console.error(error);
        }
      ).add(() => this.spiner.hide())
      this.partidaService.setViewMode('visualizar');
    }
    
  }
  converteToSeconds(time: string): number {
    const [minutes, seconds] = time.split(':').map(Number);
    return (minutes * 60) + seconds;
  }

}
