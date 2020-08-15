import { Component, OnInit, HostListener, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MedicosService } from 'src/app/services/medicos.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MedicoDTO } from 'src/app/dto/MedicoDTO';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'underscore';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  medicos = [];
  dataSourceTablaMedicos = new MatTableDataSource<MedicoDTO>();
  
  //MatDialogDetalles
  dialogDetalles:boolean = false;
  idDialogDetalles:string = null;

  //MatDialogUpdate
  @ViewChild('formDirectiveUpdateMedico') formDirectiveUpdateMedico:FormGroupDirective;
  @ViewChild('mensajeServidorUpdateMedico') mensajeServidorUpdateMedico:ElementRef;
  @ViewChild('inputNombreUpdateMedico') inputNombreUpdateMedico:ElementRef;
  @ViewChild('inputIdentificacionUpdateMedico') inputIdentificacionUpdateMedico:ElementRef;
  @ViewChild('inputNumeroTarjetaProfesionalUpdateMedico') inputNumeroTarjetaProfesionalUpdateMedico:ElementRef;
  @ViewChild('inputAnosExperienciaUpdateMedico') inputAnosExperienciaUpdateMedico:ElementRef;
  @ViewChild('inputEspecialidadUpdateMedico') inputEspecialidadUpdateMedico:ElementRef;
  dialogUpdate:boolean = false;
  idDialogUpdate:string = null;
  estadoInicialUpdateMedicoForm = null;
  estadoInicialAnteMeridiemInicio = null;
  estadoInicialAnteMeridiemFinal = null;
  deshabilitarBotonUpdateForm:boolean = false;

  //MatDialogDelete
  @ViewChild('mensajeServidorDeleteMedico') mensajeServidorDeleteMedico:ElementRef;
  dialogDelete:boolean = false;
  idDialogDelete:string = null;

  //MatDialogCrear
  @ViewChild('formDirectiveAddMedico') formDirectiveAddMedico:FormGroupDirective;
  @ViewChild('mensajeServidorAddMedico') mensajeServidorAddMedico:ElementRef;
  dialogCrear:boolean = false;
  idDialogCrear:string = null;

  //Width y heihght de todos los MatDialogs
  heightDialog:number;
  witdhDialog:string;


  displayedColumns:string[] = ['id', 'Nombre', 'Tipo Identificación', 'Identificación', 'Opciones'];
  tipoIdentidades:string[] = ['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte', 'Registro Civil'];
  horasDisponibles:string[] = [];
  anteMeridiemInicio:string = '1';
  anteMeridiemFin:string = '3';

  //Formularios
  addMedicoForm:FormGroup;
  updateMedicoForm:FormGroup;;

  constructor(private dialogRef:MatDialogRef<MedicosComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private dialog:MatDialog,
    private medicosService:MedicosService,
    private formBuilder:FormBuilder,
    private _matSnackBar:MatSnackBar)
  { }

  ngOnInit(): void {
    for(let i = 1; i < 12; i++){
      if(i < 10){
        this.horasDisponibles.push('0' + i.toString());
      }
      else{
        this.horasDisponibles.push(i.toString());
      }
    }

    //Tabla Médicos
    this.medicos = this.data.medicos;
    this.dataSourceTablaMedicos.data = this.medicos;

    //Width y Height dialogs
    this.heightDialog = window.innerHeight * 0.9;
    this.witdhDialog = String(window.innerWidth * 0.5) + 'px';
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

  //MatDialog Detalles Médico
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
  //-----------------------------------------------------------------------------------

  //MatDialog Crear Médico
  crearMedico(templateCrear){
    if(this.dialogCrear == false){
      //Formulario Crear Médico
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
        this.addMedicoForm = null;
        this.anteMeridiemInicio = '1';
        this.anteMeridiemFin = '3';
        this.hideError('crear');
        this.mensajeServidorAddMedico.nativeElement.style.color = '#ff4747';
      });
    }
  }

  submitCrearMedico(formDirective:FormGroupDirective){
    let horaInicioAtencion = this.horaInicioAtencion.value;
    let horaFinAtencion = this.horaFinAtencion.value;
    if(parseInt(horaInicioAtencion) < 10){
      horaInicioAtencion = '0' + parseInt(horaInicioAtencion).toString() + ':00 ';
    }
    else{
      horaInicioAtencion = horaInicioAtencion + ':00 ';
    }
    if(parseInt(horaFinAtencion) < 10){
      horaFinAtencion = '0' + parseInt(horaFinAtencion).toString() + ':00 ';
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
    this.medicosService.addMedico(medicoDTO).subscribe(data => {
      this.medicos.push(data);
      this.medicos.sort(this.ordenarMedicos);
      this.dataSourceTablaMedicos.data = this.medicos;
      
      this.mensajeServidorAddMedico.nativeElement.innerHTML = 'Médico añadido al sistema';
      this.mensajeServidorAddMedico.nativeElement.style.display = 'block';
      this.mensajeServidorAddMedico.nativeElement.style.color = 'green';
      this.anteMeridiemInicio = '1';
      this.anteMeridiemFin = '3';
      formDirective.resetForm();
      this.addMedicoForm.reset();
    }, error =>{
      this.mensajeServidorAddMedico.nativeElement.innerHTML = error.error;
      this.mensajeServidorAddMedico.nativeElement.style.display = 'block';
      this.mensajeServidorAddMedico.nativeElement.style.color = '#ff4747';
      this.anteMeridiemInicio = '1';
      this.anteMeridiemFin = '3';
      formDirective.resetForm();
      this.addMedicoForm.reset();
    });
  }
  //-----------------------------------------------------------------------------------

  //MatDialog Update Médico
  updateMedico(templateUpdate, idMedico, indexMedico){
    if(this.dialogUpdate == false){
      this.medicosService.getMedico(idMedico).subscribe(next => {
        let horaInicioAtencion = next.horaInicioAtencion.slice(0,2);
        let horaFinAtencion = next.horaFinAtencion.slice(0,2);
        let anteMeridiemInicio = next.horaInicioAtencion.slice(-3);
        let anteMeridiemFin = next.horaFinAtencion.slice(-3);
        if(anteMeridiemInicio == 'A.M'){
          this.estadoInicialAnteMeridiemInicio = '1';
          this.anteMeridiemInicio = '1';
        }
        else if(anteMeridiemInicio == 'P.M'){
          this.estadoInicialAnteMeridiemInicio = '2';
          this.anteMeridiemInicio = '2'
        }
        if(anteMeridiemFin == 'A.M'){
          this.estadoInicialAnteMeridiemFinal = '3';
          this.anteMeridiemFin = '3';
        }
        else if(anteMeridiemFin == 'P.M'){
          this.estadoInicialAnteMeridiemFinal = '4';
          this.anteMeridiemFin = '4';
        }
        this.updateMedicoForm = this.formBuilder.group({
          nombreUpdate: [next.nombre, [Validators.required, Validators.maxLength(255)]],
          tipoIdentificacionUpdate: [next.tipoIdentificacion, [Validators.required]],
          identificacionUpdate: [next.identificacion, [Validators.required, Validators.maxLength(255)]],
          numeroTarjetaProfesionalUpdate: [next.numeroTarjetaProfesional, [Validators.required, Validators.pattern('^([0-9]+-)*[0-9]+$')]],
          anosExperienciaUpdate: [next.anosExperiencia, [Validators.required, Validators.pattern('^[0-9]+$')]],
          especialidadUpdate: [next.especialidad, [Validators.required, Validators.maxLength(255)]],
          horaInicioAtencionUpdate: [horaInicioAtencion, [Validators.required]],
          horaFinAtencionUpdate: [horaFinAtencion, [Validators.required]]
        });
        this.deshabilitarBotonUpdateForm = true;
        this.estadoInicialUpdateMedicoForm = this.updateMedicoForm.value;
        this.updateMedicoForm.valueChanges.subscribe(() =>{
          if((_.isEqual(this.updateMedicoForm.value, this.estadoInicialUpdateMedicoForm) == true) && (this.anteMeridiemInicio == this.estadoInicialAnteMeridiemInicio) && (this.anteMeridiemFin == this.estadoInicialAnteMeridiemFinal)){
              this.deshabilitarBotonUpdateForm = true;
          }
          else{
            this.deshabilitarBotonUpdateForm = false;
          }
        });
        let dialogRef = this.dialog.open(templateUpdate, {data: {'idMedico': idMedico, 'indexMedico': indexMedico}, width : this.witdhDialog, maxHeight: this.heightDialog, autoFocus: false});
        dialogRef.afterOpened().subscribe(() => {
          this.dialogUpdate = true;
          this.idDialogUpdate = dialogRef.id;
        });
        dialogRef.afterClosed().subscribe(result =>{
          this.dialogUpdate = false;
          this.idDialogUpdate = null;

          this.formDirectiveUpdateMedico.resetForm();
          this.updateMedicoForm.reset();
          this.updateMedicoForm = null;
          this.anteMeridiemInicio = '1';
          this.anteMeridiemFin = '3';
          this.hideError('actualizar');
          this.mensajeServidorUpdateMedico.nativeElement.style.color = '#ff4747';
          this.estadoInicialUpdateMedicoForm = null;
          this.estadoInicialAnteMeridiemInicio = null;
          this.estadoInicialAnteMeridiemFinal = null;
          this.deshabilitarBotonUpdateForm = false;
        });
      });

    }
  }

  changesInputUpdateVerificacion(campo:string){
    switch(campo){
      case 'nombreUpdate':
        if(!this.nombreUpdate.value){
          this.nombreUpdate.setValue(this.estadoInicialUpdateMedicoForm.nombreUpdate);
          this.inputNombreUpdateMedico.nativeElement.blur();
        }
        break;
      case 'identificacionUpdate':
        if(!this.identificacionUpdate.value){
          this.identificacionUpdate.setValue(this.estadoInicialUpdateMedicoForm.identificacionUpdate);
          this.inputIdentificacionUpdateMedico.nativeElement.blur();
        }
        break;
      case 'numeroTarjetaProfesionalUpdate':
        if(!this.numeroTarjetaProfesionalUpdate.value){
          this.numeroTarjetaProfesionalUpdate.setValue(this.estadoInicialUpdateMedicoForm.numeroTarjetaProfesionalUpdate);
          this.inputNumeroTarjetaProfesionalUpdateMedico.nativeElement.blur();
        }
        break;
      case 'anosExperienciaUpdate':
        if(!this.anosExperienciaUpdate.value){
          this.anosExperienciaUpdate.setValue(this.estadoInicialUpdateMedicoForm.anosExperienciaUpdate);
          this.inputAnosExperienciaUpdateMedico.nativeElement.blur();
        }
        break;
      case 'especialidadUpdate':
        if(!this.especialidadUpdate.value){
          this.especialidadUpdate.setValue(this.estadoInicialUpdateMedicoForm.especialidadUpdate);
          this.inputEspecialidadUpdateMedico.nativeElement.blur();
        }
        break;
      case 'anteMeridiemInicio':
      case 'anteMeridiemFin':
        if((_.isEqual(this.updateMedicoForm.value, this.estadoInicialUpdateMedicoForm) == true) && (this.anteMeridiemInicio == this.estadoInicialAnteMeridiemInicio) && (this.anteMeridiemFin == this.estadoInicialAnteMeridiemFinal)){
          this.deshabilitarBotonUpdateForm = true;
        }
        else{
          this.deshabilitarBotonUpdateForm = false;
        }
        break;
    }
  }

  submitUpdateMedico(idMedico, indexMedico){
    let horaInicioAtencion = this.horaInicioAtencionUpdate.value;
    let horaFinAtencion = this.horaFinAtencionUpdate.value;
    if(parseInt(horaInicioAtencion) < 10){
      horaInicioAtencion = '0' + parseInt(horaInicioAtencion).toString() + ':00 ';
    }
    else{
      horaInicioAtencion = horaInicioAtencion + ':00 ';
    }
    if(parseInt(horaFinAtencion) < 10){
      horaFinAtencion = '0' + parseInt(horaFinAtencion).toString() + ':00 ';
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
    let medicoDTO = new MedicoDTO(idMedico, this.nombreUpdate.value, this.identificacionUpdate.value, this.tipoIdentificacionUpdate.value, this.numeroTarjetaProfesionalUpdate.value, this.anosExperienciaUpdate.value, this.especialidadUpdate.value, horaInicioAtencion, horaFinAtencion);
    this.medicosService.updateMedico(medicoDTO).subscribe(next => {
      this.medicos.splice(indexMedico, 1);
      this.medicos.push(next);
      this.medicos.sort(this.ordenarMedicos);
      this.dataSourceTablaMedicos.data = this.medicos;
      this.cerrarDialog('dialogUpdateMedico');
      this._matSnackBar.open('Información del médico actualizada exitosamente!', 'Cerrar', {duration : 5000, panelClass: ['snackBarUpdate']});
      this.anteMeridiemInicio = '1';
      this.anteMeridiemFin = '3';
    }, error => {
      this.mensajeServidorUpdateMedico.nativeElement.innerHTML = error.error;
      this.mensajeServidorUpdateMedico.nativeElement.style.display = 'block';
      this.mensajeServidorUpdateMedico.nativeElement.style.color = '#ff4747';
      this.anteMeridiemInicio = this.estadoInicialAnteMeridiemInicio;
      this.anteMeridiemFin = this.estadoInicialAnteMeridiemFinal;
      this.updateMedicoForm.reset(this.estadoInicialUpdateMedicoForm);

      this.inputNombreUpdateMedico.nativeElement.blur();
      this.inputIdentificacionUpdateMedico.nativeElement.blur();
      this.inputNumeroTarjetaProfesionalUpdateMedico.nativeElement.blur();
      this.inputAnosExperienciaUpdateMedico.nativeElement.blur();
      this.inputEspecialidadUpdateMedico.nativeElement.blur();
    });

  }
  //-----------------------------------------------------------------------------------

  //MatDialog Borrar Médico
  borrarMedico(templateDelete, medico, indexMedico){
    if(this.dialogDelete == false){
      let dialogRef = this.dialog.open(templateDelete, {data: {'medico': medico, 'indexMedico': indexMedico}, maxWidth: this.witdhDialog, autoFocus: false});
      dialogRef.afterOpened().subscribe(() => {
        this.dialogDelete = true;
        this.idDialogDelete = dialogRef.id;
      });
      dialogRef.afterClosed().subscribe(result => {
        this.dialogDelete = false;
        this.idDialogDelete = null;

        this.hideError('borrar');
        this.mensajeServidorDeleteMedico.nativeElement.style.color = '#ff4747';
      });
    }
  }

  submitBorrarMedico(idMedico, indexMedico){
    this.medicosService.deleteMedico(idMedico).subscribe(() => {
      this.medicos.splice(indexMedico, 1);
      this.medicos.sort(this.ordenarMedicos);
      this.dataSourceTablaMedicos.data = this.medicos;
      this.cerrarDialog('dialogBorrarMedico');
      this._matSnackBar.open('Médico eliminado del sistema exitosamente', 'Cerrar', {duration : 5000, panelClass: ['snackBarDelete']});
    }, error => {
      this.mensajeServidorDeleteMedico.nativeElement.innerHTML = error.error;
      this.mensajeServidorDeleteMedico.nativeElement.style.display = 'block';
      this.mensajeServidorDeleteMedico.nativeElement.style.color = '#ff4747';
    });
  }
  //-----------------------------------------------------------------------------------

  //Funciones Dialogs
  hideError(tipo:string){
    switch(tipo){
      case 'crear':
        this.mensajeServidorAddMedico.nativeElement.style.display = 'none';
        break;
      case 'actualizar':
        this.mensajeServidorUpdateMedico.nativeElement.style.display = 'none';
        break;
      case 'borrar':
        this.mensajeServidorDeleteMedico.nativeElement.style.display = 'none';
        break;
    }
  }

  cerrarDialog(dialog:string){
    let dialogRef;
    switch(dialog){
      case 'dialogDetallesMedico':
        dialogRef = this.dialog.getDialogById(this.idDialogDetalles);
        dialogRef.close();
        break;
      case 'dialogCrearMedico':
        dialogRef = this.dialog.getDialogById(this.idDialogCrear);
        dialogRef.close();
        break;
      case 'dialogUpdateMedico':
        dialogRef = this.dialog.getDialogById(this.idDialogUpdate);
        dialogRef.close();
        break;
      case 'dialogBorrarMedico':
        dialogRef = this.dialog.getDialogById(this.idDialogDelete);
        dialogRef.close();
        break;
      case null:
      default:
        this.dialogRef.close();
        break;
    }
  }

  //CrearMédico Form Controls
  get nombre() { return this.addMedicoForm.get('nombre'); }
  get tipoIdentificacion() { return this.addMedicoForm.get('tipoIdentificacion'); }
  get identificacion() { return this.addMedicoForm.get('identificacion'); }
  get numeroTarjetaProfesional() { return this.addMedicoForm.get('numeroTarjetaProfesional'); }
  get anosExperiencia() { return this.addMedicoForm.get('anosExperiencia'); }
  get especialidad() { return this.addMedicoForm.get('especialidad'); }
  get horaInicioAtencion() { return this.addMedicoForm.get('horaInicioAtencion'); }
  get horaFinAtencion() { return this.addMedicoForm.get('horaFinAtencion'); }

  //UpdateMedico Form Controls
  get nombreUpdate() { return this.updateMedicoForm.get('nombreUpdate'); }
  get tipoIdentificacionUpdate() { return this.updateMedicoForm.get('tipoIdentificacionUpdate'); }
  get identificacionUpdate() { return this.updateMedicoForm.get('identificacionUpdate'); }
  get numeroTarjetaProfesionalUpdate() { return this.updateMedicoForm.get('numeroTarjetaProfesionalUpdate'); }
  get anosExperienciaUpdate() { return this.updateMedicoForm.get('anosExperienciaUpdate'); }
  get especialidadUpdate() { return this.updateMedicoForm.get('especialidadUpdate'); }
  get horaInicioAtencionUpdate() { return this.updateMedicoForm.get('horaInicioAtencionUpdate'); }
  get horaFinAtencionUpdate() { return this.updateMedicoForm.get('horaFinAtencionUpdate'); }
}
