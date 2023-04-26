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

  public uploadImage($event: any, nombre: string) {
    const file = $event.target.files[0];

    const imgRef = ref(this.storage, `imagen/` + nombre);

    uploadBytes(imgRef, file)
      .then((response) => {
        this.getImagen();
      })
      .catch((error) => error);
  }

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
}
