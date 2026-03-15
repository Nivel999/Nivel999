/*
7. Faça um programa que implemente a tabuada de um número inteiro a ser
solicitado ao usuário.
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    int mult, V1 = 0, Q = 0;

    printf("Qual tabuada vc quer?");
    scanf("%d", &V1);

    while (Q <= 10)
    {
        mult = V1 * Q;
        printf("%d = %d x %d \n", mult, V1, Q);
        Q++;
    }
    

}
