import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const routes = {
  login: 'http://serviciosgenchi.gendarmeria.gob.cl/ServiciosLDAP/ldapAuth/autenticar365?usuario=',
  profile: 'auth/profile',
  //getldap: (currenlogin: any) => `http://serviciosgenchi.gendarmeria.gob.cl/ServiciosLDAP/ldapAuth/autenticar365?usuario=${currenlogin.usuario}&pass=${currenlogin.password}`
  //getldap: (currenlogin: any) => `http://serviciosgenchi.gendarmeria.gob.cl/ServiciosLDAP/ldapAuth/autenticar365?usuario=claudio.galleguillos&pass=
};
@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private apiService: ApiService) { }

  isValid(login: any): any {
    const response = { ok: false, message: '' };

    if (login === undefined || login === null) {
      response.ok = false;
      response.message = 'Usuario y Password No deben ser vacio';
      return response;
    }

    if (login.usuario === undefined || login.usuario === null || login.usuario.trim() === '') {
      return { ok: false, message: 'Usuario No debe ser vacio' };
    }

    if (login.password === undefined || login.password === null || login.password.trim() === '') {
      return { ok: false, message: 'Password No debe ser vacio' };
    }

    return { ok: true, message: 'login is a valid object.' };
  }


  getByLogin(currenlogin: any) {
    return this.apiService.getldap(routes.getldap((currenlogin)))
  }
  /*getItems(): any[] {
    return [{ id: 1, name: 'my name is 1' },
    { id: 2, name: 'my name is 2' },
    { id: 3, name: 'my name is 3' }];
  }*/

    /*login(login: any) {
    const postLogin = routes.login+login.usuario+'pass='+login.password;
    this.apiService.ldap(postLogin)
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
  }*/
}
