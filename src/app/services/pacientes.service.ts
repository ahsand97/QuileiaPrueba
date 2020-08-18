import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PacienteDTO } from 'src/app/dto/PacienteDTO';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private url:string;

  constructor(private http:HttpClient) { 
    this.url = environment.apiUrl;
  }

  getPacientes(){
    return this.http.get<PacienteDTO[]>(this.url + '/pacientes');
  }

  addPaciente(paciente:PacienteDTO){
    let header = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post<PacienteDTO>(this.url + '/pacientes', paciente, {headers:header});
  }

  deletePaciente(idPaciente){
    return this.http.delete<PacienteDTO>(this.url + '/pacientes/' + idPaciente);
  }

  getPaciente(idPaciente){
    return this.http.get<PacienteDTO>(this.url + '/pacientes/' + idPaciente);
  }

  getPacienteByIdentificacion(identificacionPaciente){
    return this.http.get<PacienteDTO>(this.url + '/pacientes?identificacion=' + identificacionPaciente);
  }

  updatePaciente(paciente:PacienteDTO){
    let header = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.put<PacienteDTO>(this.url + '/pacientes/' + paciente.id, paciente, {headers:header});
  }
}
