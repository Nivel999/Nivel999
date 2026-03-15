/*Elabore um programa que calcula o comprimento de uma circunferência.
 Onde: comprimento = 2π * r*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    float raio, comp;
    float pi = 3.14;

    printf("Escreva o valor do Raio\n");
    scanf("\n%f", &raio);

    comp = 2 * pi * raio;

    printf("-> %3.f", comp);
}
