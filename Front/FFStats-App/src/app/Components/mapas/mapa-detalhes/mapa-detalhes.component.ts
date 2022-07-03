import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Mapa } from '@app/Model/Mapa';
import { MapaService } from '@app/Services/mapa.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mapa-detalhes',
  templateUrl: './mapa-detalhes.component.html',
  styleUrls: ['./mapa-detalhes.component.scss']
})
export class MapaDetalhesComponent implements OnInit {
  form!:FormGroup;
  mapas={} as Mapa;
  modeSave = 'postMapa';

  get f():any{
     return this.form.controls;
  }

  constructor(private fb: FormBuilder,
              private router: ActivatedRoute,
              private mapaService: MapaService,
              private spiner: NgxSpinnerService,
              private toaster: ToastrService) { }
  public carregaDados():void{
    const dadosIdParam = this.router.snapshot.paramMap.get('id');

    if(dadosIdParam!== null)
    {
      this.spiner.show();
      this.modeSave = 'putMapa';
      this.mapaService.getMapaById(+dadosIdParam).subscribe({
        next:(mapa: Mapa)=>{
          this.mapas = {...mapa};
          this.form.patchValue(this.mapas);
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
  ngOnInit(): void {
    this.carregaDados();
    this.validation();
  }

  public validation():void{
    this.form = this.fb.group({
      mapaNome: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
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
      this.mapas =  (this.modeSave === 'postMapa')
                      ? {... this.form.value}
                      : {id: this.mapas.id,... this.form.value}

        this.mapaService[this.modeSave](this.mapas).subscribe(
        () =>this.toaster.success('Call Salva com Sucesso', 'Sucesso!'),
        (error: any) =>{
          console.error(error);
          this.toaster.error('Erro ao salvar a Call', 'Error');
        },

    ).add(() =>this.spiner.hide());

    }
  }
}
