import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog'; 
import { MatTableModule } from '@angular/material/table'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { MatSnackBarModule } from '@angular/material/snack-bar'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { MedicosComponent } from './components/medicos/medicos.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { CitasComponent } from './components/citas/citas.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MedicosComponent,
    PacientesComponent,
    CitasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
