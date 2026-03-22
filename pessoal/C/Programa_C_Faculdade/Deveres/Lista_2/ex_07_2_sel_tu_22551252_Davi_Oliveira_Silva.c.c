/* 
Refaça o programa que calcule a média aritmética de um aluno que realizou duas avaliações.
Além do valor da média, inclua na tela de saída uma das mensagens: “Aluno aprovado.” ou
“Aluno reprovado.”. Considere que o aluno será aprovado com a média maior ou igual a cinco.
*/

// tentei usar a função While com o if junto. Coloquei o printf e scan (Linha 20 e 21)
// no final do if (linha 46 e 47) e else (linha 64 e 65) para que assim ele saisse do while e acabasse com loop

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    float P1, P2, N1, N2;
    char resp;

    printf("voce quer calcular peso(p) nota (n)\n");
    scanf("%c", &resp);

    while (resp == 'p' || resp == 'P' || resp == 'n' || resp == 'N')
    {

            if (resp == 'p' || resp == 'P')
        {
            printf("\n Digite o valor do peso 1: -> ");
            scanf("%f", &P1);

            printf("\n Digite o valor do peso 2 -> ");
            scanf("%f", &P2);

            printf("\n Digite o valor do nota 1 -> ");
            scanf("%f", &N1);
            
            printf("\n Digite o valor do nota 2 -> ");
            scanf("%f", &N2);

            float MedPon = (P1 * N1 + P2 * N2) / (P1 + P2);
            float MedAri = (N1 + N2) / 2;

            printf("A media ponderada e => %.2f \n E a media Aritmetica => %.2f \n", MedPon, MedAri);
            
            printf(" voce quer calcular peso(p) nota (n), para sair aperte qualquer outra tecla \n");
            scanf(" %c", &resp);


        }
        else if (resp == 'n')
        {
        
            printf("\n Digite o valor do nota 1 -> ");
            scanf("%f", &N1);
            
            printf("\n Digite o valor do nota 2 -> ");
            scanf("%f", &N2);

            float MedAri = (N1 + N2) / 2;

            printf("A media Aritmetica => %.2f \n", MedAri);

            printf(" voce quer calcular peso(p) nota (n), para sair aperte qualquer outra tecla\n");
            scanf(" %c", &resp);

        }
    }
    
    printf("acabou");
}