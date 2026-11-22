package com.consultorio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

/**
 * Entidade secundária: 1 Convênio possui N Pacientes.
 */
@Entity
public class Convenio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome do convênio é obrigatório")
    @Size(min = 2, max = 60, message = "O nome do convênio deve ter entre 2 e 60 caracteres")
    @Column(nullable = false, unique = true, length = 60)
    private String nome;

    // Lado inverso do relacionamento. @JsonIgnore evita o loop infinito
    // Convenio -> Pacientes -> Convenio ... na serialização do JSON.
    @JsonIgnore
    @OneToMany(mappedBy = "convenio")
    private List<Paciente> pacientes = new ArrayList<>();

    public Convenio() {
    }

    public Convenio(String nome) {
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<Paciente> getPacientes() {
        return pacientes;
    }

    public void setPacientes(List<Paciente> pacientes) {
        this.pacientes = pacientes;
    }
}
