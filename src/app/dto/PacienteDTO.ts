export class PacienteDTO{

    id:number;
    nombre:string;
    identificacion:string;
    tipoIdentificacion:string;
    fechaNacimiento:Date;
    eps:string;
    historiaClinica:string;

    constructor(id, nombre, identificacion, tipoIdentificacion, fechaNacimiento, eps, historiaClinica){
        this.id = id;
        this.nombre = nombre;
        this.identificacion = identificacion;
        this.tipoIdentificacion = tipoIdentificacion;
        this.fechaNacimiento = fechaNacimiento;
        this.eps = eps;
        this.historiaClinica = historiaClinica;
    }
}