/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.service;

import com.quileia.prueba.backend.data.entity.Cita;
import com.quileia.prueba.backend.data.entity.Medico;
import com.quileia.prueba.backend.data.repository.MedicoRepository;
import com.quileia.prueba.backend.service.mapper.MedicoMapper;
import com.quileia.prueba.backend.web.dto.MedicoDTO;
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
        if(!medico.isPresent()){
            throw new Exception("Médico no encontrado en el sistema.");
        }
        else{
            MedicoDTO resp = medicoMapper.fromMedico(medico.get());
            return resp;
        }
    }
    
    public MedicoDTO getMedicoByIdentificacion(String identificacion) throws Exception {
        Optional<Medico> medico = medicoRepository.findByIdentificacion(identificacion);
        if(!medico.isPresent()){
            throw new Exception("Médico no encontrado en el sistema.");
        }
        else{
            MedicoDTO resp = medicoMapper.fromMedico(medico.get());
            return resp;
        }
    }
    
    public List<String> getHorasDisponibles(String id) throws Exception {
        Optional<Medico> medico = medicoRepository.findById(Long.valueOf(id));
        if(!medico.isPresent()){
            throw new Exception("Médico no encontrado en el sistema.");
        }
        else{
            List<String> horasDisponiblesAM = new ArrayList<>();
            horasDisponiblesAM.add("12:00 A.M");
            for(int i = 1; i < 12; i++){
                String hora = String.valueOf(i);
                if(i < 10){
                    hora = '0'+ hora;
                }
                hora = hora + ":00 A.M";
                horasDisponiblesAM.add(hora);
            }
            List<String> horasDisponiblesPM = new ArrayList<>();
            horasDisponiblesPM.add("12:00 P.M");
            for(int i = 1; i < 12; i++){
                String hora = String.valueOf(i);
                if(i < 10){
                    hora = '0'+ hora;
                }
                hora = hora + ":00 P.M";
                horasDisponiblesPM.add(hora);
            }
            List<String> horasDisponiblesResp = new ArrayList<>();
            String horaInicioAtencion = medico.get().getHoraInicioAtencion().substring(0, 2);
            String horaFinAtencion = medico.get().getHoraFinAtencion().substring(0, 2);
            String meridiemInicio = medico.get().getHoraInicioAtencion().substring(medico.get().getHoraInicioAtencion().length() - 3);
            String meridiemFinal = medico.get().getHoraFinAtencion().substring(medico.get().getHoraInicioAtencion().length() - 3);
            if(meridiemInicio.equals(meridiemFinal)){
                if("A.M".equals(meridiemInicio)){
                    for(int i = Integer.valueOf(horaInicioAtencion); i < Integer.valueOf(horaFinAtencion); i++){
                        horasDisponiblesResp.add(horasDisponiblesAM.get(i));
                    }
                }
                else if("P.M".equals(meridiemInicio)){
                    for(int i = Integer.valueOf(horaInicioAtencion); i < Integer.valueOf(horaFinAtencion); i++){
                        horasDisponiblesResp.add(horasDisponiblesPM.get(i));
                    }
                }
            }
            else{
                if("A.M".equals(meridiemInicio)){
                    for(int i = Integer.valueOf(horaInicioAtencion); i < horasDisponiblesAM.size(); i++){
                        horasDisponiblesResp.add(horasDisponiblesAM.get(i));
                    }
                    for(int i = 0; i < Integer.valueOf(horaFinAtencion); i++){
                        horasDisponiblesResp.add(horasDisponiblesPM.get(i));
                    }
                }
                else if("P.M".equals(meridiemInicio)){
                    for(int i = 0; i < Integer.valueOf(horaFinAtencion); i++){
                        horasDisponiblesResp.add(horasDisponiblesAM.get(i));
                    }
                    for(int i = Integer.valueOf(horaInicioAtencion); i < horasDisponiblesPM.size(); i++){
                        horasDisponiblesResp.add(horasDisponiblesPM.get(i));
                    }
                }
            }
            Iterator<Cita> citas = medico.get().getCitas().iterator();
            while(citas.hasNext()){
                Cita cita = citas.next();
                for(int i = 0; i < horasDisponiblesResp.size(); i++){
                    if(cita.getHora().equals(horasDisponiblesResp.get(i))){
                        horasDisponiblesResp.remove(i);
                    }
                }
            }
            return horasDisponiblesResp;
        }
    }
    
    public MedicoDTO addMedico(MedicoDTO medicoDTO) throws Exception {
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
    
    public MedicoDTO updateMedico(String id, MedicoDTO medicoDTO) throws Exception {
        Optional<Medico> medicoFromDB = medicoRepository.findById(Long.valueOf(id));
        if(!medicoFromDB.isPresent()){
            throw new Exception("Médico no encontrado en el sistema.");
        }
        else{
            Medico medico = medicoFromDB.get();
            Optional<Medico> aux = medicoRepository.findByIdentificacion(medicoDTO.getIdentificacion());
            if(aux.isPresent()){
                if(aux.get().getId() != medico.getId()){
                    throw new Exception("Ya existe un médico con ese número de identificación en el sistema.");
                }
            }
            Optional<Medico> auxDos = medicoRepository.findByNumeroTarjetaProfesional(medicoDTO.getNumeroTarjetaProfesional());
            if(auxDos.isPresent()){
                if(auxDos.get().getId() != medico.getId()){
                    throw new Exception("Ya existe un médico con ese número de tarjeta profesional en el sistema.");
                }
            }
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
    
    public MedicoDTO deleteMedico(String id) throws Exception{
        Optional<Medico> medico = medicoRepository.findById(Long.valueOf(id));
        if(!medico.isPresent()){
            throw new Exception("Médico no encontrado en el sistema.");
        }
        else{
            MedicoDTO resp = medicoMapper.fromMedico(medico.get());
            medicoRepository.delete(medico.get());
            return resp;
        }
    }
}
