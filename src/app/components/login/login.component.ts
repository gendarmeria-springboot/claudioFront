import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLoginButton: boolean;

  constructor(private loginService: LoginService) { }
  currenlogin: any;
  //items: any[];

  ngOnInit() {
    this.showLoginButton = true;
    this.currenlogin = {};
    this.currenlogin.usuario = '';
    this.currenlogin.password = '';

  }
  /*login() {
    const validResult = this.loginService.isValid(this.currenlogin);

    if (!validResult.ok) {
      console.error(`Hey, there is an error: ${validResult.message}`);
      return;
    }

    this.loginService.login(this.currenlogin);
  }*/
  /*toggle() {
    this.showLoginButton = !this.showLoginButton;
  }
  showItems() {
    this.items = this.loginService.getItems();
    console.log(this.items);
  }*/
}
