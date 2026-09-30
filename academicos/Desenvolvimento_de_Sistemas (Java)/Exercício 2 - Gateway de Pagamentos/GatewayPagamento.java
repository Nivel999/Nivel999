public class GatewayPagamento {

    public void realizarCobranca(Pagamento pagamento) {
        boolean aprovado = pagamento.processar();
        pagamento.setStatus(aprovado ? "APROVADO" : "RECUSADO");
        pagamento.imprimirRecibo();
    }
}
