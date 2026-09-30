public class PagamentoPix extends Pagamento {

    private String chavePix;

    public PagamentoPix(double valor, String chavePix) {
        super(valor);
        this.chavePix = chavePix;
    }

    @Override
    public boolean processar() {
        System.out.println("Gerando QR Code para o PIX...");
        return true;
    }
}
