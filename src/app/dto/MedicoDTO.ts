export class MedicoDTO {

    id:number;
    nombre:string;
    identificacion:string;
    tipoIdentificacion:string;
    numeroTarjetaProfesional:string;
    anosExperiencia:number;
    especialidad:string;
    horaInicioAtencion:string;
    horaFinAtencion:string;

    constructor(id, nombre, identificacion, tipoIdentificacion, numeroTarjetaProfesional, anosExperiencia, especialidad, horaInicioAtencion, horaFinAtencion){
        this.id = id;
        this.nombre = nombre;
        this.identificacion = identificacion;
        this.tipoIdentificacion = tipoIdentificacion;
        this.numeroTarjetaProfesional = numeroTarjetaProfesional;
        this.anosExperiencia = anosExperiencia;
        this.especialidad = especialidad;
        this.horaInicioAtencion = horaInicioAtencion;
        this.horaFinAtencion = horaFinAtencion;
    }
}