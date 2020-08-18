/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.web.dto;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Temporal;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
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
    
    @NotBlank(message = "Campo requerido")
    @Size(max = 255, message = "Se ha excedido el límite de caracteres")
    private String nombre;
    
    @NotBlank(message = "Campo requerido")
    @Size(max = 255, message = "Se ha excedido el límite de caracteres")
    @Pattern(regexp = "^[A-Za-z0-9][A-Za-z0-9-]*$", message = "Formato de campo incorrecto")
    private String identificacion;
    
    @NotBlank(message = "Campo requerido")
    @Pattern(regexp = "^Cédula de Ciudadanía$|^Cédula de Extranjería$|^Pasaporte$|^Registro Civil$",  message = "Formato de campo incorrecto")
    private String tipoIdentificacion;
    
    @Temporal(javax.persistence.TemporalType.DATE)
    @PastOrPresent(message = "Fecha incorrecta")
    private Date fechaNacimiento;
    
    @NotBlank(message = "Campo requerido")
    @Size(max = 255, message = "Se ha excedido el límite de caracteres")
    private String eps;
    private String historiaClinica;
}
