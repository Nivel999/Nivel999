package com.consultorio.repository;

import com.consultorio.model.Convenio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConvenioRepository extends JpaRepository<Convenio, Long> {

    List<Convenio> findAllByOrderByNomeAsc();

    boolean existsByNomeIgnoreCase(String nome);
}
