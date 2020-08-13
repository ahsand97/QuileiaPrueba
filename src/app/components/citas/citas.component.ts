import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<CitasComponent>) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  resizeDialog() {
    let heightDialog = String(window.innerHeight * 0.8);
    let witdhDialog = String(window.innerWidth * 0.7) + 'px';
    this.dialogRef.updateSize(witdhDialog, heightDialog);
  }

  cerrarDialogCitas(){
    this.dialogRef.close();
  }

}
