/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.data.entity;

import java.io.Serializable;
import java.sql.Clob;
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
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.engine.jdbc.ClobProxy;

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
    private String nombre;
    
    @Column(name="\"identificacion\"", nullable=false)
    private String identificacion;
    
    @Column(name="\"tipoIdentificacion\"", nullable=false)
    private String tipoIdentificacion;
    
    @Column(name="\"fechaNacimiento\"", nullable=false)
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date fechaNacimiento;
    
    @Column(name="\"EPS\"", nullable=false)
    private String eps;
    
    @Lob
    @Basic(fetch=FetchType.LAZY)
    @Column(name="\"historiaClinica\"", nullable=true, columnDefinition="CLOB")
    private String historiaClinica;
    
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="\"paciente_id\"")
    List<Cita> citas;
    
    public boolean addCita(Cita cita) {
        if(citas == null){
            citas = new ArrayList<>();
        }
        return citas.add(cita);
    }
}
