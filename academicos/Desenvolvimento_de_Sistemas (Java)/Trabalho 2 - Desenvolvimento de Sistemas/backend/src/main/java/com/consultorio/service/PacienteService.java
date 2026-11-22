package com.consultorio.service;

import com.consultorio.exception.ConflitoException;
import com.consultorio.exception.DadosInvalidosException;
import com.consultorio.exception.RecursoNaoEncontradoException;
import com.consultorio.model.Convenio;
import com.consultorio.model.Paciente;
import com.consultorio.repository.ConvenioRepository;
import com.consultorio.repository.PacienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;
    private final ConvenioRepository convenioRepository;

    public PacienteService(PacienteRepository pacienteRepository, ConvenioRepository convenioRepository) {
        this.pacienteRepository = pacienteRepository;
        this.convenioRepository = convenioRepository;
    }

    public List<Paciente> listar(String nome) {
        if (nome != null && !nome.isBlank()) {
            return pacienteRepository.findByNomeContainingIgnoreCase(nome);
        }
        return pacienteRepository.findAll();
    }

    public Paciente buscarPorId(Long id) {
        return pacienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Paciente com id " + id + " não encontrado"));
    }

    @Transactional
    public Paciente criar(Paciente paciente) {
        if (pacienteRepository.existsByEmail(paciente.getEmail())) {
            throw new ConflitoException("Já existe um paciente com o email " + paciente.getEmail());
        }
        paciente.setId(null);
        paciente.setConvenio(resolverConvenio(paciente.getConvenio()));
        return pacienteRepository.save(paciente);
    }

    @Transactional
    public Paciente atualizar(Long id, Paciente dados) {
        Paciente paciente = buscarPorId(id);
        validarEmailUnico(dados.getEmail(), id);

        paciente.setNome(dados.getNome());
        paciente.setEmail(dados.getEmail());
        paciente.setTelefone(dados.getTelefone());
        paciente.setDataNascimento(dados.getDataNascimento());
        paciente.setConvenio(resolverConvenio(dados.getConvenio()));
        return pacienteRepository.save(paciente);
    }

    @Transactional
    public Paciente atualizarParcial(Long id, Paciente dados) {
        Paciente paciente = buscarPorId(id);

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
        if (dados.getConvenio() != null) {
            paciente.setConvenio(resolverConvenio(dados.getConvenio()));
        }
        return pacienteRepository.save(paciente);
    }

    @Transactional
    public void remover(Long id) {
        pacienteRepository.delete(buscarPorId(id));
    }

    /**
     * O cliente envia apenas {"convenio": {"id": 1}}; aqui buscamos o convênio real no banco.
     */
    private Convenio resolverConvenio(Convenio convenio) {
        if (convenio == null || convenio.getId() == null) {
            throw new DadosInvalidosException("convenio", "O convênio é obrigatório");
        }
        return convenioRepository.findById(convenio.getId())
                .orElseThrow(() -> new DadosInvalidosException("convenio",
                        "Convênio com id " + convenio.getId() + " não existe"));
    }

    private void validarEmailUnico(String email, Long id) {
        if (pacienteRepository.existsByEmailAndIdNot(email, id)) {
            throw new ConflitoException("Já existe um paciente com o email " + email);
        }
    }
}
