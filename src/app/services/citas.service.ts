import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CitaDTO } from '../dto/CitaDTO';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private url:string;

  constructor(private http:HttpClient) { 
    this.url = environment.apiUrl;
  }

  getCitas(){
    return this.http.get<CitaDTO[]>(this.url + '/citas');
  }

  addCita(cita:CitaDTO){
    let header = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post<CitaDTO>(this.url + '/citas', cita, {headers:header});
  }

  getCita(idCita){
    return this.http.get<CitaDTO>(this.url + '/citas/' + idCita);
  }

  deleteCita(idCita){
    return this.http.delete<CitaDTO>(this.url + '/citas/' + idCita);
  }
}
