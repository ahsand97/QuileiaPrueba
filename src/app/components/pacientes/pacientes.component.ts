import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<PacientesComponent>) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  resizeDialog() {
    let heightDialog = String(window.innerHeight * 0.8);
    let witdhDialog = String(window.innerWidth * 0.7) + 'px';
    this.dialogRef.updateSize(witdhDialog, heightDialog);
  }

  cerrarDialogPacientes(){
    this.dialogRef.close();
  }

}
