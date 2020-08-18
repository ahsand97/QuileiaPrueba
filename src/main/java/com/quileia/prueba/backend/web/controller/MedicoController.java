/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.web.controller;

import com.quileia.prueba.backend.service.MedicoService;
import com.quileia.prueba.backend.web.dto.MedicoDTO;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ahsan
 */
@RestController
@CrossOrigin
@RequestMapping("medicos")
public class MedicoController {
    
    private final MedicoService medicoService;
    
    public MedicoController(MedicoService medicoService) {
        this.medicoService = medicoService;
    }
    
    @GetMapping()
    public ResponseEntity<?> getMedicos(){
        List<MedicoDTO> resp = medicoService.getMedicos();
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getMedico(@PathVariable("id") String id){
        try{
            MedicoDTO resp = medicoService.getMedico(id);
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @GetMapping(params = "identificacion")
    public ResponseEntity<?> getMedicoByIdentificacion(@RequestParam String identificacion){
        try{
            MedicoDTO resp = medicoService.getMedicoByIdentificacion(identificacion);
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @GetMapping("/{id}/horas")
    public ResponseEntity<?> getHorasDisponibles(@PathVariable("id") String id){
        try{
            List<String> resp = medicoService.getHorasDisponibles(id);
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @PostMapping()
    public ResponseEntity<?> addMedico(@Valid @RequestBody MedicoDTO medicoDTO, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Formulario con datos incorrectos.");
        }
        else{
            try{
                MedicoDTO resp = medicoService.addMedico(medicoDTO);
                return ResponseEntity.status(HttpStatus.CREATED).body(resp);
            }
            catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMedico(@PathVariable("id") String id, @Valid @RequestBody MedicoDTO medicoDTO, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Formulario con datos incorrectos.");
        }
        else{
            try{
                MedicoDTO resp = medicoService.updateMedico(id, medicoDTO);
                return ResponseEntity.status(HttpStatus.OK).body(resp);
            }
            catch (Exception e){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMedico(@PathVariable("id") String id){
        try{
            MedicoDTO resp = medicoService.deleteMedico(id);
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
