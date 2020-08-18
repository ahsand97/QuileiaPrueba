import { Component, OnInit, HostListener, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PacientesService } from 'src/app/services/pacientes.service';
import { FormGroup, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PacienteDTO } from 'src/app/dto/PacienteDTO'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppDateAdapter } from 'src/app/components/pacientes/dateHelper';
import { DateAdapter } from '@angular/material/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter}
  ]
})
export class PacientesComponent implements OnInit {

  pacientes = [];
  dataSourceTablaPacientes = new MatTableDataSource<PacienteDTO>();

  //MatDialog Detalles
  dialogDetalles:boolean = false;
  idDialogDetalles:string = null;

  //MatDialog Update
  @ViewChild('formDirectiveUpdatePaciente') formDirectiveUpdatePaciente:FormGroupDirective;
  @ViewChild('mensajeServidorUpdatePaciente') mensajeServidorUpdatePaciente:ElementRef;
  @ViewChild('inputNombreUpdatePaciente') inputNombreUpdatePaciente:ElementRef;
  @ViewChild('inputIdentificacionUpdatePaciente') inputIdentificacionUpdatePaciente:ElementRef;
  @ViewChild('inputEPSUpdatePaciente') inputEPSUpdatePaciente:ElementRef;
  dialogUpdate:boolean = false;
  idDialogUpdate:string = null;
  estadoInicialUpdatePacienteForm = null;
  estdoInicialFecha = null;
  deshabilitarBotonUpdateForm:boolean = false;

  //Matdialog Delete
  @ViewChild('mensajeServidorDeletePaciente') mensajeServidorDeletePaciente:ElementRef;
  dialogDelete:boolean = false;
  idDialogDelete:string = null;

  //MatDialog Crear
  @ViewChild('formDirectiveAddPaciente') formDirectiveAddPaciente:FormGroupDirective;
  @ViewChild('mensajeServidorAddPaciente') mensajeServidorAddPaciente:ElementRef;
  dialogCrear:boolean = false;
  idDialogCrear:string = null;

  //Width y heihght de todos los MatDialogs
  heightDialog:number;
  witdhDialog:string;


  displayedColumns:string[] = ['id', 'Nombre', 'Tipo Identificación', 'Identificación', 'Opciones'];
  tipoIdentidades:string[] = ['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte', 'Registro Civil'];
  minDate: Date;
  maxDate: Date;

  //Formularios
  addPacienteForm:FormGroup;
  updatePacienteForm:FormGroup;

  constructor(private dialogRef:MatDialogRef<PacientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog:MatDialog,
    private pacientesService:PacientesService,
    private formBuilder:FormBuilder,
    private _matSnackBar:MatSnackBar,
    private dateAdapter:DateAdapter<Date>){
      this.dateAdapter.setLocale('es-Es');
      this.minDate = new Date(1900,1,1);
      this.maxDate = new Date();
  }

  ngOnInit(): void {
    //Width y Height dialogs
    this.heightDialog = window.innerHeight * 0.9;
    this.witdhDialog = String(window.innerWidth * 0.5) + 'px';
    //Tabla pacientes
    this.pacientes = this.data.pacientes;
    this.pacientes.sort(this.ordenarPacientes);
    this.dataSourceTablaPacientes.data = this.pacientes;
  }

