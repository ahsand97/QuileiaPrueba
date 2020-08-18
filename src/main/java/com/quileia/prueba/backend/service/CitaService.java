/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.service;

import com.quileia.prueba.backend.data.entity.Cita;
import com.quileia.prueba.backend.data.entity.Medico;
import com.quileia.prueba.backend.data.entity.Paciente;
import com.quileia.prueba.backend.data.repository.CitaRepository;
import com.quileia.prueba.backend.data.repository.MedicoRepository;
import com.quileia.prueba.backend.data.repository.PacienteRepository;
import com.quileia.prueba.backend.service.mapper.CitaMapper;
import com.quileia.prueba.backend.service.mapper.MedicoMapper;
import com.quileia.prueba.backend.service.mapper.PacienteMapper;
import com.quileia.prueba.backend.web.dto.CitaDTO;
import com.quileia.prueba.backend.web.dto.MedicoDTO;
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
public class CitaService {
    
    private final CitaRepository citaRepository;
    private final MedicoRepository medicoRepository;
    private final PacienteRepository pacienteRepository;
    
    @Autowired
    private final MedicoMapper medicoMapper;
    
    @Autowired
    private final PacienteMapper pacienteMapper;
    
    @Autowired
    private final CitaMapper citaMapper;
    
    @Autowired
    private final MedicoService medicoService;
    
    public List<CitaDTO> getCitas(){
        Iterator<Cita> citas = citaRepository.findAll().iterator();
        List<CitaDTO> resp = new ArrayList<>();
        while(citas.hasNext()){
            Cita cita = citas.next();
            MedicoDTO medicoRelated = medicoMapper.fromMedico(cita.getMedico());
            PacienteDTO pacienteRelated = pacienteMapper.fromPaciente(cita.getPaciente());
            CitaDTO citaDTO = citaMapper.fromCita(cita);
            citaDTO.setMedico(medicoRelated);
            citaDTO.setPaciente(pacienteRelated);
            resp.add(citaDTO);
        }
        return resp;
    }

    public CitaDTO getCita(String id) throws Exception {
        Optional<Cita> cita = citaRepository.findById(Long.valueOf(id));
        if(!cita.isPresent()){
            throw new Exception("Cita no encontrada en el sistema.");
        }
        else{
            CitaDTO resp = citaMapper.fromCita(cita.get());
            MedicoDTO medicoRelated = medicoMapper.fromMedico(cita.get().getMedico());
            PacienteDTO pacienteRelated = pacienteMapper.fromPaciente(cita.get().getPaciente());
            resp.setMedico(medicoRelated);
            resp.setPaciente(pacienteRelated);
            return resp;
        }
    }
    
    public CitaDTO deleteCita(String id) throws Exception{
        Optional<Cita> cita = citaRepository.findById(Long.valueOf(id));
        if(!cita.isPresent()){
            throw new Exception("Cita no enontrada en el sistema.");
        }
        else{
            CitaDTO resp = citaMapper.fromCita(cita.get());
            MedicoDTO medicoRelated = medicoMapper.fromMedico(cita.get().getMedico());
            PacienteDTO pacienteRelated = pacienteMapper.fromPaciente(cita.get().getPaciente());
            resp.setMedico(medicoRelated);
            resp.setPaciente(pacienteRelated);
            citaRepository.delete(cita.get());
            return resp;
        }
    }
    
    public CitaDTO addCita(CitaDTO citaDTO) throws Exception{
        Optional<Medico> medicoRelated = medicoRepository.findById(citaDTO.getMedico().getId());
        Optional<Paciente> pacienteRelated = pacienteRepository.findById(citaDTO.getPaciente().getId());
        if(!medicoRelated.isPresent()){
            throw new Exception("Médico no encontrado en el sistema.");
        }
        else if(!pacienteRelated.isPresent()){
            throw new Exception("Paciente no encontrado en el sistema.");
        }
        else{
            int i = 0;
            List<String> horasDisponiblesMedicoRelated = medicoService.getHorasDisponibles(String.valueOf(medicoRelated.get().getId()));
            for (String s : horasDisponiblesMedicoRelated) {
                if(s.equals(citaDTO.getHora())){
                    i = i+1;
                }
            }
            if(i == 0){
                throw new Exception("Hora de cita no disponible.");
            }
            else{
                Cita citaToDB = citaMapper.toCita(citaDTO);
                citaToDB.setMedico(medicoRelated.get());
                citaToDB.setPaciente(pacienteRelated.get());
                Cita responseFromDB = citaRepository.save(citaToDB);
                CitaDTO resp = citaMapper.fromCita(responseFromDB);
                MedicoDTO medicoRelatedResp = medicoMapper.fromMedico(medicoRelated.get());
                PacienteDTO pacienteRelatedResp = pacienteMapper.fromPaciente(pacienteRelated.get());
                resp.setMedico(medicoRelatedResp);
                resp.setPaciente(pacienteRelatedResp);
                return resp;
            }
        }
    }
}
