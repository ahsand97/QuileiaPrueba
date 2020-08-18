/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.web.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

/**
 *
 * @author ahsan
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicoDTO implements Serializable {
    
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
    
    @NotBlank(message = "Campo requerido")
    @Size(max = 255, message = "Se ha excedido el límite de caracteres")
    @Pattern(regexp = "^([0-9]+-)*[0-9]+$", message = "Formato de campo incorrecto")
    private String numeroTarjetaProfesional;

    @Range(min = 0, max=100, message = "Formato de campo incorrecto")
    private BigDecimal anosExperiencia;
    
    @NotBlank(message = "Campo requerido")
    @Size(max = 255, message = "Se ha excedido el límite de caracteres")
    private String especialidad;
    
    @NotBlank(message = "Campo requerido")
    @Pattern(regexp = "^0[0-9]:00 [A-P].M$|^1[0-2]:00 [A-P].M$", message = "Formato de campo incorrecto")
    private String horaInicioAtencion;
    
    @NotBlank(message = "Campo requerido")
    @Pattern(regexp = "^0[0-9]:00 [A-P].M$|^1[0-2]:00 [A-P].M$", message = "Formato de campo incorrecto")
    private String horaFinAtencion;
}
