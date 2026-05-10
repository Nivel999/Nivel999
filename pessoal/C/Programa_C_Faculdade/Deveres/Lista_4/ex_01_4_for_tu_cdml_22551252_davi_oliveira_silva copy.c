/*
1. Elaborar um programa C para computar a média de N números reais. Você receberá
um número real e irá realizar a soma dele com todos os seus antecessores até chegar
a zero
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

int main(int){
    setlocale(LC_ALL, "Portuguese");

    float N, calculador = 0;
    int media = 0;

    for (N = 0; N <= 10; N++)
    {
        printf("%.2f \n", N);
        calculador = calculador + N;
        printf("calculador - > %.2f \n ", calculador);
        media++;
    }

    float calc = calculador/media;

    printf("A media de N e -> %.2f", calc);


    

}
