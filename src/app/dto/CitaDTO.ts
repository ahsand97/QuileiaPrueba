import { MedicoDTO } from '../dto/MedicoDTO';
import { PacienteDTO } from '../dto/PacienteDTO';

export class CitaDTO {

    id:number;
    hora:string;
    medico:MedicoDTO;
    paciente:PacienteDTO;

    constructor(id, hora, medico, paciente){
        this.id = id;
        this.hora = hora;
        this.medico = medico;
        this.paciente = paciente;
    }
}