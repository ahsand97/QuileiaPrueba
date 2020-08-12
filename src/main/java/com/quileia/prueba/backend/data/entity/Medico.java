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
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
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
@Table(name="\"medicos\"")
public class Medico implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="\"id\"", nullable=false)
    private Long id;
    
    @Column(name="\"nombre\"", nullable=false)
    private String nombre;
    
    @Column(name="\"identificacion\"", nullable=false)
    private String identificacion;
    
    @Column(name="\"tipoIdentificacion\"", nullable=false)
    private String tipoIdentificacion;
    
    @Column(name="\"numeroTarjetaProfesional\"", nullable=false)
    private String numeroTarjetaProfesional;
    
    @Column(name="\"anosExperiencia\"", nullable=false)
    private BigDecimal anosExperiencia;
    
    @Column(name="\"especialidad\"", nullable=false)
    private String especialidad;
    
    @Column(name="\"horaInicioAtencion\"", nullable=false)
    private String horaInicioAtencion;
    
    @Column(name="\"horaFinAtencion\"", nullable=false)
    private String horaFinAtencion;
    
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="\"medico_id\"")
    List<Cita> citas;
    
    public boolean addCita(Cita cita) {
        if(citas == null){
            citas = new ArrayList<>();
        }
        return citas.add(cita);
    }
}
