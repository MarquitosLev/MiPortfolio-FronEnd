import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import {
  Storage,
  getDownloadURL,
  list,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  url: string = '';
  constructor(private storage: Storage) {}

  // PARA EL ACERCA DE MI
  public uploadImage($event: any, nombre: string) {
    const file = $event.target.files[0];

    const imgRef = ref(this.storage, `imagen/` + nombre);

    uploadBytes(imgRef, file)
      .then((response) => {
        this.getImagen();
      })
      .catch((error) => error);
  }

  // PARA EL ACERCA DE MI
  getImagen() {
    const imgRef = ref(this.storage, 'imagen');
    list(imgRef)
      .then(async (response) => {
        for (let i of response.items) {
          this.url = await getDownloadURL(i);
        }
      })
      .catch((error) => error);
  }

  // PARA LOS PROYECTOS
  public catchFile($event: any, nombre: string) {
    const file = $event.target.files[0];
    const refImg = ref(this.storage, 'imagenProyectos/' + nombre);

    uploadBytes(refImg, file)
      .then((respuesta) => {
        this.catchImagen(respuesta.metadata.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // PARA LOS PROYECTOS
  catchImagen(respuesta: string): string {
    const imgRef = ref(this.storage, 'imagenProyectos');
    list(imgRef)
      .then(async (response) => {
        for (let i of response.items) {
          if (i.name == respuesta) {
            this.url = await getDownloadURL(i);
          }
        }
      })
      .catch((error) => console.log(error));

    return this.url;
  }
}
