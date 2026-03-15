/*
2. Faça um programa que leia dois valores quaisquer e mostre o maior deles ou mostre a
mensagem “Os valores são iguais.”
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void main (void) {
    setlocale(LC_ALL, "Portuguese");

    int x, y;

    scanf("%d", &x);
    scanf("%d", &y);

    if (x > y)
        printf("Esse e o valor de x -> %d", x);
    else if (x == y) 
        printf("ambos tem o mesmo valor");    
    else if (x < y)
        printf("y e maior que x");
}