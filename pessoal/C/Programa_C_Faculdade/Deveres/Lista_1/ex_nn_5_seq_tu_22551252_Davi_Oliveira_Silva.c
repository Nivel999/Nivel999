/*Elabore um programa que faça a conversão de graus Fahrenheit para graus Celsius (Celsius-ºC), 
Onde:C = (F - 32) /1.8  */

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    float GF;


    printf("\n coloque o grau Fahrenheit -> \n");
    scanf("%f", &GF);
    
    float GC = (GF - 32) / 1.8 ;
    
    printf("\n sua conversao para graus Celcius -> %f", GC);
}
