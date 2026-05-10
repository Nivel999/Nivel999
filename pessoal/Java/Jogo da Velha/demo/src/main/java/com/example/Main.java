public class Main {
    public static void main(String[] args) {
        // Sua tabela de char que está na Main
        char[][] minhaTabela = {
            {'X', ' ', 'O'},
            {' ', 'X', ' '},
            {'O', ' ', 'X'}
        };

        // Instancia o armazenador
        GerenciadorDados gd = new GerenciadorDados();

        // Salva a tabela
        gd.salvarTabela(minhaTabela, "tabuleiro.json");
    }
}