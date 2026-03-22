/*Construa um programa para calcular a raiz de uma equação do 1º grau. 
Os coeficientes “a” e “b” são fornecidos pelo usuário. Calcule a raiz sem fazer crítica.
Equação: a x + b = 0, onde: raiz = - b/a */

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    int a, b;

    printf("Digite o valor de A -> ");
    scanf("%d", &a);

    printf("Digite o valor de B -> ");
    scanf("%d", &b);

    int calc = -a / b;

    printf("Esse e o valor -> %d", calc);

}
