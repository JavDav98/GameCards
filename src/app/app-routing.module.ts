import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoingameComponent } from './components/joingame/joingame.component';
import { AjugarComponent } from './components/ajugar/ajugar.component';
import { MyperfilComponent } from './components/myperfil/myperfil.component';
import { NewpartidaComponent } from './components/newpartida/newpartida.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';

const routes: Routes = [
  {path: 'joingame', component: JoingameComponent},
  {path: 'iniciajuego/:id', component: AjugarComponent},
  {path: 'myperfil', component: MyperfilComponent},
  {path: 'partidanueva', component: NewpartidaComponent},
  {path: '', component: MyperfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
