/*2. Sabendo que a fórmula de conversão de graus Fahrenheit para Celsius é:
C = ( 5 / 9 ) * ( f – 32 ), escreva um programa que converta de Fahrenheit para Celsius
e exiba na tela os 20 (vinte) primeiros valores a partir da temperatura de 32° F ,
devendo exibir as duas unidades de conversão. programa deverá exibir o seguinte
cabeçalho.
CONVERSAO FAHREINHEIT – CELSIUS
CELSIUS FAHREINHEIT
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    float GC, GF = 32;
    int Ini, Fin;


    printf("Valor inicial ->\n");
    scanf("%d", &Ini);

    printf("Valor final ->\n");
    scanf("%d", &Fin);

    printf("%-15s %s\n", "CELSIUS", "FAHRENHEIT");

    GF = Ini;

    while (Ini <= Fin)
    {
        GC = (5.0 / 9.0) * (GF - 32);
        printf("%.2f               %.2f\n", GC, GF);

        GF++;
        Ini++;
    }
}
