/*
Construa um programa que calcule a média aritmética de duas notas bimestrais fornecidas
pelo usuário. Onde: 
média = (nota1 + nota2) / 2
 */

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    int n1, n2;

    printf("coloque a primeira nota:");
    scanf("%d", &n1);
    printf("coloque a primeira nota:");
    scanf("%d", &n2);

    int media = (n1 + n2) /2;

    printf("sua media e -> %d", media);

}