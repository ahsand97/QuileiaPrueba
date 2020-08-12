/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  ahsan
 * Created: 11/08/2020
 */

CREATE TABLE "medicos" (
    "id" IDENTITY NOT NULL PRIMARY KEY,
    "nombre" VARCHAR(255) NOT NULL,
    "identificacion"  VARCHAR(255) NOT NULL,
    "tipoIdentificacion" VARCHAR(255) NOT NULL,
    "numeroTarjetaProfesional" VARCHAR(255) NOT NULL,
    "anosExperiencia" DECIMAL NOT NULL,
    "especialidad" VARCHAR(255) NOT NULL,
    "horaInicioAtencion" VARCHAR(255) NOT NULL,
    "horaFinAtencion" VARCHAR(255) NOT NULL
);

CREATE TABLE "pacientes" (
    "id" IDENTITY NOT NULL PRIMARY KEY,
    "nombre" VARCHAR(255) NOT NULL,
    "identificacion"  VARCHAR(255) NOT NULL,
    "tipoIdentificacion" VARCHAR(255) NOT NULL,
    "fechaNacimiento" DATE NOT NULL,
    "EPS" VARCHAR(255) NOT NULL,
    "historiaClinica" CLOB
);

CREATE TABLE "citas" (
    "id" IDENTITY NOT NULL PRIMARY KEY,
    "hora" VARCHAR NOT NULL,
    "medico_id" BIGINT NOT NULL,
    "paciente_id" BIGINT NOT NULL
);
ALTER TABLE "citas" ADD FOREIGN KEY ("medico_id") REFERENCES "medicos"("id") ON DELETE CASCADE;
ALTER TABLE "citas" ADD FOREIGN KEY ("paciente_id") REFERENCES "pacientes"("id") ON DELETE CASCADE;