package com.consultorio.controller;

import com.consultorio.model.Convenio;
import com.consultorio.service.ConvenioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/convenios")
public class ConvenioController {

    private final ConvenioService service;

    public ConvenioController(ConvenioService service) {
        this.service = service;
    }

    @GetMapping
    public List<Convenio> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Convenio buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public ResponseEntity<Convenio> criar(@Valid @RequestBody Convenio convenio) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(convenio));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }
}
