export class Proyecto {
    id?: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    url: string;

    constructor(nombre: string, descripcion: string, img: string, url: string){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = img;
        this.url = url;
    }
}
