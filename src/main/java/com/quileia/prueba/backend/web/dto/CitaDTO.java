/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.web.dto;

import java.io.Serializable;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
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
public class CitaDTO implements Serializable {
    
    private Long id;
    
    @NotBlank(message = "Campo requerido")
    @Pattern(regexp = "^0[0-9]:00 [A-P].M$|^1[0-2]:00 [A-P].M$", message = "Formato de campo incorrecto")
    private String hora;
    
    @Valid
    private MedicoDTO medico;
    
    @Valid
    private PacienteDTO paciente;
}
