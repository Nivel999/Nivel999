#include <stdio.h>
#include <conio.h>

int main () {
    int N1, N2;
    char simb, tecla;
    float calc;

    while (1){

        printf("Digite o primeiro numero -> ");
        scanf("%d", &N1);
        printf("Digite o segundo numero -> ");
        scanf("%d", &N2);

        printf("Qual?\n{+}, {-}, {/}, {*}.");
        scanf(" %c", &simb);

        // COM SWITCH

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
     
            
            printf("\nDeseja recomecar? (S/N)\n");    
            char tecla;
            scanf(" %c", &tecla);
            if (tecla == 'n' || tecla == 'N'){
                printf("\n Programa encerrado...");
                return 0;
            }
            
        
          
    }
 
}
