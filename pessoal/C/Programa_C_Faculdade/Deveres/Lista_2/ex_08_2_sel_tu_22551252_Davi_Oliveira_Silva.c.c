/*
8. Projete o programa que leia um valor numérico e verifique se ele é maior ou igual a cem.
Mostre uma das mensagens: “Valor maior ou igual a cem.” Ou “Valor menor que cem.”
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>


void main (void){
    setlocale(LC_ALL, "Portuguese");

    int V1;

    printf("Digite um numero -> ");
    scanf("%d", &V1);

    if (V1 > 100)
    {
        printf("\n Esse numero %d e maior que cem", V1);
    } else if (V1 < 100){
        printf("\n  Esse numero %d e menor que cem", V1);
    } else if (V1 == 100) {
        printf("\n Esse numero %d e igual a cem", V1);
    }
    

    

    
    

}