package com.consultorio.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> tratarValidacao(MethodArgumentNotValidException ex) {
        Map<String, String> erros = new LinkedHashMap<>();
        // Um campo pode ter mais de um erro (ex.: nome vazio viola @NotBlank e @Size).
        // Mostramos um por campo, dando prioridade à mensagem de "obrigatório".
        ex.getBindingResult().getFieldErrors().forEach(erro -> {
            boolean obrigatorio = "NotBlank".equals(erro.getCode()) || "NotNull".equals(erro.getCode());
            if (obrigatorio) {
                erros.put(erro.getField(), erro.getDefaultMessage());
            } else {
                erros.putIfAbsent(erro.getField(), erro.getDefaultMessage());
            }
        });

        Map<String, Object> corpo = criarCorpo(HttpStatus.BAD_REQUEST, "Erro de validação");
        corpo.put("campos", erros);
        return ResponseEntity.badRequest().body(corpo);
    }

    @ExceptionHandler(DadosInvalidosException.class)
    public ResponseEntity<Map<String, Object>> tratarDadosInvalidos(DadosInvalidosException ex) {
        Map<String, Object> corpo = criarCorpo(HttpStatus.BAD_REQUEST, "Erro de validação");
        corpo.put("campos", Map.of(ex.getCampo(), ex.getMessage()));
        return ResponseEntity.badRequest().body(corpo);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> tratarJsonInvalido(HttpMessageNotReadableException ex) {
        return ResponseEntity.badRequest()
                .body(criarCorpo(HttpStatus.BAD_REQUEST, "Corpo da requisição inválido (verifique o formato dos campos)"));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Map<String, Object>> tratarParametroInvalido(MethodArgumentTypeMismatchException ex) {
        return ResponseEntity.badRequest()
                .body(criarCorpo(HttpStatus.BAD_REQUEST, "Parâmetro inválido: " + ex.getName()));
    }

    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public ResponseEntity<Map<String, Object>> tratarNaoEncontrado(RecursoNaoEncontradoException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(criarCorpo(HttpStatus.NOT_FOUND, ex.getMessage()));
    }

    @ExceptionHandler(ConflitoException.class)
    public ResponseEntity<Map<String, Object>> tratarConflito(ConflitoException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(criarCorpo(HttpStatus.CONFLICT, ex.getMessage()));
    }

    // Rede de segurança: violação de chave estrangeira/única que passou pelas checagens do serviço.
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> tratarIntegridade(DataIntegrityViolationException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(criarCorpo(HttpStatus.CONFLICT, "Operação viola a integridade dos dados (registro vinculado ou duplicado)"));
    }

    private Map<String, Object> criarCorpo(HttpStatus status, String mensagem) {
        Map<String, Object> corpo = new LinkedHashMap<>();
        corpo.put("timestamp", LocalDateTime.now());
        corpo.put("status", status.value());
        corpo.put("erro", status.getReasonPhrase());
        corpo.put("mensagem", mensagem);
        return corpo;
    }
}
