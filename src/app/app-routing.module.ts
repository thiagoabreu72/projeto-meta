import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputComponent } from './input/input.component';
import { ParametrosComponent } from './parametros/parametros.component';

const routes: Routes = [
  { path: '', component: InputComponent },
  { path: 'lancamentos', component: InputComponent },
  { path: 'parametros', component: ParametrosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
