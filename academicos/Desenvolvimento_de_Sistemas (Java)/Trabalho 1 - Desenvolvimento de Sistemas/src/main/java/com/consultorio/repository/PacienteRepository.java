package com.consultorio.repository;

import com.consultorio.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    List<Paciente> findByNomeContainingIgnoreCase(String nome);

    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Long id);
}
