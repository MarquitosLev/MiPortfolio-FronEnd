import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../model/proyecto';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  URL = environment.URL + 'proyecto/';
  
  constructor(private http: HttpClient) {}

  public getProyecto(): Observable<Proyecto> {
    return this.http.get<Proyecto>(this.URL + 'find');
  }

  public lista(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.URL + 'lista');
  }

  public detail(id: number): Observable<Proyecto> {
    return this.http.get<Proyecto>(this.URL + `detail/${id}`);
  }

  public save(proyecto: Proyecto): Observable<any> {
    return this.http.post<any>(this.URL + 'create', proyecto);
  }

  public update(id: number, proyecto: Proyecto): Observable<any> {
    return this.http.put<any>(this.URL + `update/${id}`, proyecto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.URL + `delete/${id}`);
  }
}
