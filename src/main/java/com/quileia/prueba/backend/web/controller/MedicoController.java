/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.web.controller;

import com.quileia.prueba.backend.service.MedicoService;
import com.quileia.prueba.backend.web.dto.MedicoDTO;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    
    @PostMapping()
    public ResponseEntity<?> addMedico(@RequestBody MedicoDTO medicoDTO){
        try{
            MedicoDTO resp = medicoService.addMedico(medicoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(resp);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMedico(@PathVariable("id") String id, @RequestBody MedicoDTO medicoDTO){
        try{
            MedicoDTO resp = medicoService.updateMedico(medicoDTO);
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @DeleteMapping("{id}")
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
