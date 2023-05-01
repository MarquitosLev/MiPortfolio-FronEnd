import { Component } from '@angular/core';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent {
  proyecto: Proyecto[] = null;
  isLogged = false;

  constructor(
    public sProyecto: ProyectoService,
    private tokenS: TokenService
  ) {}

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

  delete(id: number) {
    if (id != undefined) {
      this.sProyecto.delete(id).subscribe(
        (data) => {
          this.cargarProyecto();
        },
        (err) => {
          alert('No se pudo borrar la skill');
        }
      );
    }
  }

  // METODOS PARA EL DRAG AND DROP

  onDragStart(event: DragEvent, index: number) {
    if(!this.isLogged)
      return;
    event.dataTransfer.setData('index', index.toString());
  }

  onDrop(event: DragEvent, index: number) {
    if(!this.isLogged)
      return;
    const previousIndex = parseInt(event.dataTransfer.getData('index'));
    const proyectos = [...this.proyecto];
    const [movedItem] = proyectos.splice(previousIndex, 1);
    proyectos.splice(index, 0, movedItem);
    this.proyecto = proyectos;
  }

  onDragOver(event: DragEvent) {
    if(!this.isLogged)
      return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }
}
