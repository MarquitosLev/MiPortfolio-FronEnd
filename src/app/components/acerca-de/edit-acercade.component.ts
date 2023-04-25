import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { persona } from 'src/app/model/persona.model';
import { ImageService } from 'src/app/service/image.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-edit-acercade',
  templateUrl: './edit-acercade.component.html',
  styleUrls: ['./edit-acercade.component.css'],
})
export class EditAcercadeComponent {
  persona: persona = null;

  constructor(
    public imageS: ImageService,
    private persS: PersonaService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.activatedRouter.snapshot.params['id'];
    this.persS.detail(id).subscribe(
      (data) => {
        this.persona = data;
      },
      (err) => {
        alert('Error');
        this.router.navigate(['']);
      }
    );
  }

  onUpdate() {
    const id = this.activatedRouter.snapshot.params['id'];
    this.persS.update(id, this.persona).subscribe(
      (data) => {
        this.router.navigate(['']);
      },
      (err) => {
        alert('Errores al modificar');
        this.router.navigate(['']);
      }
    );
  }

  // changeImg($event: any) {
  //   const id = this.activatedRouter.snapshot.params['id'];
  //   const nombre = "foto_"+id;
  //   this.imageS.changeImg($event, nombre);
  // }
}
