/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.data.repository;

import com.quileia.prueba.backend.data.entity.Paciente;
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
public interface PacienteRepository extends CrudRepository<Paciente, Long> {
    
    @Query(value="SELECT * FROM \"pacientes\" WHERE \"identificacion\" = :identificacion", nativeQuery=true)       
    Optional<Paciente> findByIdentificacion(@Param("identificacion") String identificacion);
}
