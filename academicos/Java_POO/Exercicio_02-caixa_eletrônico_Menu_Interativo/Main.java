import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner Scanner = new Scanner (System.in);
        float saldo = 500;
        float deposito = 0;
        float saque = 0;
        



        while (1 > 0) { 
            

            //Pedi para o Gemini apenas criar essa tela que vai ser aberta no terminal o resto foi feito por mim.


            System.out.println("+────────────────────────────────────────+");
            System.out.println("│                                        │");
            System.out.println("│               BANCO DIGITAL            │");
            System.out.println("│                                        │");
            System.out.println("├────────────────────────────────────────┤");
            System.out.println("│                                        │");
            System.out.println("│   Como podemos te ajudar hoje?         │");
            System.out.println("│                                        │");
            System.out.println("│   [ 1 ] Consultar Saldo                │");
            System.out.println("│   [ 2 ] Realizar Depósito              │");
            System.out.println("│   [ 3 ] Realizar Saque                 │");
            System.out.println("│   [ 4 ] Sair                           │");
            System.out.println("│                                        │");
            System.out.println("+────────────────────────────────────────+");


            System.out.print("Digite sua opção: ");                        
            int opcao = Scanner.nextInt();
            
            switch (opcao) {
                //Visualizar o valor do saldo
                case 1:
                    System.out.println("Seu saldo é esse:" + saldo);
                    break;
                //Visualizar o valor do saldo e depositar
                case 2:
                    System.out.println("Você tem o saldo atual é de: " + saldo);
                    System.out.println("Quanto deseja depositar: ");
                    deposito = Scanner.nextFloat();
                    if (deposito < 0){
                        System.out.println("valor negativo ou inválido");
                    }
                    else {
                        saldo += deposito;
                        System.out.println("Deposito feito com sucesso e atualizado");
                    }
                    break;
                // realizar o saque
                case 3:
                    System.out.println("saldo atual é de: " + saldo);
                    System.out.println("Quanto deseja sacar: ");
                    saque = Scanner.nextFloat();
                    if (saque > saldo || saque < 0){
                        System.out.println("saque inválido ou negado");
                    }
                    else {
                        saldo -= saque;
                        System.out.println("saque feito com sucesso, saldo debitado da sua conta");
                    }
                    break;
                // Sair do loop
                case 4:
                    return;
            }
        }
    }

}