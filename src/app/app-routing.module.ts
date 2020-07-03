import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InternoComponent } from './components/interno/interno.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { EditarComponent } from './components/editar/editar.component';

const routes: Routes = [{ path: '', component: LoginComponent },
{ path: 'interno', component: InternoComponent },
{ path: 'agregar', component: AgregarComponent },
{ path: 'editar', component: EditarComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
