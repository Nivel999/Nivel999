package com.suaapi.controller;

import com.suaapi.model.Livro;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/livros")
public class LivroController {

    // "Banco de dados" em memória
    private List<Livro> livros;

    public LivroController() {
        livros = new ArrayList<>();
        livros.add(new Livro(1, "Dom Casmurro", "Machado de Assis", 1899));
        livros.add(new Livro(2, "O Cortiço", "Aluísio Azevedo", 1890));
    }

    // GET /livros -> retorna todos os livros (200 OK)
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Livro> listarLivros() {
        return livros;
    }

    // POST /livros -> cadastra um novo livro (201 CREATED)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Livro cadastrarLivro(@RequestBody Livro livro) {
        livro.setId(livros.size() + 1);
        livros.add(livro);
        return livro;
    }
}
