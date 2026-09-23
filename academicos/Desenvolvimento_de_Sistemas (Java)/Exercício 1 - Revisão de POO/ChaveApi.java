public class ChaveApi {

    private final String token;
    private String plano;
    private int limiteRequisicoes;
    private int requisicoesRealizadas;
    private boolean ativa;

    public ChaveApi(String token, String plano, int limiteRequisicoes) {
        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException("Token inválido.");
        }
        if (limiteRequisicoes <= 0) {
            throw new IllegalArgumentException("O limite de requisições deve ser maior que zero.");
        }
        this.token = token;
        this.plano = plano;
        this.limiteRequisicoes = limiteRequisicoes;
        this.requisicoesRealizadas = 0;
        this.ativa = true;
    }

    public void registrarChamada() {
        if (!ativa) {
            throw new IllegalStateException("Acesso negado: Chave inativa.");
        }
        if (requisicoesRealizadas >= limiteRequisicoes) {
            throw new IllegalStateException("Acesso negado: Limite de requisições excedido.");
        }
        requisicoesRealizadas++;
    }

    public void fazerUpgrade(String novoPlano, int novoLimite) {
        if (novoLimite < limiteRequisicoes) {
            throw new IllegalArgumentException("Upgrade rejeitado: o novo limite não pode ser menor que o atual.");
        }
        this.plano = novoPlano;
        this.limiteRequisicoes = novoLimite;
    }

    public void resetarCiclo() {
        requisicoesRealizadas = 0;
    }

    public void bloquearChave() {
        ativa = false;
    }

    public void desbloquearChave() {
        ativa = true;
    }

    @Override
    public String toString() {
        return "ChaveApi [token=" + token + ", plano=" + plano
                + ", requisicoes=" + requisicoesRealizadas + "/" + limiteRequisicoes
                + ", ativa=" + ativa + "]";
    }
}
