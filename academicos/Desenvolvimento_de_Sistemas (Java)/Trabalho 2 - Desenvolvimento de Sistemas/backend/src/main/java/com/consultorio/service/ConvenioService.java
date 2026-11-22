package com.consultorio.service;

import com.consultorio.exception.ConflitoException;
import com.consultorio.exception.RecursoNaoEncontradoException;
import com.consultorio.model.Convenio;
import com.consultorio.repository.ConvenioRepository;
import com.consultorio.repository.PacienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ConvenioService {

    private final ConvenioRepository convenioRepository;
    private final PacienteRepository pacienteRepository;

    public ConvenioService(ConvenioRepository convenioRepository, PacienteRepository pacienteRepository) {
        this.convenioRepository = convenioRepository;
        this.pacienteRepository = pacienteRepository;
    }

    public List<Convenio> listar() {
        return convenioRepository.findAllByOrderByNomeAsc();
    }

    public Convenio buscarPorId(Long id) {
        return convenioRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Convênio com id " + id + " não encontrado"));
    }

    @Transactional
    public Convenio criar(Convenio convenio) {
        String nome = convenio.getNome().trim();
        if (convenioRepository.existsByNomeIgnoreCase(nome)) {
            throw new ConflitoException("Já existe um convênio com o nome " + nome);
        }
        convenio.setId(null);
        convenio.setNome(nome);
        return convenioRepository.save(convenio);
    }

    @Transactional
    public void remover(Long id) {
        Convenio convenio = buscarPorId(id);
        long vinculados = pacienteRepository.countByConvenioId(id);
        if (vinculados > 0) {
            throw new ConflitoException("Não é possível excluir o convênio " + convenio.getNome()
                    + ": existem " + vinculados + " paciente(s) vinculado(s) a ele");
        }
        convenioRepository.delete(convenio);
    }
}
