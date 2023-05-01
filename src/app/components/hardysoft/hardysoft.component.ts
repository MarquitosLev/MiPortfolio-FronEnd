import { Component } from '@angular/core';
import { Hardysoft } from 'src/app/model/hardysoft';
import { ShardysoftService } from 'src/app/service/shardysoft.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-hardysoft',
  templateUrl: './hardysoft.component.html',
  styleUrls: ['./hardysoft.component.css'],
})
export class HardysoftComponent {
  hys: Hardysoft[] = [];
  isLogged = false;

  constructor(private sHys: ShardysoftService, private tokenS: TokenService) {}

  ngOnInit(): void {
    this.cargarHys();
    if (this.tokenS.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarHys() {
    this.sHys.lista().subscribe((data) => {
      this.hys = data;
    });
  }

  delete(id?: number) {
    if (id != undefined) {
      this.sHys.delete(id).subscribe(
        (data) => {
          this.cargarHys();
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
    const hys = [...this.hys];
    const [movedItem] = hys.splice(previousIndex, 1);
    hys.splice(index, 0, movedItem);
    this.hys = hys;
  }

  onDragOver(event: DragEvent) {
    if (!this.isLogged) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }
}
