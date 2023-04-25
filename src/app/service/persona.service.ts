import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  // comentar luego
  URL = "https://backend-portfolio-o88p.onrender.com/persona/";
  
  // Base del url para luego concatenarlo 
  
  // URL = environment.URL + "persona/"

  constructor(private http: HttpClient) { }

  public getPersona(): Observable<persona> {
    return this.http.get<persona>(this.URL+'find');
  }

  public lista(): Observable<persona[]>{
    return this.http.get<persona[]>(this.URL + 'lista');
  }

  public detail(id: number): Observable<persona>{
    return this.http.get<persona>(this.URL + `detail/${id}`);
  }

  public save(persona: persona): Observable<any>{
    return this.http.post<any>(this.URL + 'create', persona);
  }

  public update(id: number, persona: persona): Observable<any>{
    return this.http.put<any>(this.URL + `update/${id}`, persona);
  }

  public delete(id: number): Observable<any>{
    return this.http.delete<any>(this.URL + `delete/${id}`);
  }
}
