/*Sabendo que a 01 pé equivale a 0.3048m, faça um programa que converta pés em metros.*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    float pe;

    printf("qual o valor do pe -> ");
    scanf("%f", &pe);

    float me = pe * 0.3048;

    printf("O valor e -> %f", me);

}