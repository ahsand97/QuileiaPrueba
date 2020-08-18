/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.service.mapper;

import com.quileia.prueba.backend.data.entity.Cita;
import com.quileia.prueba.backend.web.dto.CitaDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 *
 * @author ahsan
 */
@Mapper(componentModel = "spring")
public interface CitaMapper {
    
    @Mapping(source="medico", target = "medico", ignore = true)
    @Mapping(source="paciente", target = "paciente", ignore = true)      
    Cita toCita(CitaDTO citaDTO);
    
    @InheritInverseConfiguration
    CitaDTO fromCita(Cita cita);
}
