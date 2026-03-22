/*Projete um programa para calcular a área de um triângulo (área = (b * h) /2). 
O usuário fornecerá todos os dados necessários, ou seja, a base e a altura. 
Após a realização do exercício 3 faça as seguintes alterações no código:
a. Mostre o valor da área com três casas decimais.
b. Na tela de saída de dados, mostre também o valor da base e da altura.*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void main(void)

{
    setlocale(LC_ALL, "Portuguese");

    float base;
    float altura;


    printf("\nDigite o valor da base:\n");
    scanf("%f", &base);
    printf("\nDigite o valor da altura\n");
    scanf("%f", &altura);
    
	float mult = (base * altura) /2 ;
    
    printf("Essa e a area -> %.3f.\n Os valores da base era -> %.5f \n E o valor da altura era -> %.5f", mult, base, altura);
}