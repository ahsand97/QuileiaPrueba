import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MedicosComponent } from '../medicos/medicos.component';
import { PacientesComponent } from '../pacientes/pacientes.component';
import { CitasComponent } from '../citas/citas.component';
import { MedicosService } from 'src/app/services/medicos.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  dialogMedicosAbierto:boolean = false;
  dialogPacientesAbierto:boolean = false;
  dialogCitasAbierto:boolean = false;
  heightDialog:number;
  witdhDialog:string;

  constructor(private dialog:MatDialog, private medicosService:MedicosService) { }

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
      dialogRef.afterClosed().subscribe(result =>{
        this.dialogMedicosAbierto = false;
      });
    }
  }

  abrirDialogPacientes(){
    if(this.dialogPacientesAbierto == false){
      let dialogRef = this.dialog.open(PacientesComponent, {width : this.witdhDialog, maxHeight: this.heightDialog, autoFocus: false});
      dialogRef.afterOpened().subscribe(() => {
        this.dialogPacientesAbierto = true;
      });
      dialogRef.afterClosed().subscribe(result =>{
        this.dialogPacientesAbierto = false;
      });
    }
  }

  abrirDialogCitas(){
    if(this.dialogCitasAbierto == false){
      let dialogRef = this.dialog.open(CitasComponent, {width : this.witdhDialog, maxHeight: this.heightDialog, autoFocus: false});
      dialogRef.afterOpened().subscribe(() => {
        this.dialogCitasAbierto = true;
      });
      dialogRef.afterClosed().subscribe(result =>{
        this.dialogCitasAbierto = false;
      });
    }
  }

}
