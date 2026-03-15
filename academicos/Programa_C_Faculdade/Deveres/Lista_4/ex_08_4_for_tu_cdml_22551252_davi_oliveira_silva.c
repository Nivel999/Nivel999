/*
8. Prepare um programa para gerar o número H, ou seja, calcular o valor de H.
Sendo H = 1 + 1 + 1 + 1 + . . . + 1. O número “n” será fornecido pelo usuário.
 2 3 4 n
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

int main(){
    setlocale(LC_ALL, "Portuguese");

    
    float H = 0, Final = 0, Somador = 0, ini;

    printf("Escreva seu 'N'\n");
    scanf("%f", &Final);

    for (ini = 1; ini <= Final; ini++)
    {
        H = (1)/(ini);

        printf("N-> %.0f %10.s H-> %f\n", ini,"",H);
        Somador += H;

    }
    printf("Soma total -> %f", Somador);
    //corrigir ainda
}
