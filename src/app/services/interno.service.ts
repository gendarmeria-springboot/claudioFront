import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const routes = {
  insertar: 'interno/insertar',
  actualizar: 'interno/actualizar',
  eliminar: 'interno/eliminar',
  buscarId: 'interno/internoFindId',
  buscarApellidos: 'interno/internoFindApellidos',
  buscarRun: (runInterno: any) => `/interno/internoFindRun?run=${runInterno}`
};


@Injectable({
  providedIn: 'root'
})
export class InternoService {

  constructor(private apiService: ApiService) { }

  isValid(interno: any): any {
    const response = { ok: false, message: '' };

    if (interno === undefined || interno === null) {
      response.ok = false;
      response.message = 'login is null.';
      return response;
    }

    if (interno.runInterno === undefined || interno.runInterno === null || interno.runInterno.trim() === '') {
      return { ok: false, message: 'run interno is null.' };
    }

    /*if (interno.password === undefined || interno.password === null || interno.password.trim() === '') {
      return { ok: false, message: 'password is null.' };
    }*/

    return { ok: true, message: 'login is a valid object.' };
  }

  buscarRun(runInterno: any) {
     this.apiService.get(routes.buscarRun(runInterno))
     .pipe(
      catchError(err => {
        console.error(`este error se ejecuta antes del res del subscribe: ${err}`);
        return of([]);
      })
    )
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.error(`este error se ejecuta cuando http falla: ${err}`);
        });
  }

}
