import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InternoComponent } from './components/interno/interno.component';

const routes: Routes = [{ path: '', component: LoginComponent },
{ path: 'interno', component: InternoComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
