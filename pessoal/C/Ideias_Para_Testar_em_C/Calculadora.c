/*
Crie um programa que pede dois números ao usuário e depois pergunta qual operação ele quer fazer {+}, {-}, {/}, {*}.
*/

#include <stdio.h>

int main () {
    int N1, N2;
    char simb;
    float calc;

    printf("Digite o primeiro numero -> ");
    scanf("%d", &N1);
    printf("Digite o segundo numero -> ");
    scanf("%d", &N2);

    printf("Qual?\n{+}, {-}, {/}, {*}.");
    scanf(" %c", &simb);

    /* 
    
    Com if


    if (simb == '*')
    {
        calc  = N1 * N2;
        printf("%.2f", calc);
    }else if (simb == '+')
    {
        calc  = N1 + N2;
        printf("%.2f", calc);
    }    if (simb == '-')
    {
        calc  = N1 - N2;
        printf("%.2f", calc);
    }else if (simb == '/')
    {
        calc  = N1 / N2;
        printf("%.2f", calc);
    }
    */

    switch (simb)
    {
    case '+':
        calc  = N1 + N2;
        printf("%.2f",calc);
        break;
    case '-':
        calc  = N1 - N2;
        printf("%.2f",calc);
        break;
    case '*':
        calc  = N1 * N2;
        printf("%.2f",calc);
        break;
    case '/':
        calc  = N1 / N2;
        printf("%.2f",calc);
        break;        
    
    default:
        break;
    }

    printf("\ncabou");
    
}