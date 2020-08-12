/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.data.repository;

import com.quileia.prueba.backend.data.entity.Medico;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ahsan
 */
@Repository
public interface MedicoRepository extends CrudRepository<Medico, Long> {
    
    @Query(value="SELECT * FROM \"medicos\" WHERE \"identificacion\" = :identificacion", nativeQuery=true)       
    Optional<Medico> findByIdentificacion(@Param("identificacion") String identificacion);
   
    @Query(value="SELECT * FROM \"medicos\" WHERE \"numeroTarjetaProfesional\" = :numeroTarjetaProfesional", nativeQuery=true)       
    Optional<Medico> findByNumeroTarjetaProfesional(@Param("numeroTarjetaProfesional") String numeroTarjetaProfesional);
}
