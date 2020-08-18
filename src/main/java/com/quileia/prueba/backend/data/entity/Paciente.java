/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.data.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.validation.Valid;
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
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="\"pacientes\"")
public class Paciente implements Serializable {
    
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
    
    @Column(name="\"fechaNacimiento\"", nullable=false)
    @Temporal(javax.persistence.TemporalType.DATE)
    @PastOrPresent(message = "Fecha incorrecta")
    private Date fechaNacimiento;
    
    @Column(name="\"EPS\"", nullable=false)
    @NotBlank(message = "Campo requerido")
    @Size(max = 255, message = "Se ha excedido el límite de caracteres")
    private String eps;
    
    @Lob
    @Basic(fetch=FetchType.LAZY)
    @Column(name="\"historiaClinica\"", nullable=true, columnDefinition="CLOB")
    private String historiaClinica;
    
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy="paciente", orphanRemoval=true)
    @Valid
    List<Cita> citas = new ArrayList<>();
}
