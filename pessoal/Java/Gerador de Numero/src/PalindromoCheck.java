import java.util.Scanner;

public class PalindromoCheck {
    static void main(String[] args) {

        Scanner palavra = new Scanner(System.in);
        int x = palavra.nextInt();
        Palindromo_maker(x);

    }
    public static void Palindromo_maker(int x) {
        if (x < 0) {
            System.out.println(x + " -> Número negativo não pode ser um palíndromo.");
            return;
        }
        //Processo caso o número for positivo
        int num = x;
        int calc = 0;
        int tamanho = String.valueOf(x).length();

        for (; 0 < tamanho; tamanho--) {
            int div = num % 10;
            calc = calc * 10 + div;
            num /= 10;
        }
        //Após fazer os calculos manda para a função CertoouErrado
        CertoouErrado(calc, x);
    }

    public static int CertoouErrado(int calc, int x) {

        //Decisão final do programa
        if (calc == x && calc > 0) {
            System.out.println(x + " -> Deu certo, esse número é um palíndromos ");
        }
        else{
            System.out.println(x + " -> Número não pode ser um palíndromos ");
        }
        //Após essa etapa ele retorna a decisão para a main e finaliza o programa

        return 0;
    }
}