  ordenarPacientes(a, b){
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

  //MatDialog Detalles Paciente
  getDetallesPaciente(templateDetalles, idPaciente){
    if(this.dialogDetalles == false){
      this.pacientesService.getPaciente(idPaciente).subscribe(next =>{
        let dialogRef = this.dialog.open(templateDetalles, {data: {'paciente': next}, width : this.witdhDialog, maxHeight: this.heightDialog, autoFocus: false});
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

  //MatDialog Crear Paciente
  crearPaciente(templateCrear){
    if(this.dialogCrear == false){
      this.addPacienteForm = this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.maxLength(255)]],
        tipoIdentificacion: ['', [Validators.required]],
        identificacion: ['', [Validators.required, Validators.maxLength(255), Validators.pattern('^[A-Za-z0-9][A-Za-z0-9-]*$')]],
        fechaNacimiento: [''],
        eps: ['', [Validators.required, Validators.maxLength(255)]],
        historiaClinica: ['']
      });

      let dialogRef = this.dialog.open(templateCrear, {width : this.witdhDialog, maxHeight: this.heightDialog, autoFocus: false});
      dialogRef.afterOpened().subscribe(() => {
        this.dialogCrear = true;
        this.idDialogCrear = dialogRef.id;
      });
      dialogRef.afterClosed().subscribe(() =>{
        this.dialogCrear = false;
        this.idDialogCrear = null;
        
        this.formDirectiveAddPaciente.resetForm();
        this.addPacienteForm.reset();
        this.addPacienteForm = null;
        this.hideError('crear');
        this.mensajeServidorAddPaciente.nativeElement.style.color = '#ff4747';
      });
    }
  }

  submitCrearPaciente(formDirective:FormGroupDirective){
    let pacienteDTO = new PacienteDTO(null, this.nombre.value, this.identificacion.value, this.tipoIdentificacion.value, this.fechaNacimiento.value, this.eps.value, this.historiaClinica.value);
    this.pacientesService.addPaciente(pacienteDTO).subscribe(resp => {
      let aux = resp.fechaNacimiento.toString().split('-');
      aux[2] = aux[2].slice(0,2);
      let date = new Date(Number(aux[0]), Number(aux[1]) -1, Number(aux[2]));
      resp.fechaNacimiento = date;
      this.pacientes.push(resp);
      this.pacientes.sort(this.ordenarPacientes);
      this.dataSourceTablaPacientes.data = this.pacientes;

      this.mensajeServidorAddPaciente.nativeElement.innerHTML = 'Paciente añadido al sistema';
      this.mensajeServidorAddPaciente.nativeElement.style.display = 'block';
      this.mensajeServidorAddPaciente.nativeElement.style.color = 'green';
      formDirective.resetForm();
      this.addPacienteForm.reset();
    }, error =>{
      this.mensajeServidorAddPaciente.nativeElement.innerHTML = error.error;
      this.mensajeServidorAddPaciente.nativeElement.style.display = 'block';
      this.mensajeServidorAddPaciente.nativeElement.style.color = '#ff4747';
      formDirective.resetForm();
      this.addPacienteForm.reset();
    });
  }
  //-----------------------------------------------------------------------------------
  
  //MatDialog Update Paciente
  updatePaciente(templateUpdate, idPaciente, indexPaciente){
    if(this.dialogUpdate == false){
      this.pacientesService.getPaciente(idPaciente).subscribe(next => {
        let fechaNacimiento = next.fechaNacimiento.toString().split('-');
        fechaNacimiento[2] = fechaNacimiento[2].slice(0,2);
        let date = new Date(Number(fechaNacimiento[0]), Number(fechaNacimiento[1]) -1, Number(fechaNacimiento[2]));
        next.fechaNacimiento = date;
        this.updatePacienteForm = this.formBuilder.group({
          nombreUpdate: [next.nombre, [Validators.required, Validators.maxLength(255)]],
          tipoIdentificacionUpdate: [next.tipoIdentificacion, [Validators.required]],
          identificacionUpdate: [next.identificacion, [Validators.required, Validators.maxLength(255)]],
          fechaNacimientoUpdate: [next.fechaNacimiento],
          epsUpdate: [next.eps, [Validators.required, Validators.maxLength(255)]],
          historiaClinicaUpdate: [next.historiaClinica]
        });
        this.deshabilitarBotonUpdateForm = true;
        this.estadoInicialUpdatePacienteForm = this.updatePacienteForm.value;
        this.updatePacienteForm.valueChanges.subscribe(() =>{
          if(_.isEqual(this.updatePacienteForm.value, this.estadoInicialUpdatePacienteForm) == true){
            this.deshabilitarBotonUpdateForm = true;
          }
          else{
            this.deshabilitarBotonUpdateForm = false;
          }
        });
        let dialogRef = this.dialog.open(templateUpdate, {data: {'idPaciente': idPaciente, 'indexPaciente': indexPaciente}, width : this.witdhDialog, maxHeight: this.heightDialog, autoFocus: false});
        dialogRef.afterOpened().subscribe(() => {
          this.dialogUpdate = true;
          this.idDialogUpdate = dialogRef.id;
        });
        dialogRef.afterClosed().subscribe(() => {
          this.dialogUpdate = false;
          this.idDialogUpdate = null;

          this.formDirectiveUpdatePaciente.resetForm();
          this.updatePacienteForm.reset();
          this.updatePacienteForm = null;
          this.hideError('actualizar');
          this.mensajeServidorUpdatePaciente.nativeElement.style.color = '#ff4747';
          this.estadoInicialUpdatePacienteForm = null;
          this.deshabilitarBotonUpdateForm = false;
          this.estdoInicialFecha = null;
        });
      });
    }
  }
  
  changesInputUpdateVerificacion(campo:string){
    switch(campo){
      case 'nombreUpdate':
        if(!this.nombreUpdate.value){
          this.nombreUpdate.setValue(this.estadoInicialUpdatePacienteForm.nombreUpdate);
          this.inputNombreUpdatePaciente.nativeElement.blur();
        }
        break;
      case 'identificacionUpdate':
        if(!this.identificacionUpdate.value){
          this.identificacionUpdate.setValue(this.estadoInicialUpdatePacienteForm.identificacionUpdate);
          this.inputIdentificacionUpdatePaciente.nativeElement.blur();
        }
        break;
      case 'epsUpdate':
        if(!this.epsUpdate.value){
          this.epsUpdate.setValue(this.estadoInicialUpdatePacienteForm.epsUpdate);
          this.inputEPSUpdatePaciente.nativeElement.blur();
        }
        break;
      case 'fechaNacimientoUpdate':
        break;
    }
  }

  submitUpdatePaciente(idPaciente, indexPaciente){
    let pacienteDTO = new PacienteDTO(idPaciente, this.nombreUpdate.value, this.identificacionUpdate.value, this.tipoIdentificacionUpdate.value, this.fechaNacimientoUpdate.value, this.epsUpdate.value, this.historiaClinicaUpdate.value);
    this.pacientesService.updatePaciente(pacienteDTO).subscribe(next => {
      let aux = next.fechaNacimiento.toString().split('-');
      aux[2] = aux[2].slice(0,2);
      let date = new Date(Number(aux[0]), Number(aux[1]) -1, Number(aux[2]));
      next.fechaNacimiento = date;
      this.pacientes.splice(indexPaciente, 1);
      this.pacientes.push(next);
      this.pacientes.sort(this.ordenarPacientes);
      this.dataSourceTablaPacientes.data = this.pacientes;
      this.cerrarDialog('dialogUpdatePaciente');
      this._matSnackBar.open('Información del paciente actualizada exitosamente!', 'Cerrar', {duration : 5000, panelClass: ['snackBarUpdate']});
    }, error => {
      this.mensajeServidorUpdatePaciente.nativeElement.innerHTML = error.error;
      this.mensajeServidorUpdatePaciente.nativeElement.style.display = 'block';
      this.mensajeServidorUpdatePaciente.nativeElement.style.color = '#ff4747';
      this.updatePacienteForm.reset(this.estadoInicialUpdatePacienteForm);

      this.inputNombreUpdatePaciente.nativeElement.blur();
      this.inputIdentificacionUpdatePaciente.nativeElement.blur();
      this.inputEPSUpdatePaciente.nativeElement.blur();
    });
  }
  //-----------------------------------------------------------------------------------

  //MatDialog Borrar Paciente
  borrarPaciente(templateDelete, paciente, indexPaciente){
    if(this.dialogDelete == false){
      let dialogRef = this.dialog.open(templateDelete, {data: {'paciente': paciente, 'indexPaciente': indexPaciente}, maxWidth: this.witdhDialog, autoFocus: false});
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

  submitBorrarPaciente(idPaciente, indexPaciente){
    this.pacientesService.deletePaciente(idPaciente).subscribe(() => {
      this.pacientes.splice(indexPaciente, 1);
      this.pacientes.sort(this.ordenarPacientes);
      this.dataSourceTablaPacientes.data = this.pacientes;
      this.cerrarDialog('dialogBorrarPaciente');
      this._matSnackBar.open('Paciente eliminado del sistema exitosamente', 'Cerrar', {duration : 5000, panelClass: ['snackBarDelete']});
    }, error => {
      this.mensajeServidorDeletePaciente.nativeElement.innerHTML = error.error;
      this.mensajeServidorDeletePaciente.nativeElement.style.display = 'block';
    });
  }
  //-----------------------------------------------------------------------------------

  //Funciones Dialogs
  hideError(tipo:string){
    switch(tipo){
      case 'crear':
        this.mensajeServidorAddPaciente.nativeElement.style.display = 'none';
        break;
      case 'actualizar':
        this.mensajeServidorUpdatePaciente.nativeElement.style.display = 'none';
        break;
      case 'borrar':
        this.mensajeServidorDeletePaciente.nativeElement.style.display = 'none';
        break;
    }
  }

  cerrarDialog(dialog:string){
    let dialogRef;
    switch(dialog){
      case 'dialogDetallesPaciente':
        dialogRef = this.dialog.getDialogById(this.idDialogDetalles);
        dialogRef.close();
        break;
      case 'dialogCrearPaciente':
        dialogRef = this.dialog.getDialogById(this.idDialogCrear);
        dialogRef.close();
        break;
      case 'dialogUpdatePaciente':
        dialogRef = this.dialog.getDialogById(this.idDialogUpdate);
        dialogRef.close();
        break;
      case 'dialogBorrarPaciente':
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
  get nombre() { return this.addPacienteForm.get('nombre'); }
  get tipoIdentificacion() { return this.addPacienteForm.get('tipoIdentificacion'); }
  get identificacion() { return this.addPacienteForm.get('identificacion'); }
  get fechaNacimiento() { return this.addPacienteForm.get('fechaNacimiento'); }
  get eps() { return this.addPacienteForm.get('eps'); }
  get historiaClinica() { return this.addPacienteForm.get('historiaClinica'); }

  //UpdatePaciente Form Controls
  get nombreUpdate() { return this.updatePacienteForm.get('nombreUpdate'); }
  get tipoIdentificacionUpdate() { return this.updatePacienteForm.get('tipoIdentificacionUpdate'); }
  get identificacionUpdate() { return this.updatePacienteForm.get('identificacionUpdate'); }
  get fechaNacimientoUpdate() { return this.updatePacienteForm.get('fechaNacimientoUpdate'); }
  get epsUpdate() { return this.updatePacienteForm.get('epsUpdate'); }
  get historiaClinicaUpdate() { return this.updatePacienteForm.get('historiaClinicaUpdate'); }
}
