import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/model/educacion';
import { SeducacionService } from 'src/app/service/seducacion.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  educ: Educacion[] = [];
  isLogged = false;

  constructor(private sEduc: SeducacionService, private tokenS: TokenService) {}

  ngOnInit(): void {
    this.cargarEducacion();
    if (this.tokenS.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarEducacion() {
    this.sEduc.lista().subscribe((data) => {
      this.educ = data;
    });
  }

  delete(id?: number) {
    if (id != undefined) {
      this.sEduc.delete(id).subscribe(
        (data) => {
          this.cargarEducacion();
        },
        (err) => {
          alert('No se pudo borrar la experiencia');
        }
      );
    }
  }

  // METODOS PARA EL DRAG AND DROP

  onDragStart(event: DragEvent, index: number) {
    if (!this.isLogged) return;
    event.dataTransfer.setData('index', index.toString());
  }

  onDrop(event: DragEvent, index: number) {
    if (!this.isLogged) return;
    const previousIndex = parseInt(event.dataTransfer.getData('index'));
    const educacion = [...this.educ];
    const [movedItem] = educacion.splice(previousIndex, 1);
    educacion.splice(index, 0, movedItem);
    this.educ = educacion;
  }

  onDragOver(event: DragEvent) {
    if (!this.isLogged) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }
}
