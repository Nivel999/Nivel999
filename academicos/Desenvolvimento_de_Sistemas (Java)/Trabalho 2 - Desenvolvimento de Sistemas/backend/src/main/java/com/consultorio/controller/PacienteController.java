package com.consultorio.controller;

import com.consultorio.model.Paciente;
import com.consultorio.service.PacienteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    private final PacienteService service;

    public PacienteController(PacienteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Paciente> listar(@RequestParam(required = false) String nome) {
        return service.listar(nome);
    }

    @GetMapping("/{id}")
    public Paciente buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public ResponseEntity<Paciente> criar(@Valid @RequestBody Paciente paciente) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(paciente));
    }

    @PutMapping("/{id}")
    public Paciente atualizar(@PathVariable Long id, @Valid @RequestBody Paciente dados) {
        return service.atualizar(id, dados);
    }

    @PatchMapping("/{id}")
    public Paciente atualizarParcial(@PathVariable Long id, @RequestBody Paciente dados) {
        return service.atualizarParcial(id, dados);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }
}
