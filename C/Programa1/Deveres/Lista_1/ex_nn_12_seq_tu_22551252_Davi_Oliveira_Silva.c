/*Elabore um programa que leia dois valores reais e mostre o resultado da adição e da subtração desses valores.*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    float v1, v2;

    printf("Escreva o valor 1:\n");
    scanf("%f", &v1);

    printf("Escreva o valor 2:\n");
    scanf("%f", &v2);

    float soma = v1 + v2;
    float sub = v1 - v2;

    printf("A soma e -> %.3f e a Subtraçao e -> %.3f", soma, sub);
}
