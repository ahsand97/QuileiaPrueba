/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.data.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.Valid;
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
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="\"medicos\"")
public class Medico implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="\"id\"", nullable=false)
    private Long id;
    
    @Column(name="\"nombre\"", nullable=false)
    @NotBlank(message = "Campo requerido")
    @Size(max = 255, message = "Se ha excedido el límite de caracteres")
    private String nombre;
    
    @Column(name="\"identificacion\"", nullable=false)
    @NotBlank(message = "Campo requerido")
    @Size(max = 255, message = "Se ha excedido el límite de caracteres")
    @Pattern(regexp = "^[A-Za-z0-9][A-Za-z0-9-]*$", message = "Formato de campo incorrecto")
    private String identificacion;
    
    @Column(name="\"tipoIdentificacion\"", nullable=false)
    @NotBlank(message = "Campo requerido")
    @Pattern(regexp = "^Cédula de Ciudadanía$|^Cédula de Extranjería$|^Pasaporte$|^Registro Civil$",  message = "Formato de campo incorrecto")
    private String tipoIdentificacion;
    
    @Column(name="\"numeroTarjetaProfesional\"", nullable=false)
    @NotBlank(message = "Campo requerido")
    @Size(max = 255, message = "Se ha excedido el límite de caracteres")
    @Pattern(regexp = "^([0-9]+-)*[0-9]+$", message = "Formato de campo incorrecto")
    private String numeroTarjetaProfesional;
    
    @Column(name="\"anosExperiencia\"", nullable=false)
    @Range(min = 0, max=100, message = "Formato de campo incorrecto")
    private BigDecimal anosExperiencia;
    
    @Column(name="\"especialidad\"", nullable=false)
    @NotBlank(message = "Campo requerido")
    @Size(max = 255, message = "Se ha excedido el límite de caracteres")
    private String especialidad;
    
    @Column(name="\"horaInicioAtencion\"", nullable=false)
    @NotBlank(message = "Campo requerido")
    @Pattern(regexp = "^0[0-9]:00 [A-P].M$|^1[0-2]:00 [A-P].M$", message = "Formato de campo incorrecto")
    private String horaInicioAtencion;
    
    @Column(name="\"horaFinAtencion\"", nullable=false)
    @NotBlank(message = "Campo requerido")
    @Pattern(regexp = "^0[0-9]:00 [A-P].M$|^1[0-2]:00 [A-P].M$", message = "Formato de campo incorrecto")
    private String horaFinAtencion;
    
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy="medico", orphanRemoval=true)
    @Valid
    List<Cita> citas = new ArrayList<>();
}
