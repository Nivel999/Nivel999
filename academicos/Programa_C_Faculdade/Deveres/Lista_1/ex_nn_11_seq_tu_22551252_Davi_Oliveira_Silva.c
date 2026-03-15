/*Elabore um programa que troque o conteúdo de duas variáveis. O usuário fornecerá os dois
valores inteiros*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    
    int a = 5;
    int b = 6;
    int v = 0;

    printf("Os valores iniciais sao: A = %d e B = %d\n", a, b);
    printf("Digite um valor para A \n");
    scanf("%d", &a);
    
    printf("Digite outro valor para B \n");
    scanf("%d", &b);

 
    v = a;
    a = b;
    b = v;

    printf("O valor de A -> %d E o valor de B -> %d", a, b);

}
