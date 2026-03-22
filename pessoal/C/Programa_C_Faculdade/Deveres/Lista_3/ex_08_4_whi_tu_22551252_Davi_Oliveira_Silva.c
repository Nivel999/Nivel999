/*
8. Crie um programa que imprima na tela os números 1 até o 10, usando o laço while,
em seguida faça o mesmo, porém contando de 10 até 1. 
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    int VI = 1, VF = 10;
    while (VI <= VF)
    {
        printf("%d\n", VI);
        VI++;
    }

    VI = 10;
    while (VI >= 1)
    {
        printf("%d\n", VI);
        VI--;
    }

    

}
