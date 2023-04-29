import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css'],
})
export class NewProyectoComponent {
  nombre: string;
  descripcion: string;
  imagen: string;
  url: string;

  constructor(
    private proyectoS: ProyectoService,
    private router: Router,
    private imageService: ImageService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onCreate(): void {
    const proyecto = new Proyecto(
      this.nombre,
      this.descripcion,
      this.imageService.catchImagen('proyecto_' + this.nombre),
      this.url
    );
    this.proyectoS.save(proyecto).subscribe(
      (data) => {
        alert('Proyecto añadido correctamente');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Ya existe o hubo un fallo en proyecto');
        this.router.navigate(['']);
      }
    );
  }

  catchFile(event: any) {
    const nombre = 'proyecto_' + this.nombre;
    this.imageService.catchFile(event, nombre);
  }
}
