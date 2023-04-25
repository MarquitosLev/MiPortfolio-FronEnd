import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NuevoUsuario } from '../model/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';
import { LoginUsuario } from '../model/login-usuario';
import { JwtDto } from '../model/jwt-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URL: 'https://backend-portfolio-o88p.onrender.com',
  // TestURL: 'http://localhost:8080'
  // Url del entorno de prueba
  authURL = 'https://backend-portfolio-o88p.onrender.com/auth/';

  // Url del entorno de produccion
  //authURL = environment.URL + "auth/";

  constructor(private httpClient: HttpClient) {}

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario);
  }
}