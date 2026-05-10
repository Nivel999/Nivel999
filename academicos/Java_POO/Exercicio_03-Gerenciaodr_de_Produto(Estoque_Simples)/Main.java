/*
Crie uma classe principal (Main) para testar sua classe Produto. Instancie um produto, adicione estoque, tente vender uma quantidade válida, tente vender uma quantidade maior que o estoque e exiba o resumo ao final.
Teste as possibilidades positivas, negativas e casos extremos.
*/

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Produto produto = new Produto();

        /*
        Coloquei a opção de entrada do nome do produto, para testar a validação do nome.
        Não fiz com os demais, pois seria muito trabalhoso para testar as validações, mas o processo seria o mesmo.
        */

        //caso 1 - produto 1
        // caso coloque nome vazio ou nulo, ele não vai setar o nome, e o nome do produto vai continuar null ou vazio.
        System.out.println("Produto 1 - caso 1:");
        System.out.println("Digite o nome do produto:");
        Scanner scanner = new Scanner(System.in);
        String nome = scanner.nextLine();
        produto.setNome(nome);
        produto.setPreco(29.99);
        produto.adicionarEstoque(100);
        produto.vender(100);
        produto.exibirResumo();

      
        //caso 2 - produto 1
        //caso coloque quantidade negativa, ele não vai adicionar ao estoque, e o estoque atual vai continuar o mesmo.
        System.out.println("Produto 1 - caso 2:");
        produto.adicionarEstoque(-100);
        produto.exibirResumo();

        //caso 3 - produto 1
        //caso coloque quantidade maior que o estoque, ele não vai fazer a venda, e o estoque atual vai continuar o mesmo.
        System.out.println("Produto 1 - caso 3:");
        produto.vender(200);
        produto.exibirResumo();



        System.out.println("Produto 2:");

        //caso 1 - produto 2
        Produto produto2 = new Produto("Jogo de panelas", 199.90);
        produto2.adicionarEstoque(250);
        // Colocar tanto quantidade negativo quando positivo, ele vai fazer a venda (subtração)
        produto2.vender(25);
        produto2.exibirResumo();


    }
}