//Aprendi a como resolvo a parte de decisões
//Próxima versão já será o Jokenpo funcional

#include <stdio.h>
#include <locale.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>

int main()
{
    char c[2][3][30] = {{"pedra", "papel", "tesoura"},{"a","b","c"}}, d[2][3][30] = {{"pedra", "papel", "tesoura"},{"a","b","c"}}, vet[40];

    int resultado, k, l;
    

    //Parte onde o Comp descidi sua mão
    srand(time(NULL));
    int Ci = rand() % 3;
    printf("%s", c[0][Ci]);
    printf("%d (posicao do computador)", Ci);

    //Conversao de string para poder localizar no vetor 
    printf("\\n Digite sua opcao (pedra, papel ou tesoura):");
    gets(vet);

     for (l = 0; l < 3; l++)
    {
        resultado = strcmp(vet, d[0][l]);
            if (resultado == 0)
            {
                k = l; 
                printf("%d\n", k);
            } 
    }

    //Decisoes Comp:
    if (k == 0) //pedra
    {
        strcpy(d[0][k],d[1][0]);
        printf("%s -> Player\n", d[0][k]);
    }
    if (k == 1) //papel
    {
        strcpy(d[0][k],d[1][1]);
        printf("%s -> Player\n", d[0][k]);
    }
    if (k == 2) //tesoura
    {
        strcpy(d[0][k],d[1][2]);
        printf("%s -> Player\n", d[0][k]);
    }

    

    //Decisoes Comp:
    if (Ci == 0) //pedra
    {
        strcpy(c[0][Ci],c[1][0]);
        printf("%s -> Comp\n", c[0][Ci]);
    }
    if (Ci == 1) //papel
    {
        strcpy(c[0][Ci],c[1][1]);
        printf("%s -> Comp\n", c[0][Ci]);
    }
    if (Ci == 2) //tesoura
    {
        strcpy(c[0][Ci],c[1][2]);
        printf("%s -> Comp\n", c[0][Ci]);
    }

    //int decisao = strcmp(c[0][Ci],d[0][k]);
	int decisao = k -Ci;    
    printf("%d\n", decisao);
}
