/*
6. Faça um programa que some os algarismos de um número inteiro e ao final da
execução exiba o número digitado e o somatório de seus algarismos.
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

int main(){
    setlocale(LC_ALL, "Portuguese");

    int Alg, Num, somador = 0;

    printf("Digite seu numero ->");
    scanf("%d", &Num);

    for (Num; Num != 0; Num /= 10)
    {
        somador += Num%10;
        
        printf("%d\n", somador);
    }
        printf("\nA soma dos valores -> %d", somador);
    

}
