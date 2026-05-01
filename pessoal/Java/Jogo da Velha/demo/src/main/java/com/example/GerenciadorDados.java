package com.example;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.FileWriter;
import java.io.IOException;

public class GerenciadorDados {
    // O GsonBuilder configura o JSON para ficar "bonito" (com espaços e quebras de linha)
    private final Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public void salvarTabela(char[][] tabela, String nomeArquivo) {
        try (FileWriter writer = new FileWriter(nomeArquivo)) {
            // Converte a matriz diretamente para JSON e escreve no arquivo
            gson.toJson(tabela, writer);
            System.out.println("Tabela salva em: " + nomeArquivo);
        } catch (IOException e) {
            System.err.println("Erro ao salvar os dados: " + e.getMessage());
        }
    }
}