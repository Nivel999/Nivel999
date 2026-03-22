/*
7. Elabore um programa que gere a sequência dos números inteiros, onde o usuário
deverá fornecer o valor inicial e o valor final dessa sequência.
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

int main(){
    setlocale(LC_ALL, "Portuguese");

    int Ini = 0, Fim = 0, Somador = 0;

    printf("Inicial ->");
    scanf("%d", &Ini);
    printf("FInal ->");
    scanf("%d", &Fim);

    for (Ini; Ini <= Fim; Ini++)
    {
        printf("%d\n", Ini);
    }
    
}
