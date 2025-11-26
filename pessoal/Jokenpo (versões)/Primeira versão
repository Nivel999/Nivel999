

/*
1. Peça ao usuário para escolher (Pedra, Papel ou Tesoura).
2. Faça o computador escolher aleatoriamente.
3. Compare os dois e anuncie o vencedor.
*/


#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <string.h>

int main()
{

    int comp, i;
    char escolha [10], *vet[] = {"pedra", "papel", "tesoura"};
    

    srand(time(NULL));
    

    for (i = 0; i < 10; i++)
    {   
        
        comp = rand()%3;
        printf("Escolha do comp -> %s\n", vet[comp]);

        printf("Pedra, papel ou tesoura?\n");
        gets(escolha);


            if (vet[comp] == "pedra" && strcpy(escolha, "papel")){
                printf("voce venceu\n");
            }else if (vet[comp] == "pedra" && strcpy(escolha, "tesoura"))
            {
                printf("comp venceu\n");
            }else if (vet[comp] == "papel" && strcpy(escolha, "pedra"))
            {
                printf("comp venceu\n");
            }else if (vet[comp] == "papel" && strcpy(escolha, "tesoura"))
            {
                printf("voce venceu\n");
            }else if (vet[comp] == "tesoura" && strcpy(escolha, "papel"))
            {
                printf("comp vence\n");
            }else if (vet[comp] == "tesoura" && strcpy(escolha, "pedra"))
            {
                printf("voce venceu\n");
            }
    }
}
