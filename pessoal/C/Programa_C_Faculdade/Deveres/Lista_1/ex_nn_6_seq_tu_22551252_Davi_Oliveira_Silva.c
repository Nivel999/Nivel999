/*Elabore um programa que calcule a área de um círculo. O usuário fornecerá o valor do raio.
Onde: área = π r²*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    float raio, area;
    float Pi = 3.14;

    printf("Coloque o valor do Raio:\n");
    scanf("%f", &raio);

    area = Pi * (raio * raio);

    printf("%.3f", area);
}
