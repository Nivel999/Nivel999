/*
2. Faça um programa que imprime todos os números entre 30 e 5 (nesta ordem)
divisíveis por 3, e no final imprime sua soma.
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

int main(int){
    setlocale(LC_ALL, "Portuguese");

    int N, calculador = 0, soma;

    for (N = 30; N >= 5; N--)
    {
        if (N%3 == 0)
        {
            printf("sub-> %d \n", N);
            calculador += N;
        }
    }
    printf("A soma dos numeros divisiveis por 3 -> %d", calculador);
    

    

}
