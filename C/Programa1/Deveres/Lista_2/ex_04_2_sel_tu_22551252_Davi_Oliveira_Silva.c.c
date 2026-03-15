/*
4. Construa o programa que calcule o peso ideal de uma pessoa.
Utilize as seguintes fórmulas:
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    char gen;
    float alt; 

    printf("Digite sua altura ->");
    scanf("%f", &alt);
    printf("Digite seu sexo (m)/(f)");
    scanf(" %c", &gen);

    if (gen == 'm' || gen == 'M')
    {
        float peso =  (72.7 * alt) - 58;
        printf("Seu peso e => %.2f e seu sexo e masculino %c", peso, gen);
    }
    else if (gen == 'f' || gen == 'F')
    {
        float peso =  (62.1 * alt) - 44.7;
        printf("Seu peso e => %.2f e seu sexo e feminino %c", peso, gen);
    }
    else

    printf("Error!, por favor digite novamente o seu sexo"); 
}