import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Call } from '@app/Model/Call';
import { Mapa } from '@app/Model/Mapa';
import { CallService } from '@app/Services/call.service';
import { MapaService } from '@app/Services/mapa.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-call-detalhes',
  templateUrl: './call-detalhes.component.html',
  styleUrls: ['./call-detalhes.component.scss']
})
export class CallDetalhesComponent implements OnInit {

  mapas:Mapa[] = [];
  form!:FormGroup;
  calls ={} as Call;
  modeSave = 'postCall';
  isLoading = false;

  get f():any{return this.form.controls;}

  constructor(private fb: FormBuilder,
    private router: ActivatedRoute,
    private mapaService: MapaService,
    private callService: CallService,
    private spiner: NgxSpinnerService,
    private toaster: ToastrService) { }

  public carregaDados():void{
    const dadosIdParam = this.router.snapshot.paramMap.get('id');

    if(dadosIdParam!== null)
    {
      this.spiner.show();

      this.modeSave = 'putCall';

      this.callService.getCallById(+dadosIdParam).subscribe(
        (call: Call)=>{
          this.calls = {...call};
          this.form.patchValue(this.calls);
        },
        ()=>{
          console.error(Error);
          this.toaster.error('Erro ao carregar a call', 'Erro!')
          this.spiner.hide();
        },
      ).add(()=>{ this.spiner.hide();});
    }
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

  ngOnInit(): void {
    this.getMapas();
    this.carregaDados();
    this.validation();
  }

  public validation():void{
    this.form = this.fb.group({
      callCidade: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(25)]],
      mapaId:['',[Validators.required,]],
    });
  }
  public resetForm():void{this.form.reset();}

  public salvarAlteracao():void{
    this.isLoading = true;
    this.spiner.show();
    if(this.form.valid)
    {
      this.calls =  (this.modeSave === 'postCall')
                      ? {... this.form.value}
                      : {id: this.calls.id,... this.form.value}

        this.callService[this.modeSave](this.calls).subscribe(
        () =>this.toaster.success('Call Salva com Sucesso', 'Sucesso!'),
        (error: any) =>{
          console.error(error);
          this.toaster.error('Erro ao salvar a Call', 'Error');
        },

      ).add(() =>this.spiner.hide());
    }
    this.isLoading = false;
  }
}
