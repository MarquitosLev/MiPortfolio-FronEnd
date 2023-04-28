import { Component } from '@angular/core';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  proyecto: Proyecto[] = null;
  isLogged = false;

  constructor(public sProyecto: ProyectoService, private tokenS: TokenService){}

  ngOnInit(): void {
    this.cargarProyecto();
    if (this.tokenS.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarProyecto() {
    this.sProyecto.lista().subscribe((data) => {
      this.proyecto = data;
    });
  }

  delete(id: number){
    if(id != undefined){
      this.sProyecto.delete(id).subscribe(
        data => {
          this.cargarProyecto();
        }, err => {
          alert("No se pudo borrar la skill");
        }
      )
    }
  }
}
