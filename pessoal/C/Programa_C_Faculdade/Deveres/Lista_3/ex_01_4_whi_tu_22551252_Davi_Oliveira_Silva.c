/*1. Elaborar um programa C para computar a média de N números reais*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    int v1, m1 = 0, Qtd = 0;
    float soma = 0, media = 0;

    printf("Quantos numeros voce quer?\n");
    scanf("%d", &Qtd);

    while (m1 < Qtd)
    {
        printf("Digite um valor\n");
        scanf("%d", &v1);

        soma = v1 + soma;
        m1++;

    }
    media = soma / Qtd;
    printf("%.2f", media);
    

}
