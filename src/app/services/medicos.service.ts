import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MedicoDTO } from 'src/app/dto/MedicoDTO';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  
  private url:string;

  constructor(private http:HttpClient) { 
    this.url = environment.apiUrl;
  }

  getMedicos(){
    return this.http.get<MedicoDTO[]>(this.url + '/medicos');
  }

  addMedico(medico:MedicoDTO){
    let header = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post<MedicoDTO>(this.url + '/medicos', medico, {headers:header});
  }

  deleteMedico(idMedico){
    return this.http.delete<MedicoDTO>(this.url + '/medicos/' + idMedico);
  }

  getMedico(idMedico){
    return this.http.get<MedicoDTO>(this.url + '/medicos/' + idMedico);
  }

  getMedicoByIdentificacion(identificacionMedico){
    return this.http.get<MedicoDTO>(this.url + '/medicos?identificacion=' + identificacionMedico);
  }

  getHorasDisponibles(idMedico){
    return this.http.get<string[]>(this.url + '/medicos/' + idMedico + '/horas')
  }

  updateMedico(medico:MedicoDTO){
    let header = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.put<MedicoDTO>(this.url + '/medicos/' + medico.id, medico, {headers:header});
  }
}
