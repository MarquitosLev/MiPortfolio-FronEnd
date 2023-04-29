import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewExperienciaComponent } from './components/experiencia/new-experiencia.component';
import { EditExpeComponent } from './components/experiencia/edit-expe.component';
import { NeweducComponent } from './components/educacion/neweduc.component';
import { EditeducComponent } from './components/educacion/editeduc.component';
import { NewhardysoftComponent } from './components/hardysoft/newhardysoft.component';
import { EdithardysoftComponent } from './components/hardysoft/edithardysoft.component';
import { EditAcercadeComponent } from './components/acerca-de/edit-acercade.component';
import { NewProyectoComponent } from './components/proyectos/new-proyecto.component';
import { EditProyectoComponent } from './components/proyectos/edit-proyecto.component';

const routes: Routes = [
  // Paths para login y pantalla principal
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nuevaexp', component: NewExperienciaComponent },
  { path: 'editexp/:id', component: EditExpeComponent },
  { path: 'newedu', component: NeweducComponent },
  { path: 'editedu/:id', component: EditeducComponent },
  { path: 'newhys', component: NewhardysoftComponent },
  { path: 'edithys/:id', component: EdithardysoftComponent },
  { path: 'editaboutme/:id', component: EditAcercadeComponent },
  { path: 'newproyecto', component: NewProyectoComponent },
  { path: 'editproyecto/:id', component: EditProyectoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
