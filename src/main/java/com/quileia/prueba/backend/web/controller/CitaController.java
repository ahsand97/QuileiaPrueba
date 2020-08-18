/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.quileia.prueba.backend.web.controller;

import com.quileia.prueba.backend.service.CitaService;
import com.quileia.prueba.backend.web.dto.CitaDTO;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ahsan
 */
@RestController
@CrossOrigin
@RequestMapping("citas")
public class CitaController {
    
    private final CitaService citaService;
    
    public CitaController(CitaService citaService){
        this.citaService = citaService;
    }
    
    @GetMapping
    public ResponseEntity<?> getCitas(){
        List<CitaDTO> resp = citaService.getCitas();
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getCita(@PathVariable("id") String id){
        try{
            CitaDTO resp = citaService.getCita(id);
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCita(@PathVariable("id") String id){
        try{
            CitaDTO resp = citaService.deleteCita(id);
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping()
    public ResponseEntity<?> addCita(@Valid @RequestBody CitaDTO citaDTO, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Formulario con datos incorrectos.");
        }
        else{
            try{
                CitaDTO resp = citaService.addCita(citaDTO);
                return ResponseEntity.status(HttpStatus.CREATED).body(resp);
            }
            catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
        }
    }
}
