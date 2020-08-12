/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.web.dto;

import java.io.Serializable;
import java.sql.Clob;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author ahsan
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PacienteDTO implements Serializable{
    
    private Long id;
    private String nombre;
    private String identificacion;
    private String tipoIdentificacion;
    private Date fechaNacimiento;
    private String eps;
    private Clob historiaClinica;
}
