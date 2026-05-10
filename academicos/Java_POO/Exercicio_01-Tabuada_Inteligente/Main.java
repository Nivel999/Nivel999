import java.util.Scanner;

public class Main {  
    /*
    Escreva um programa em Java que peça ao usuário para digitar um número inteiro positivo. 
    O programa deve calcular e exibir a tabuada de 1 a 10 desse número. 
    No entanto, o programa possui duas regras adicionais:
    1. Se o usuário digitar um número negativo ou zero, o programa deve exibir uma mensagem de erro: 
    "Número inválido. Por favor, digite um número maior que zero." e encerrar. 
    2. Ao imprimir a tabuada, o programa deve informar, 
    ao lado de cada resultado, se aquele valor é "Par" ou "Ímpar".
    */
    
    
    public static void main(String[] args) {
        Scanner num = new Scanner(System.in);
        System.out.print("Digite um número inteiro:");
        int numero = num.nextInt();
        for (int a = 1; a <= 10; a++) {
            if (numero <= 0) {
                System.out.println("Não é permitido número negativos ou zero.");
                break;
            } else {
                int resultado = numero * a;
                String parOuImpar = (resultado % 2 == 0) ? "Par" : "Ímpar";
                System.out.println(numero + " x " + a + " = " + resultado + " - " + parOuImpar);
            }
        }
    }
}