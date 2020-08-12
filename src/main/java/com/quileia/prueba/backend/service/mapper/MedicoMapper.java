/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.service.mapper;

import com.quileia.prueba.backend.data.entity.Medico;
import com.quileia.prueba.backend.web.dto.MedicoDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
/**
 *
 * @author ahsan
 */
@Mapper(componentModel = "spring")
public interface MedicoMapper {
    
    Medico toMedico(MedicoDTO medicoDTO);
    
    @InheritInverseConfiguration
    MedicoDTO fromMedico(Medico medico);
}
