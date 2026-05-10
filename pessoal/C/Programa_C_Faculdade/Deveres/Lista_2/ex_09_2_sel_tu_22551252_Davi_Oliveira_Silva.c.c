/*
Projete o programa que calcule as raízes de uma equação do 2° grau, levando em
consideração a análise da existência de raízes reais. Se o valor de delta for menor que zero, não
existem raízes nos reais; se delta for igual a zero, existem duas raízes iguais; se delta for maior
que zero, existem duas raízes diferentes.

Expressão: ax^2 + bx + c = 0
x = (- b +- raiz_quadrada ( delta ))/2a
delta = (b^2 - 4 a c)

*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
#include <math.h>

void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    float a,b,c;


    printf("digite o valor de A\n");
    scanf("%f", &a);

    printf("digite o valor de B\n");
    scanf("%f", &b);

    printf("digite o valor de C\n");
    scanf("%f", &c);

    float del = pow(b, 2) - 4 * a * c;

    if (del < 0)
    {
        printf("quando o delta < 0, nao existem solucoes reais para a equacao do 2 grau");
        return;
    }


    if (del > 0)
    {
        float xP = (- b + sqrt( del )) / (2 * a);
        float xN = (- b - sqrt( del )) / (2 * a);

        printf("Como o delta e maior que 0, existem duas raizes. \nprimeira -> %f \nsegunda -> %f", xP, xN);

    }else if (del == 0) {
        float D0 = -b / (2 * a);
        printf("Como o delta e igual a 0, existe apenas uma raiz. \n -> %f", D0);

    }
}
