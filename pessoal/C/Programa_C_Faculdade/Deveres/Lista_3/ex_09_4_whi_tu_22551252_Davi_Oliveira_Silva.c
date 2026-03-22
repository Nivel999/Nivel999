/*
Faça um programa que peça um número inteiro maior que 1 ao usuário. Em
seguida, imprima todos os números, de 1 até o número que o usuário informou.
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    int V1, Com = 0;

    printf("Digite um numero -> ");
    scanf("%d", &V1);

    while (V1 >= Com)
    {
        printf("%d\n", Com);
        Com++;
    }
    

}
