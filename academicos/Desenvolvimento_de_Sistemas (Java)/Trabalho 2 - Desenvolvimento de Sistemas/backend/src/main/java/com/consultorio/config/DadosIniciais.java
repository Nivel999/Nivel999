package com.consultorio.config;

import com.consultorio.model.Convenio;
import com.consultorio.model.Paciente;
import com.consultorio.repository.ConvenioRepository;
import com.consultorio.repository.PacienteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

/**
 * Popula o banco com convênios (entidade secundária) e alguns pacientes de exemplo
 * ao iniciar a aplicação, caso o banco esteja vazio.
 */
@Component
public class DadosIniciais implements CommandLineRunner {

    private final ConvenioRepository convenioRepository;
    private final PacienteRepository pacienteRepository;

    public DadosIniciais(ConvenioRepository convenioRepository, PacienteRepository pacienteRepository) {
        this.convenioRepository = convenioRepository;
        this.pacienteRepository = pacienteRepository;
    }

    @Override
    public void run(String... args) {
        if (convenioRepository.count() > 0) {
            return;
        }
        List<Convenio> convenios = convenioRepository.saveAll(List.of(
                new Convenio("Particular"),
                new Convenio("Unimed"),
                new Convenio("Amil"),
                new Convenio("Bradesco Saúde"),
                new Convenio("SulAmérica")));

        pacienteRepository.save(paciente("Maria Silva", "maria@email.com", "(61) 99999-1111",
                LocalDate.of(1990, 5, 20), convenios.get(1)));
        pacienteRepository.save(paciente("João Souza", "joao@email.com", "(61) 98888-2222",
                LocalDate.of(1985, 11, 3), convenios.get(0)));
    }

    private Paciente paciente(String nome, String email, String telefone, LocalDate nascimento, Convenio convenio) {
        Paciente p = new Paciente();
        p.setNome(nome);
        p.setEmail(email);
        p.setTelefone(telefone);
        p.setDataNascimento(nascimento);
        p.setConvenio(convenio);
        return p;
    }
}
