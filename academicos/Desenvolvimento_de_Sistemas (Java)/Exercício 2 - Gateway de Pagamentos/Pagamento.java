import java.util.UUID;

public abstract class Pagamento {

    protected String idTransacao;
    protected double valor;
    protected String status;

    public Pagamento(double valor) {
        this.idTransacao = "TX-" + UUID.randomUUID();
        this.valor = valor;
        this.status = "PENDENTE";
    }

    public void imprimirRecibo() {
        System.out.println("Recibo [id=" + idTransacao + ", valor=R$ " + valor + ", status=" + status + "]");
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public abstract boolean processar();
}
