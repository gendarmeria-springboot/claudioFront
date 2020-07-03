import { Component, OnInit } from '@angular/core';
import { AgregarService } from 'src/app/services/agregar.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  constructor(private agregarService : AgregarService) { }
  itemsRegion: any[];
  agregarinterno: any;
  itemsUnidad: any[];
  tituloMensaje: any;
  mensaje: any;
  ngOnInit(): void {
    //itemsRegion: this.getRegiones;
    this.getRegiones();
    this.agregarinterno = {};
    this.agregarinterno.runInterno = '';
    this.agregarinterno.apellidosInterno = '';
    this.agregarinterno.nombresInterno = '';
    this.agregarinterno.edadInterno = '';
    this.agregarinterno.sexoInterno = '';
    this.agregarinterno.regionInterno = '';
    this.agregarinterno.unidadInterno = '';
    this.tituloMensaje = '';
    this.mensaje = '';
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
    //console.log(this.agregarinterno.regionInterno);
    this.agregarService.getUnidadesByRegion(this.agregarinterno.regionInterno)
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
    const validResult = this.agregarService.isValid(this.agregarinterno);

    if (!validResult.ok) {
      console.error(`Hey, there is an error: ${validResult.message}`);
      return;
    }

    this.agregarService.create(this.agregarinterno)
      .pipe(
        catchError(err => {
          console.error(`este error se ejecuta antes del res del subscribe: ${err}`);
          return of([]);
        })
      )
      .subscribe(
        res => {
          this.clearVar();
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
