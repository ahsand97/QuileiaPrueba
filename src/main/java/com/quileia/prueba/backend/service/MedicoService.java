/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.service;

import com.quileia.prueba.backend.data.entity.Medico;
import com.quileia.prueba.backend.data.repository.MedicoRepository;
import com.quileia.prueba.backend.service.mapper.MedicoMapper;
import com.quileia.prueba.backend.web.dto.MedicoDTO;
import java.math.BigDecimal;
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
public class MedicoService {
    
    private final MedicoRepository medicoRepository;
    
    @Autowired
    private final MedicoMapper medicoMapper;
    
    public Boolean medicoDTOHasNullOrBlankOrEmptyFields(MedicoDTO medicoDTO){
        String nombre = medicoDTO.getNombre();
        String identificacion = medicoDTO.getIdentificacion();
        String tipoIdentificacion = medicoDTO.getTipoIdentificacion();
        String numeroTarjetaProfesional = medicoDTO.getNumeroTarjetaProfesional();
        BigDecimal anosExperiencia = medicoDTO.getAnosExperiencia();
        String especialidad = medicoDTO.getEspecialidad();
        String horaInicioAtencion = medicoDTO.getHoraInicioAtencion();
        String horaFinAtencion = medicoDTO.getHoraFinAtencion();
        
        Boolean resp = false;

        if(nombre == null || nombre.isBlank() || nombre.isEmpty()){
            resp = true;
        }
        else if(identificacion == null || identificacion.isBlank() || identificacion.isEmpty()){
            resp = true;
        }
        else if(tipoIdentificacion == null || tipoIdentificacion.isBlank() || tipoIdentificacion.isEmpty()){
            resp = true;
        }
        else if(numeroTarjetaProfesional == null || numeroTarjetaProfesional.isBlank() || numeroTarjetaProfesional.isEmpty()){
            resp = true;
        }
        else if(anosExperiencia == null){
            resp = true;
        }
        else if(especialidad == null || especialidad.isBlank() || especialidad.isEmpty()){
            resp = true;
        }
        else if(horaInicioAtencion == null || horaInicioAtencion.isBlank() || horaInicioAtencion.isEmpty()){
            resp = true;
        }
        else if(horaFinAtencion == null || horaFinAtencion.isBlank() || horaFinAtencion.isEmpty()){
            resp = true;
        }
        return resp;
    }
    
    public List<MedicoDTO> getMedicos() {
        Iterator<Medico> medicos = medicoRepository.findAll().iterator();
        List<MedicoDTO> resp = new ArrayList<>();
        while(medicos.hasNext()){
            Medico medico = medicos.next();
            MedicoDTO medicoDTO = medicoMapper.fromMedico(medico);
            resp.add(medicoDTO);
        }
        return resp;
    }
    
    public MedicoDTO getMedico(String id) throws Exception {
        Optional<Medico> medico = medicoRepository.findById(Long.valueOf(id));
        if(medico.isEmpty()){
            throw new Exception("Médico no encontrado en el sistema.");
        }
        else{
            MedicoDTO resp = medicoMapper.fromMedico(medico.get());
            return resp;
        }
    }
    
    public MedicoDTO addMedico(MedicoDTO medicoDTO) throws Exception {
        if(medicoDTOHasNullOrBlankOrEmptyFields(medicoDTO) == true){
            throw new Exception("Faltan datos!");
        }
        else{
            if(medicoRepository.findByIdentificacion(medicoDTO.getIdentificacion()).isPresent()){
                throw new Exception("Ya existe un médico con ese número de identificación en el sistema.");
            }
            else if(medicoRepository.findByNumeroTarjetaProfesional(medicoDTO.getNumeroTarjetaProfesional()).isPresent()){
                throw new Exception("Ya existe un médico con ese número de tarjeta profesional en el sistema.");
            }
            else{
                Medico medicoToDB = medicoMapper.toMedico(medicoDTO);
                Medico responseFromDB = medicoRepository.save(medicoToDB);
                MedicoDTO resp = medicoMapper.fromMedico(responseFromDB);
                return resp;
            }
        }
    }
    
    public MedicoDTO updateMedico(String id, MedicoDTO medicoDTO) throws Exception {
        if(medicoDTOHasNullOrBlankOrEmptyFields(medicoDTO) == true){
            throw new Exception("Faltan datos!");
        }
        else{
            Optional<Medico> medicoFromDB = medicoRepository.findById(Long.valueOf(id));
            if(medicoFromDB.isEmpty()){
                throw new Exception("Médico no encontrado en el sistema.");
            }
            else{
                Medico medico = medicoFromDB.get();
                medico.setNombre(medicoDTO.getNombre());
                medico.setIdentificacion(medicoDTO.getIdentificacion());
                medico.setTipoIdentificacion(medicoDTO.getTipoIdentificacion());
                medico.setNumeroTarjetaProfesional(medicoDTO.getNumeroTarjetaProfesional());
                medico.setAnosExperiencia(medicoDTO.getAnosExperiencia());
                medico.setEspecialidad(medicoDTO.getEspecialidad());
                medico.setHoraInicioAtencion(medicoDTO.getHoraInicioAtencion());
                medico.setHoraFinAtencion(medicoDTO.getHoraFinAtencion());
                
                Medico responseFromDB = medicoRepository.save(medico);
                MedicoDTO resp = medicoMapper.fromMedico(responseFromDB);
                return resp;
            }
        }
    }
    
    public MedicoDTO deleteMedico(String id) throws Exception{
        Medico medico = medicoRepository.findById(Long.valueOf(id)).get();
        if(medico == null){
            throw new Exception("Médico no encontrado en el sistema.");
        }
        else{
            MedicoDTO resp = medicoMapper.fromMedico(medico);
            medicoRepository.delete(medico);
            return resp;
        }
    }
    
}
