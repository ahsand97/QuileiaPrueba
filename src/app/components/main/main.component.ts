import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MedicosComponent } from '../medicos/medicos.component';
import { PacientesComponent } from '../pacientes/pacientes.component';
import { CitasComponent } from '../citas/citas.component';
import { MedicosService } from 'src/app/services/medicos.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  dialogMedicosAbierto:boolean = false;
  dialogPacientesAbierto:boolean = false;
  dialogCitasAbierto:boolean = false;
  heightDialog:number;
  witdhDialog:string;

  constructor(private dialog:MatDialog,
    private medicosService:MedicosService,
    private pacientesService:PacientesService,
    private citasService:CitasService) { }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.heightDialog = window.innerHeight * 0.8;
    this.witdhDialog = String(window.innerWidth * 0.7) + 'px';
  }

  ngOnInit(): void {
    this.heightDialog = window.innerHeight * 0.8;
    this.witdhDialog = String(window.innerWidth * 0.7) + 'px';
  }

  abrirDialogMedicos(){
    if(this.dialogMedicosAbierto == false){
      let medicos = [];
      this.medicosService.getMedicos().subscribe(next => {
        next.forEach(e =>{
          medicos.push(e);
        })
      });
      let dialogRef = this.dialog.open(MedicosComponent, {data: {'medicos': medicos}, width : this.witdhDialog, maxHeight: this.heightDialog, autoFocus: false});
      dialogRef.afterOpened().subscribe(() => {
        this.dialogMedicosAbierto = true;
      });
      dialogRef.afterClosed().subscribe(() =>{
        this.dialogMedicosAbierto = false;
      });
    }
  }

  abrirDialogPacientes(){
    if(this.dialogPacientesAbierto == false){
      let pacientes = [];
      this.pacientesService.getPacientes().subscribe(next => {
        next.forEach(e =>{
          let fechaNacimiento = e.fechaNacimiento.toString().split('-');
          fechaNacimiento[2] = fechaNacimiento[2].slice(0,2);
          let date = new Date(Number(fechaNacimiento[0]), Number(fechaNacimiento[1]) -1, Number(fechaNacimiento[2]));
          e.fechaNacimiento = date;
          pacientes.push(e);
        })
      });
      let dialogRef = this.dialog.open(PacientesComponent, {data: {'pacientes': pacientes}, width : this.witdhDialog, maxHeight: this.heightDialog, autoFocus: false});
      dialogRef.afterOpened().subscribe(() => {
        this.dialogPacientesAbierto = true;
      });
      dialogRef.afterClosed().subscribe(() =>{
        this.dialogPacientesAbierto = false;
      });
    }
  }

  abrirDialogCitas(){
    if(this.dialogCitasAbierto == false){
      let citas = [];
      this.citasService.getCitas().subscribe(next => {
        next.forEach(e =>{
          citas.push(e);
        })
      });
      let dialogRef = this.dialog.open(CitasComponent, {data: {'citas': citas},width : this.witdhDialog, maxHeight: this.heightDialog, autoFocus: false});
      dialogRef.afterOpened().subscribe(() => {
        this.dialogCitasAbierto = true;
      });
      dialogRef.afterClosed().subscribe(() =>{
        this.dialogCitasAbierto = false;
      });
    }
  }

}
