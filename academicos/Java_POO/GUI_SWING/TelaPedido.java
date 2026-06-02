import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

public class TelaPedido extends JFrame {

    public TelaPedido() {
        // Configuração básicas da Janela
        setTitle("Pizzaria Vorcaro");
        setSize(600,400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        //Criar painel
        JPanel painel = new JPanel();
        JButton botaoVerificarPedido = new JButton("Verificar Pedido");

        botaoVerificarPedido.addActionListener(new ActionListener(){
            @Override
            public void actionPerformed(ActionEvent e) {
                JOptionPane.showMessageDialog(null, "Seu pedido é uma pizza grande de pepperoni");
            }
        });

        //Adicionar os Componentes
        painel.add(botaoVerificarPedido);
        add(painel);
    }
}