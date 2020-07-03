import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const routes = {
  editar: '/interno/actualizar'
};

@Injectable({
  providedIn: 'root'
})
export class EditarService {

  constructor(private apiService : ApiService) { }

  isValid(interno: any): any {
    const response = { ok: false, message: '' };

    if (interno === undefined || interno === null) {
      response.ok = false;
      response.message = 'interno es vacio';
      return response;
    }

     if (interno.nombresInterno === undefined || interno.nombresInterno === null || interno.nombresInterno.trim() === '') {
      return { ok: false, message: 'el nombre no puede ser vacio' };
    }

    if (interno.apellidosInterno === undefined || interno.apellidosInterno === null || interno.apellidosInterno.trim() === '') {
      return { ok: false, message: 'los apellidos no pueden ser vacio' };
    }

    
    return { ok: true, message: 'interno is a valid object.' };
  }

  update(interno: any) {
    const postInterno = {
      id : interno.id,
      run : interno.runInterno,
      nombre : interno.nombresInterno,
      apellidos : interno.apellidosInterno,
      idSexo : interno.sexoInterno,
      edad : interno.edadInterno,
      idRegion : interno.regionInterno,
      idUnidad : interno.unidadInterno
    };
    return this.apiService.put(routes.editar, postInterno);
  }


}
