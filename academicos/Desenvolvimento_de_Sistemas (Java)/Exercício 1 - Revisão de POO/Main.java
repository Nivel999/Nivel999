public class Main {

    public static void main(String[] args) {
        ChaveApi chave = new ChaveApi("abc-123", "Basic", 3);
        System.out.println("Chave criada: " + chave);

        // Chamadas dentro do limite
        chave.registrarChamada();
        chave.registrarChamada();
        chave.registrarChamada();
        System.out.println("Após 3 chamadas: " + chave);

        // Estourando o limite
        tentarChamada(chave);

        // Upgrade inválido (limite menor)
        try {
            chave.fazerUpgrade("Pro", 1);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }

        // Upgrade válido
        chave.fazerUpgrade("Pro", 10);
        System.out.println("Após upgrade: " + chave);
        tentarChamada(chave);

        // Bloqueio
        chave.bloquearChave();
        tentarChamada(chave);

        // Desbloqueio e reset do ciclo mensal
        chave.desbloquearChave();
        chave.resetarCiclo();
        System.out.println("Após desbloqueio e reset: " + chave);
    }

    private static void tentarChamada(ChaveApi chave) {
        try {
            chave.registrarChamada();
            System.out.println("Chamada registrada: " + chave);
        } catch (IllegalStateException e) {
            System.out.println(e.getMessage());
        }
    }
}
