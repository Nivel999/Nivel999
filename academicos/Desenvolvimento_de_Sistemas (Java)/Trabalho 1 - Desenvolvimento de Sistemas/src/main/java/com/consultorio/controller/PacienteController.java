package com.consultorio.controller;

import com.consultorio.exception.ConflitoException;
import com.consultorio.exception.RecursoNaoEncontradoException;
import com.consultorio.model.Paciente;
import com.consultorio.repository.PacienteRepository;
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

    private final PacienteRepository repository;

    public PacienteController(PacienteRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Paciente> listar(@RequestParam(required = false) String nome) {
        if (nome != null && !nome.isBlank()) {
            return repository.findByNomeContainingIgnoreCase(nome);
        }
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Paciente buscarPorId(@PathVariable Long id) {
        return buscarOuFalhar(id);
    }

    @PostMapping
    public ResponseEntity<Paciente> criar(@Valid @RequestBody Paciente paciente) {
        if (repository.existsByEmail(paciente.getEmail())) {
            throw new ConflitoException("Já existe um paciente com o email " + paciente.getEmail());
        }
        paciente.setId(null);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(paciente));
    }

    @PutMapping("/{id}")
    public Paciente atualizar(@PathVariable Long id, @Valid @RequestBody Paciente dados) {
        Paciente paciente = buscarOuFalhar(id);
        validarEmailUnico(dados.getEmail(), id);

        paciente.setNome(dados.getNome());
        paciente.setEmail(dados.getEmail());
        paciente.setTelefone(dados.getTelefone());
        paciente.setDataNascimento(dados.getDataNascimento());
        return repository.save(paciente);
    }

    @PatchMapping("/{id}")
    public Paciente atualizarParcial(@PathVariable Long id, @RequestBody Paciente dados) {
        Paciente paciente = buscarOuFalhar(id);

        if (dados.getNome() != null) {
            paciente.setNome(dados.getNome());
        }
        if (dados.getEmail() != null) {
            validarEmailUnico(dados.getEmail(), id);
            paciente.setEmail(dados.getEmail());
        }
        if (dados.getTelefone() != null) {
            paciente.setTelefone(dados.getTelefone());
        }
        if (dados.getDataNascimento() != null) {
            paciente.setDataNascimento(dados.getDataNascimento());
        }
        return repository.save(paciente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        repository.delete(buscarOuFalhar(id));
        return ResponseEntity.noContent().build();
    }

    private Paciente buscarOuFalhar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Paciente com id " + id + " não encontrado"));
    }

    private void validarEmailUnico(String email, Long id) {
        if (repository.existsByEmailAndIdNot(email, id)) {
            throw new ConflitoException("Já existe um paciente com o email " + email);
        }
    }
}
