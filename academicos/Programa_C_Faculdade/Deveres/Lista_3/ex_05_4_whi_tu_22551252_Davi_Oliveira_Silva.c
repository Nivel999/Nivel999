/*
5. Desenvolva um programa que leia vários números digitados pelo usuário e use o
valor -1 como condição (flag) de saída da estrutura de repetição. Na tela de saída,
mostre a quantidade de números digitados.
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

#include <stdio.h>

int main(void)
{
    int V1, Qtd = 0;
    int soma = 0;

    printf("Digite numeros (-1 para sair):\n");

    while (1) 
    {
        scanf("%d", &V1);

        if (V1 == -1) 
            break;

        Qtd++; 
        soma = soma + V1;
    }

    printf("Quantidade de numeros digitados: %d\n", Qtd);
    
    printf("A soma: %d\n", soma);


}

