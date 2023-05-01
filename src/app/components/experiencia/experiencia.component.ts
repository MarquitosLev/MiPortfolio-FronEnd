import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/service/sexperiencia.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  expe: Experiencia[] = [];
  isLogged = false;

  constructor(
    private sExperiencia: SExperienciaService,
    private tokenS: TokenService
  ) {}

  ngOnInit(): void {
    this.cargarExperiencia();
    if (this.tokenS.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarExperiencia() {
    this.sExperiencia.lista().subscribe((data) => {
      this.expe = data;
    });
  }

  delete(id?: number) {
    if (id != undefined) {
      this.sExperiencia.delete(id).subscribe(
        (data) => {
          this.cargarExperiencia();
        },
        (err) => {
          alert('No se pudo borrar la experiencia');
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
    const experiencia = [...this.expe];
    const [movedItem] = experiencia.splice(previousIndex, 1);
    experiencia.splice(index, 0, movedItem);
    this.expe = experiencia;
  }

  onDragOver(event: DragEvent) {
    if(!this.isLogged)
      return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }
}
