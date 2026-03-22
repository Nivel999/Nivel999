/*
6. Analise o resultado de uma transação comercial. Verifique a situação final do comerciante
trabalhando com os valores lidos, ou seja, o preço de compra e o preço de venda. Gere a tela de
saída com uma das seguintes mensagens:
“Teve lucro.”, “Teve prejuízo.” ou “Os valores são iguais.”.
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void main (void) {
    setlocale(LC_ALL, "portuguese");

    float venda, compra;

    printf("Digite o valor da venda\n");
    scanf("%f", &venda);
    
    printf("Digite o valor da compra\n");
    scanf("%f", &compra);

    if (venda > compra)
    {
        printf("Teve lucro, pois a compra -> %.2f e menor que a venda -> %.2f ", compra, venda);
    }
    else if (venda < compra)
    {
        printf("Teve prejuizo, pois a compra -> %.2f e maior que a venda -> %.2f ", compra, venda);
    }
    else if (venda == compra)
    {
        printf("Os valores sao iguais, pois a compra -> %.2f e a venda -> %.2f sao os memos valores", compra, venda);
    }
}