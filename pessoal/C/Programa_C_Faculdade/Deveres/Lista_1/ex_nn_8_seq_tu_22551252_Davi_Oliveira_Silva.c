/* Elabore um programa que calcula a área lateral de um cilindro, 
onde: área = 2π r h*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    float raio, altura, area;
    float pi = 3.14;

    printf("Digite o raio -> ");
    scanf("%f", &raio);

    printf("Digite a altura -> ");
    scanf("%f", &altura);

    area = 2*pi * raio * altura;

    printf("-> %.2f", area);
}
