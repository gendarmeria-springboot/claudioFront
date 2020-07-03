import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //showLoginButton: boolean;

  constructor(private loginService: LoginService,
              private router : Router,
              private spinner: NgxSpinnerService) { }
  currenlogin: any;
  //items: any[];

  ngOnInit() {
   /** spinner starts on init */
   this.spinner.show();
 
   setTimeout(() => {
     /** spinner ends after 5 seconds */
     this.spinner.hide();
   }, 5000);
   // this.showLoginButton = true;
    this.currenlogin = {};
    this.currenlogin.usuario = '';
    this.currenlogin.password = '';

  }
  login() {

    const validResult = this.loginService.isValid(this.currenlogin);

    if (!validResult.ok) {
      console.error(`Error: ${validResult.message}`);
      Swal.fire(
        'Cancelado',
        validResult.message,
        'error'
      )
      return;
    }

    this.router.navigate(['interno']);
                    return;

    /*this.loginService.getByLogin(this.currenlogin)
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
            //this.items = res;
          }

        },
        err => {
          console.error(`este error se ejecuta cuando http falla: ${err}`);
        });*/
  }
  /*toggle() {
    this.showLoginButton = !this.showLoginButton;
  }
  showItems() {
    this.items = this.loginService.getItems();
    console.log(this.items);
  }*/
}
