/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.web.controller;

import com.quileia.prueba.backend.service.PacienteService;
import com.quileia.prueba.backend.web.dto.PacienteDTO;
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
@RequestMapping("pacientes")
public class PacienteController {
    
    private final PacienteService pacienteService;
    
    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }
    
    @GetMapping()
    public ResponseEntity<?> getPacientes(){
        List<PacienteDTO> resp = pacienteService.getPacientes();
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getPaciente(@PathVariable("id") String id){
        try{
            PacienteDTO resp = pacienteService.getPaciente(id);
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @GetMapping(params = "identificacion")
    public ResponseEntity<?> getPacienteByIdentificacion(@RequestParam String identificacion){
        try{
            PacienteDTO resp = pacienteService.getPacienteByIdentificacion(identificacion);
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @PostMapping()
    public ResponseEntity<?> addPaciente(@Valid @RequestBody PacienteDTO pacienteDTO, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Formulario con datos incorrectos.");
        }
        else{
            try{
                PacienteDTO resp = pacienteService.addPaciente(pacienteDTO);
                return ResponseEntity.status(HttpStatus.CREATED).body(resp);
            }
            catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePaciente(@PathVariable("id") String id, @Valid @RequestBody PacienteDTO pacienteDTO, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Formulario con datos incorrectos.");
        }
        else{
            try{
                PacienteDTO resp = pacienteService.updatePaciente(id, pacienteDTO);
                return ResponseEntity.status(HttpStatus.OK).body(resp);
            }
            catch (Exception e){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePaciente(@PathVariable("id") String id){
        try{
            PacienteDTO resp = pacienteService.deletePaciente(id);
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
