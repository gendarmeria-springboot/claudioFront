import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const routes = {
  insertar: 'interno/insertar',
  actualizar: 'interno/actualizar',
  eliminar: (id: any) => `/interno/eliminar?id=${id}`,
  buscarId: 'interno/internoFindId',
  buscarApellidos: (apellidosInterno: any) => `/interno/internoFindApellidos?apellidos=${apellidosInterno}`,
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
      response.message = 'Apellidos no deben ser vacios para la busqueda.';
      return response;
    }

    if (interno.apellidosInterno === undefined || interno.apellidosInterno === null || interno.apellidosInterno.trim() === '') {
      return { ok: false, message: 'Apellidos no deben ser vacios para la busqueda.' };
    }

 

    return { ok: true, message: 'interno is a valid object.' };
  }

  

  getByRun(runInterno: any) {
    return this.apiService.get(routes.buscarRun((runInterno)))
  }

  getByApellidos(apellidosInterno: any) {
    return this.apiService.get(routes.buscarApellidos((apellidosInterno)))
  }

  eliminar(id: any) {
    return this.apiService.delete(routes.eliminar((id)))
  }

}
