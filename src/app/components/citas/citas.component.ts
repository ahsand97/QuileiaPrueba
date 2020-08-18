import { Component, OnInit, HostListener, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CitaDTO } from 'src/app/dto/CitaDTO';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroupDirective, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CitasService } from 'src/app/services/citas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicoDTO } from 'src/app/dto/MedicoDTO';
import { PacienteDTO } from 'src/app/dto/PacienteDTO';
import { MedicosService } from 'src/app/services/medicos.service';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  citas= [];
  dataSourceTablaCitas = new MatTableDataSource<CitaDTO>();
  displayedColumns:string[] = ['id', 'Médico', 'Paciente', 'Hora', 'Opciones'];
  dateToday = new Date();

  //MatDialog Detalles
  dialogDetalles:boolean = false;
  idDialogDetalles:string = null;

  //Matdialog Delete
  @ViewChild('mensajeServidorDeleteCita') mensajeServidorDeleteCita:ElementRef;
  dialogDelete:boolean = false;
  idDialogDelete:string = null;

  //MatDialog Crear
  @ViewChild('formDirectiveAddCita') formDirectiveAddCita:FormGroupDirective;
  @ViewChild('mensajeServidorAddCita') mensajeServidorAddCita:ElementRef;
  @ViewChild('mensajeServidorBuscarPaciente') mensajeServidorBuscarPaciente:ElementRef;
  @ViewChild('mensajeServidorBuscarMedico') mensajeServidorBuscarMedico:ElementRef;
  dialogCrear:boolean = false;
  idDialogCrear:string = null;
  medicoRelacionado:MedicoDTO = null;
  horasdisponiblesMedicoRelacionado:string[] = [];
  pacienteRelacionado:PacienteDTO = null;
  disableButtonBuscarPacienteRelacionado:boolean = false;
  disableButtonBuscarMedicoRelacionado:boolean = false;

  //Width y heihght de todos los MatDialogs
  heightDialog:number;
  witdhDialog:string;

  //Formularios
  addCitaForm:FormGroup;

  constructor(private dialogRef:MatDialogRef<CitasComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog:MatDialog,
    private medicosService:MedicosService,
    private pacientesService:PacientesService,
    private citasService:CitasService,
    private formBuilder:FormBuilder,
    private _matSnackBar:MatSnackBar) { }

  ngOnInit(): void {
    //Width y Height dialogs
    this.heightDialog = window.innerHeight * 0.9;
    this.witdhDialog = String(window.innerWidth * 0.5) + 'px';
    //Tabla pacientes
    this.citas = this.data.citas;
    this.citas.sort(this.ordenarCitas);
    this.dataSourceTablaCitas.data = this.citas;
  }

  ordenarCitas(a, b){
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

  //MatDialog Detalles Cita
  getDetallesCita(templateDetalles, idCita){
    if(this.dialogDetalles == false){
      this.citasService.getCita(idCita).subscribe(next =>{
        let dialogRef = this.dialog.open(templateDetalles, {data: {'cita': next}, width : this.witdhDialog, maxHeight: this.heightDialog, autoFocus: false});
        dialogRef.afterOpened().subscribe(() => {
          this.dialogDetalles = true;
          this.idDialogDetalles = dialogRef.id;
        });
        dialogRef.afterClosed().subscribe(() => {
          this.dialogDetalles = false;
          this.idDialogDetalles = null;
        });
      });
    }
  }
  //-----------------------------------------------------------------------------------

  //MatDialog Crear Cita
  crearCita(templateCrear){
    if(this.dialogCrear == false){
      this.addCitaForm = this.formBuilder.group({
        identificacionPaciente: ['', [Validators.required, Validators.maxLength(255), Validators.pattern('^[A-Za-z0-9][A-Za-z0-9-]*$')]],
        identificacionMedico: ['', [Validators.required, Validators.maxLength(255), Validators.pattern('^[A-Za-z0-9][A-Za-z0-9-]*$')]],
        hora: ['', [Validators.required]]
      });

      let dialogRef = this.dialog.open(templateCrear, {width : this.witdhDialog, maxHeight: this.heightDialog, autoFocus: false});
      dialogRef.afterOpened().subscribe(() => {
        this.dialogCrear = true;
        this.idDialogCrear = dialogRef.id;

        this.identificacionPaciente.valueChanges.subscribe(() => {
          this.disableButtonBuscarPacienteRelacionado = false;
          this.pacienteRelacionado = null;
          this.mensajeServidorBuscarPaciente.nativeElement.style.display = 'none';
        });
        this.identificacionMedico.valueChanges.subscribe(() => {
          this.disableButtonBuscarMedicoRelacionado = false;
          this.medicoRelacionado = null;
          this.horasdisponiblesMedicoRelacionado = [];
          this.hora.setValue('');
          this.hora.markAsUntouched();
          this.hora.updateValueAndValidity();
          this.mensajeServidorBuscarMedico.nativeElement.style.display = 'none';
        });
      });
      dialogRef.afterClosed().subscribe(() =>{
        this.dialogCrear = false;
        this.idDialogCrear = null;
        
        this.formDirectiveAddCita.resetForm();
        this.addCitaForm.reset();
        this.addCitaForm = null;
        this.hideError('crear');
        this.medicoRelacionado = null;
        this.horasdisponiblesMedicoRelacionado = [];
        this.pacienteRelacionado = null;
        this.disableButtonBuscarPacienteRelacionado = false;
        this.disableButtonBuscarMedicoRelacionado = false;
      });
    }
  }

  submitCrearCitaBuscarPaciente(){
    this.disableButtonBuscarPacienteRelacionado = true;
    this.pacientesService.getPacienteByIdentificacion(this.identificacionPaciente.value).subscribe(next => {
      this.pacienteRelacionado = next;
    }, error => {
      this.pacienteRelacionado = null;
      this.mensajeServidorBuscarPaciente.nativeElement.innerHTML = error.error;
      this.mensajeServidorBuscarPaciente.nativeElement.style.display = 'block';
    });
  }

  submitCrearCitaBuscarMedico(){
    this.disableButtonBuscarMedicoRelacionado = true;
    this.medicosService.getMedicoByIdentificacion(this.identificacionMedico.value).subscribe(next => {
      this.medicoRelacionado = next;
      this.medicosService.getHorasDisponibles(next.id.toString()).subscribe(horasDisponible => {
        horasDisponible.forEach(hora => {
          this.horasdisponiblesMedicoRelacionado.push(hora);
        });
      });
    }, error => {
      this.medicoRelacionado = null;
      this.mensajeServidorBuscarMedico.nativeElement.innerHTML = error.error;
      this.mensajeServidorBuscarMedico.nativeElement.style.display = 'block';
    });
  }

  submitCrearCita(formDirective:FormGroupDirective){
    let citaDTO = new CitaDTO(null, this.hora.value, this.medicoRelacionado, this.pacienteRelacionado);
    this.citasService.addCita(citaDTO).subscribe(resp => {
      this.citas.push(resp);
      this.citas.sort(this.ordenarCitas);
      this.dataSourceTablaCitas.data = this.citas;
      this.cerrarDialog('dialogCrearCita');
      this._matSnackBar.open('Cita asignada exitosamente!', 'Cerrar', {duration : 5000, panelClass: ['snackBarCreate']});

    }, error =>{
      this.mensajeServidorAddCita.nativeElement.innerHTML = error.error;
      this.mensajeServidorAddCita.nativeElement.style.display = 'block';
      this.mensajeServidorAddCita.nativeElement.style.color = '#ff4747';
      formDirective.resetForm();
      this.addCitaForm.reset();
    });
  }
  //-----------------------------------------------------------------------------------

  //MatDialog Borrar Cita
  borrarCita(templateDelete, cita, indexCita){
    if(this.dialogDelete == false){
      let dialogRef = this.dialog.open(templateDelete, {data: {'cita': cita, 'indexCita': indexCita}, maxWidth: this.witdhDialog, autoFocus: false});
      dialogRef.afterOpened().subscribe(() => {
        this.dialogDelete = true;
        this.idDialogDelete = dialogRef.id;
      });
      dialogRef.afterClosed().subscribe(() => {
        this.dialogDelete = false;
        this.idDialogDelete = null;

        this.hideError('borrar');
      });
    }
  }

  submitBorrarCita(idCita, indexCita){
    this.citasService.deleteCita(idCita).subscribe(() => {
      this.citas.splice(indexCita, 1);
      this.citas.sort(this.ordenarCitas);
      this.dataSourceTablaCitas.data = this.citas;
      this.cerrarDialog('dialogBorrarCita');
      this._matSnackBar.open('Cita cancelada exitosamente', 'Cerrar', {duration : 5000, panelClass: ['snackBarDelete']});
    }, error => {
      this.mensajeServidorDeleteCita.nativeElement.innerHTML = error.error;
      this.mensajeServidorDeleteCita.nativeElement.style.display = 'block';
    });
  }
  //-----------------------------------------------------------------------------------

  //Funciones Dialogs
  hideError(tipo:string){
    switch(tipo){
      case 'crear':
        this.mensajeServidorAddCita.nativeElement.style.display = 'none';
        break;
      case 'borrar':
        this.mensajeServidorDeleteCita.nativeElement.style.display = 'none';
        break;
    }
  }

  cerrarDialog(dialog:string){
    let dialogRef;
    switch(dialog){
      case 'dialogDetallesCita':
        dialogRef = this.dialog.getDialogById(this.idDialogDetalles);
        dialogRef.close();
        break;
      case 'dialogCrearCita':
        dialogRef = this.dialog.getDialogById(this.idDialogCrear);
        dialogRef.close();
        break;
      case 'dialogBorrarCita':
        dialogRef = this.dialog.getDialogById(this.idDialogDelete);
        dialogRef.close();
        break;
      case null:
      default:
        this.dialogRef.close();
        break;
    }
  }

  //CrearPaciente Form Controls
  get identificacionPaciente() { return this.addCitaForm.get('identificacionPaciente'); }
  get identificacionMedico() { return this.addCitaForm.get('identificacionMedico'); }
  get numeroTarjetaProfesionalMedico() { return this.addCitaForm.get('numeroTarjetaProfesionalMedico'); }
  get hora() { return this.addCitaForm.get('hora'); }
}
