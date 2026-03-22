/*Faça um algoritmo para calcular o volume de uma esfera de raio R, onde R é um valor lido.
Onde: volume = 4/3 π r³
*/


#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    float pi = 3.14;
    float raio, vol;

    printf("Digite o raio -> ");
    scanf("%f", &raio);

    vol = 0.75 * pi * (raio * raio * raio);
    
    // não sei se tem como coloar 3/4 nessa equação, então coloquei 0,75

    printf("%f", vol);

}
