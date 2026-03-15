/*Escreva um programa que solicite 3 números em ponto flutuante e imprima a média aritmética desses números.*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    float v1, v2, v3;

    printf("Digite o v1\n");
    scanf("%f", &v1);
    printf("Digite o v2\n");
    scanf("%f", &v2);
    printf("Digite o v3\n");
    scanf("%f", &v3);

    float media = (v1 + v2 + v3) / 3;
    printf("\nA media e -> %f", media);
}