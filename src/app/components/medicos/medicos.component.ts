import { Component, OnInit, HostListener, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MedicosService } from 'src/app/services/medicos.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MedicoDTO } from 'src/app/dto/MedicoDTO';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  medicos = [];
  dataSourceTablaMedicos = new MatTableDataSource<MedicoDTO>();
  dialogDetalles:boolean = false;
  idDialogDetalles:string = null;

  dialogUpdate:boolean = false;

  dialogDelete:boolean = false;

  @ViewChild('formDirectiveAddMedico') formDirectiveAddMedico:FormGroupDirective;
  @ViewChild('errorServidorAddMedico') errorServidorAddMedico:ElementRef;
  dialogCrear:boolean = false;
  idDialogCrear:string = null;

  heightDialog:number;
  witdhDialog:string;

  displayedColumns:string[] = ['id', 'Nombre', 'Tipo Identificación', 'Identificación', 'Opciones'];
  tipoIdentidades:string[] = ['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte', 'Registro Civil'];
  horasDisponibles:string[] = [];
  anteMeridiemInicio:string = '1';
  anteMeridiemFin:string = '3';

  addMedicoForm:FormGroup;
  updateMedicoForm:FormGroup;

  constructor(private dialogRef:MatDialogRef<MedicosComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private dialog:MatDialog,
    private medicosService:MedicosService,
    private formBuilder:FormBuilder)
  { }

  ngOnInit(): void {
    for(let i = 1; i < 12; i++){
      this.horasDisponibles.push(i.toString());
    }

    this.medicos = this.data.medicos;
    this.medicos.sort(this.ordenarMedicos);
    this.dataSourceTablaMedicos.data = this.medicos;

    this.heightDialog = window.innerHeight * 0.9;
    this.witdhDialog = String(window.innerWidth * 0.5) + 'px';

    this.addMedicoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      tipoIdentificacion: ['', [Validators.required]],
      identificacion: ['', [Validators.required, Validators.maxLength(255)]],
      numeroTarjetaProfesional: ['', [Validators.required, Validators.pattern('^([0-9]+-)*[0-9]+$')]],
      anosExperiencia: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      especialidad: ['', [Validators.required, Validators.maxLength(255)]],
      horaInicioAtencion: ['', [Validators.required]],
      horaFinAtencion: ['', [Validators.required]]
    });
  }

  ordenarMedicos(a, b){
    const A = a.id;
    const B = b.id;

    let comparison = 0;

    if(A > B){
      comparison = 1;
    }
    else if(A < B){
      comparison = -1;
    }
    return comparison;
  }

  @HostListener('window:resize', ['$event'])
  resizeDialog() {
    this.heightDialog = window.innerHeight * 0.9;
    this.witdhDialog = String(window.innerWidth * 0.5) + 'px';

    let heightDialog = String(window.innerHeight * 0.8);
    let witdhDialog = String(window.innerWidth * 0.7) + 'px';
    this.dialogRef.updateSize(witdhDialog, heightDialog);
  }

  getDetallesMedico(templateDetalles, idMedico){
    if(this.dialogDetalles == false){
      this.medicosService.getMedico(idMedico).subscribe(next =>{
        let dialogRef = this.dialog.open(templateDetalles, {data: {'medico': next}, width : this.witdhDialog, maxHeight: this.heightDialog, autoFocus: false});
        dialogRef.afterOpened().subscribe(() => {
          this.dialogDetalles = true;
          this.idDialogDetalles = dialogRef.id;
        });
        dialogRef.afterClosed().subscribe(result =>{
          this.dialogDetalles = false;
          this.idDialogDetalles = null;
        });
      });
    }
  }

  cerrarDetallesMedico(){
    let dialogRef = this.dialog.getDialogById(this.idDialogDetalles);
    dialogRef.close();
  }

  crearMedico(templateCrear){
    if(this.dialogCrear == false){
      let dialogRef = this.dialog.open(templateCrear, {width : this.witdhDialog, maxHeight: this.heightDialog, autoFocus: false});
      dialogRef.afterOpened().subscribe(() => {
        this.dialogCrear = true;
        this.idDialogCrear = dialogRef.id;
      });
      dialogRef.afterClosed().subscribe(result =>{
        this.dialogCrear = false;
        this.idDialogCrear = null;

        this.formDirectiveAddMedico.resetForm();
        this.addMedicoForm.reset();
        this.anteMeridiemInicio = '1';
        this.anteMeridiemFin = '3';
        this.hideError('crear');
        this.errorServidorAddMedico.nativeElement.style.color = '#ff4747';
      });
    }
  }

  submitCrearMedico(formDirective:FormGroupDirective){
    let horaInicioAtencion = this.horaInicioAtencion.value;
    let horaFinAtencion = this.horaFinAtencion.value;
    if(parseInt(horaInicioAtencion) < 10){
      horaInicioAtencion = '0' + horaInicioAtencion + ':00 ';
    }
    else{
      horaInicioAtencion = horaInicioAtencion + ':00 ';
    }
    if(parseInt(horaFinAtencion) < 10){
      horaFinAtencion = '0' + horaFinAtencion + ':00 ';
    }
    else{
      horaFinAtencion = horaFinAtencion + ':00 ';
    }
    if(this.anteMeridiemInicio == '1'){
      horaInicioAtencion = horaInicioAtencion + 'A.M';
    }
    else if(this.anteMeridiemInicio == '2'){
      horaInicioAtencion = horaInicioAtencion + 'P.M';
    }
    if(this.anteMeridiemFin == '3'){
      horaFinAtencion = horaFinAtencion + 'A.M';
    }
    else if(this.anteMeridiemFin == '4'){
      horaFinAtencion = horaFinAtencion + 'P.M';
    }
    let medicoDTO = new MedicoDTO(null, this.nombre.value, this.identificacion.value, this.tipoIdentificacion.value, this.numeroTarjetaProfesional.value, this.anosExperiencia.value, this.especialidad.value, horaInicioAtencion, horaFinAtencion);
    this.medicosService.addMedico(medicoDTO).subscribe({next: data => {
      this.medicos.push(data);
      this.medicos.sort(this.ordenarMedicos);
      this.dataSourceTablaMedicos.data = this.medicos;
      
      this.errorServidorAddMedico.nativeElement.innerHTML = 'Médico añadido al sistema';
      this.errorServidorAddMedico.nativeElement.style.display = 'block';
      this.errorServidorAddMedico.nativeElement.style.color = 'green';
      this.anteMeridiemInicio = '1';
      this.anteMeridiemFin = '3';
      formDirective.resetForm();
      this.addMedicoForm.reset();
    }, error: error =>{
      this.errorServidorAddMedico.nativeElement.innerHTML = error.error;
      this.errorServidorAddMedico.nativeElement.style.display = 'block';
      this.errorServidorAddMedico.nativeElement.style.color = '#ff4747';
      this.anteMeridiemInicio = '1';
      this.anteMeridiemFin = '3';
      formDirective.resetForm();
      this.addMedicoForm.reset();
    }});
  }

  cerrarCrearMedico(){
    let dialogRef = this.dialog.getDialogById(this.idDialogCrear);
    dialogRef.close();
  }

  hideError(tipo:string){
    if(tipo == 'crear'){
      this.errorServidorAddMedico.nativeElement.style.display = 'none';
    }
  }

  get nombre() { return this.addMedicoForm.get('nombre'); }
  get tipoIdentificacion() { return this.addMedicoForm.get('tipoIdentificacion'); }
  get identificacion() { return this.addMedicoForm.get('identificacion'); }
  get numeroTarjetaProfesional() { return this.addMedicoForm.get('numeroTarjetaProfesional'); }
  get anosExperiencia() { return this.addMedicoForm.get('anosExperiencia'); }
  get especialidad() { return this.addMedicoForm.get('especialidad'); }
  get horaInicioAtencion() { return this.addMedicoForm.get('horaInicioAtencion'); }
  get horaFinAtencion() { return this.addMedicoForm.get('horaFinAtencion'); }

  updateMedico(idMedico){
    console.log("Update " + idMedico);
  }

  borrarMedico(idMedico, index){
    console.log("Delete " + idMedico + " index en la lista: " + index);
  }

  cerrarDialogMedicos(){
    this.dialogRef.close();
  }

  ensayo(){
    console.log(this.tipoIdentificacion.value);
  }

}
