import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import { AgregarService } from 'src/app/services/agregar.service';
import { EditarService } from 'src/app/services/editar.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  constructor(private param:ActivatedRoute,
              private agregarService: AgregarService,
              private editarService: EditarService) { }
  interno: any;
  editarinterno: any;
  itemsRegion: any[];
  agregarinterno: any;
  itemsUnidad: any[];
  tituloMensaje: any;
  mensaje: any;
  ngOnInit(): void {
    this.param.queryParams
              .subscribe((params) =>{
                this.interno = params;
                console.log("interno:" + JSON.stringify(this.interno));
              })
              this.getRegiones();
              
    this.editarinterno = {};
    this.editarinterno.id = this.interno.id;
    this.editarinterno.runInterno = this.interno.run;
    this.editarinterno.apellidosInterno = this.interno.apellidos;
    this.editarinterno.nombresInterno = this.interno.nombre;
    this.editarinterno.edadInterno = this.interno.edad;
    this.editarinterno.sexoInterno = this.interno.idSexo;
    this.editarinterno.regionInterno = this.interno.idRegion;
    this.editarinterno.unidadInterno = this.interno.idUnidad;
    this.tituloMensaje = '';
    this.mensaje = '';
    this.getUnidadesByRegion(); 
  }

  getRegiones() {

    this.agregarService.getRegiones()
      .pipe(
        catchError(err => {
          console.error(`este error se ejecuta antes del res del subscribe: ${err}`);
          return of([]);
        })
      )
      .subscribe(
        res => {
          if (res) {
            console.log(res);
            this.itemsRegion = res;
          }

        },
        err => {
          console.error(`este error se ejecuta cuando http falla: ${err}`);
        });



  }

  getUnidadesByRegion() {
    console.log(this.editarinterno.regionInterno);
    this.agregarService.getUnidadesByRegion(this.editarinterno.regionInterno)
      .pipe(
        catchError(err => {
          console.error(`este error se ejecuta antes del res del subscribe: ${err}`);
          return of([]);
        })
      )
      .subscribe(
        res => {
          if (res) {
            console.log(res);
            this.itemsUnidad = res;
          }

        },
        err => {
          console.error(`este error se ejecuta cuando http falla: ${err}`);
        });



  }


  agregar() {
    const validResult = this.editarService.isValid(this.editarinterno);

    if (!validResult.ok) {
      console.error(`Hey, there is an error: ${validResult.message}`);
      return;
    }

    this.editarService.update(this.editarinterno)
      .pipe(
        catchError(err => {
          console.error(`este error se ejecuta antes del res del subscribe: ${err}`);
          return of([]);
        })
      )
      .subscribe(
        res => {
          //this.clearVar();
          this.tituloMensaje = "OK"
          this.mensaje = "Interno Agregado"
          //this.open(this.modal);
          console.log(res);
        },
        err => {
          console.error(`este error se ejecuta cuando http falla: ${err}`);
        });
  }

  clearVar() {
    this.agregarinterno.runInterno = '';
    this.agregarinterno.apellidosInterno = '';
    this.agregarinterno.nombresInterno = '';
    this.agregarinterno.edadInterno = '';
    this.agregarinterno.sexonterno = '';
    this.agregarinterno.regionInterno = '';
    this.agregarinterno.unidadInterno = '';
  }

}
