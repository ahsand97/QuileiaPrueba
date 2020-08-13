import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  medicos = [];

  constructor(private dialogRef:MatDialogRef<MedicosComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.medicos = this.data.medicos;
    this.medicos.sort(this.ordenarMedicos);
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
    let heightDialog = String(window.innerHeight * 0.8);
    let witdhDialog = String(window.innerWidth * 0.7) + 'px';
    this.dialogRef.updateSize(witdhDialog, heightDialog);
  }

  cerrarDialogMedicos(){
    this.dialogRef.close();
  }

}
