public class Main {

    public static void main(String[] args) {
        GatewayPagamento gateway = new GatewayPagamento();

        Pagamento pix = new PagamentoPix(150.00, "email@exemplo.com");
        Pagamento cartao = new PagamentoCartao(6000.00, "1234 5678 9012 3456", "Fulano da Silva");

        gateway.realizarCobranca(pix);
        System.out.println();
        gateway.realizarCobranca(cartao);
    }
}
