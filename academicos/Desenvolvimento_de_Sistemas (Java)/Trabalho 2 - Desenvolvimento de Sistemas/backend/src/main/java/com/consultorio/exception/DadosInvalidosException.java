package com.consultorio.exception;

/**
 * Erro de dados enviado pelo cliente que não é coberto pelas anotações de validação
 * (ex.: convênio inexistente). Gera 400 Bad Request com o campo afetado.
 */
public class DadosInvalidosException extends RuntimeException {

    private final String campo;

    public DadosInvalidosException(String campo, String mensagem) {
        super(mensagem);
        this.campo = campo;
    }

    public String getCampo() {
        return campo;
    }
}
