import { Injectable } from '@angular/core';
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
  Url: string = '';
  constructor(private storage: Storage) {}

  public changeImg($event: any, nombre: string) {
    // consigue el file con sus datos
    const file = $event.target.files[0];

    const imgRef = ref(this.storage, `image/` + nombre);

    uploadBytes(imgRef, file)
      .then((res) => {
        this.getImage();
      })
      .catch((error) => 'error con upload');
  }

  getImage(){
    // const imgRef = ref(this.storage, `images`);
    // list(imgRef).then(async resp => {
    //   for (let i of resp.items){
    //     this.Url = await getDownloadURL(i);
    //   }
    // }).catch(error => "error con getImage")
  }
}
