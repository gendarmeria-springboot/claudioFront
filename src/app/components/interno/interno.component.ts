import { Component, OnInit } from '@angular/core';
import { InternoService } from 'src/app/services/interno.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {Router, NavigationExtras} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-interno',
  templateUrl: './interno.component.html',
  styleUrls: ['./interno.component.css']
})
export class InternoComponent implements OnInit {
  constructor(private internoService: InternoService,
              private router: Router) { }
  curreninterno: any;
  items: any[];
  ngOnInit(): void {
    this.curreninterno = {};
    this.curreninterno.runInterno = '';
    this.curreninterno.apellidosInterno = '';
    this.curreninterno.nombresInterno = '';

  }
/*busquedarun
  buscar() {
    this.internoService.getByRun(this.curreninterno.runInterno)
      .pipe(
        catchError(err => {
          console.error(`este error se ejecuta antes del res del subscribe: ${err}`);
          return of([]);
        })
      )
      .subscribe(
        res => {
          if (res) {
            this.items = res;
          }

        },
        err => {
          console.error(`este error se ejecuta cuando http falla: ${err}`);
        });



  }*/

  buscar() {


    const validResult = this.internoService.isValid(this.curreninterno);

    if (!validResult.ok) {
      console.error(`Error: ${validResult.message}`);
      Swal.fire(
        'Cancelado',
        validResult.message,
        'error'
      )
      return;
    }

    this.internoService.getByApellidos(this.curreninterno.apellidosInterno)
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
            this.items = res;
          }

        },
        err => {
          console.error(`este error se ejecuta cuando http falla: ${err}`);
        });



  }

  agregar() {
    this.router.navigate(['agregar']);
    return;

  


  }

  editar(itemsInterno: any){
    
    //console.log (itemsInterno);
    let navigationExtras: NavigationExtras = {queryParams : itemsInterno};
    this.router.navigate(['editar'], navigationExtras);

  }
  
  eliminar(id : any){

    Swal.fire({
      title: 'Eliminar Registro',
      text: 'Se eliminará el registro, ¿Esta seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        console.log('id '+id);
        this.internoService.eliminar(id)
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
           // this.items = res;
           this.buscar();
          }

        },
        err => {
          console.error(`este error se ejecuta cuando http falla: ${err}`);
        });
        
        Swal.fire(
          
          'Registro Eliminado',
          'Se ha eliminado el registro',
          'success'

        )
      } /*else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Misión abortada',
          'error'
        )
      }*/
    })


  }
}
