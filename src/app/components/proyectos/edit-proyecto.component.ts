import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css'],
})
export class EditProyectoComponent {
  proy: Proyecto = null;

  constructor(
    public imagS: ImageService,
    private proyectoS: ProyectoService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyectoS.detail(id).subscribe(
      (data) => {
        this.proy = data;
      },
      (err) => {
        alert('Error');
        this.router.navigate(['']);
      }
    );
  }

  onUpdate() {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proy.imagen = this.imagS.catchImagen('proyecto_' + this.proy.nombre)
    this.proyectoS.update(id, this.proy).subscribe(
      (data) => {
        this.router.navigate(['']);
      },
      (err) => {
        alert('Errores al modificar proyecto');
        this.router.navigate(['']);
      }
    );
  }

  catchFile(event: any) {
    const nombre = 'proyecto_' + this.proy.nombre;
    this.imagS.catchFile(event, nombre);
  }
}
