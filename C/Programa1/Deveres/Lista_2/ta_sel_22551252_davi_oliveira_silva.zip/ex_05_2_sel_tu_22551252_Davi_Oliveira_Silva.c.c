/*
5. Elabore o programa que verifica se o valor inteiro fornecido pelo usuário é par ou ímpar.
Analise o problema e verifique quais são os dados que o usuário precisa fornecer.
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>


void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    int n1;

    printf("Digite um valor");
    scanf("%d", &n1);

    float resto = n1 % 2;

    if (resto == 0)
    {
        printf("O numero e par");
    }
    else 
        printf("O numero e impar");
    


}
