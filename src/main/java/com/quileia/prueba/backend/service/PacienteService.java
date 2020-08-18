/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.service;

import com.quileia.prueba.backend.data.entity.Paciente;
import com.quileia.prueba.backend.data.repository.PacienteRepository;
import com.quileia.prueba.backend.service.mapper.PacienteMapper;
import com.quileia.prueba.backend.web.dto.PacienteDTO;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ahsan
 */
@Service
@RequiredArgsConstructor
public class PacienteService {
    
    private final PacienteRepository pacienteRepository;
    
    @Autowired
    private final PacienteMapper pacienteMapper;
    
    public List<PacienteDTO> getPacientes() {
        Iterator<Paciente> pacientes = pacienteRepository.findAll().iterator();
        List<PacienteDTO> resp = new ArrayList<>();
        while(pacientes.hasNext()){
            Paciente paciente = pacientes.next();
            PacienteDTO pacienteDTO = pacienteMapper.fromPaciente(paciente);
            resp.add(pacienteDTO);
        }
        return resp;
    }
    
    public PacienteDTO getPaciente(String id) throws Exception {
        Optional<Paciente> paciente = pacienteRepository.findById(Long.valueOf(id));
        if(!paciente.isPresent()){
            throw new Exception("Paciente no encontrado en el sistema.");
        }
        else{
            PacienteDTO resp = pacienteMapper.fromPaciente(paciente.get());
            return resp;
        }
    }
    
    public PacienteDTO getPacienteByIdentificacion(String identificacion) throws Exception {
        Optional<Paciente> paciente = pacienteRepository.findByIdentificacion(identificacion);
        if(!paciente.isPresent()){
            throw new Exception("Paciente no encontrado en el sistema.");
        }
        else{
            PacienteDTO resp = pacienteMapper.fromPaciente(paciente.get());
            return resp;
        }
    }
    
    public PacienteDTO addPaciente(PacienteDTO pacienteDTO) throws Exception {
        if(pacienteRepository.findByIdentificacion(pacienteDTO.getIdentificacion()).isPresent()){
            throw new Exception("Ya existe un paciente con ese número de identificación en el sistema.");
        }
        else{
            Paciente pacienteToDB = pacienteMapper.toPaciente(pacienteDTO);
            Paciente responseFromDB = pacienteRepository.save(pacienteToDB);
            PacienteDTO resp = pacienteMapper.fromPaciente(responseFromDB);
            return resp;
        }
    }
    
    public PacienteDTO updatePaciente(String id, PacienteDTO pacienteDTO) throws Exception {
        Optional<Paciente> pacienteFromDB = pacienteRepository.findById(Long.valueOf(id));
        if(!pacienteFromDB.isPresent()){
            throw new Exception("Paciente no encontrado en el sistema.");
        }
        else{
            Paciente paciente = pacienteFromDB.get();
            Optional<Paciente> aux = pacienteRepository.findByIdentificacion(pacienteDTO.getIdentificacion());
            if(aux.isPresent()){
                if(aux.get().getId() != paciente.getId()){
                    throw new Exception("Ya existe un paciente con ese número de identificación en el sistema.");
                }
            }
            paciente.setNombre(pacienteDTO.getNombre());
            paciente.setIdentificacion(pacienteDTO.getIdentificacion());
            paciente.setTipoIdentificacion(pacienteDTO.getTipoIdentificacion());
            paciente.setFechaNacimiento(pacienteDTO.getFechaNacimiento());
            paciente.setEps(pacienteDTO.getEps());
            paciente.setHistoriaClinica(pacienteDTO.getHistoriaClinica());

            Paciente responseFromDB = pacienteRepository.save(paciente);
            PacienteDTO resp = pacienteMapper.fromPaciente(responseFromDB);
            return resp;
        }
    }
    
    public PacienteDTO deletePaciente(String id) throws Exception{
        Optional<Paciente> paciente = pacienteRepository.findById(Long.valueOf(id));
        if(!paciente.isPresent()){
            throw new Exception("Paciente no encontrado en el sistema.");
        }
        else{
            PacienteDTO resp = pacienteMapper.fromPaciente(paciente.get());
            pacienteRepository.delete(paciente.get());
            return resp;
        }
    }
}
