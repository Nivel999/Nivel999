
//1. Elabore um programa que leia dois valores reais e mostre o resultado da adição desses valores.

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    int n1 = 5;
    int n2 = 28;

    int soma = n1 + n2;
    
    //não deixei com acentuação, pois quando aperece no terminal fica todo estranho

    printf("A soma do numero %d com o numero %d e igual a: %d", n1, n2, soma);


}