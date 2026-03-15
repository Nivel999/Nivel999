/*
Sabendo que a fórmula de conversão de graus Fahreinheit para Celsius é C = ( 5 / 9 ) *
( f – 32 ), escreva um programa que converta de Fahreinheit para Celsius. O programa
deverá imprimir na tela os 50 (cinquenta) primeiros valores positivos e negativos
devendo exibir as duas unidades de conversão.
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

int main(int){
    setlocale(LC_ALL, "Portuguese");

    float GC = 0, GF = 0;
    int N;

    for (N = 0; N <= 50; N++)
    {
        GC = (5.0 / 9.0) * (GF - 32);
        printf("Graus Celcius -> %.2f               Graus Fahrei. ->%.2f\n", GC, GF);
        GF++;
    }
}
