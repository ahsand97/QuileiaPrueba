/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  ahsan
 * Created: 11/08/2020
 */
INSERT INTO "medicos"("nombre", "identificacion", "tipoIdentificacion", "numeroTarjetaProfesional", "anosExperiencia", "especialidad", "horaInicioAtencion", "horaFinAtencion") VALUES
('Pepito Pérez', '123456789', 'Cédula de Ciudadanía', '123', 5, 'Endocrinólogo', '7 A.M', '8 P.M'),
('Pepito Ramírez', '987654321', 'Cédula de Ciudadanía', '456', 4, 'Neurocirujano', '3 A.M', '2 P.M'),
('Pepito Cárdenas', '111111111', 'Cédula de Ciudadanía', '789', 2, 'Cirujano Plástico', '4 A.M', '5 P.M'),
('Pepito López', '222222222', 'Cédula de Ciudadanía', '369', 1, 'Pediatra', '10 A.M', '10 P.M');

INSERT INTO "pacientes"("nombre", "identificacion", "tipoIdentificacion", "fechaNacimiento", "EPS") VALUES
('Ahsan David Pérez Bermúdez', '123456789', 'Cédula de Ciudadanía', '1997-06-05', 'Comfamiliar S.A'),
('Carlos Andrés Baena', '22222222', 'Cédula de Ciudadanía', '1970-06-21', 'CafeSalud'),
('Pedro Arturo Ahmed', '33333333', 'Cédula de Ciudadanía', '1995-05-20', 'Sura'),
('Laura Andrea Perea', '111111111', 'Cédula de Ciudadanía', '1980-01-20', 'Aliansalud EPS');