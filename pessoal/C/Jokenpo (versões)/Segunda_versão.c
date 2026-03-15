// Removi a quantidade de if e else e usei também a biblioteca "strintg.h" e a biblioteca "time.h", dessa forma consegui diminuir a quatidades de possibilidades de escolhas (de 9 para 3)
//No entanto esse programa da erro pois apenas comparo as palavras, onde eu pensava que se desse <0 o humano vencia, mas na verdade não, poderá ter casos que mesmo que der maior que zero 
// o computador ainda pode vencer, será corrigido na proxima versao 

#include <stdio.h>
#include <locale.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>

void main(void)
{
    char vet1[40], *c[40] = {"pedra", "papel", "tesoura"}, *d[40] = {"pedra", "papel", "tesoura"}, vet[40];

    int resultado;

    srand(time(NULL));
    int i = rand() % 3;
    printf("%s", c[i]);

    printf("\\n Digite sua opcao (pedra, papel ou tesoura):");
    gets(vet);

    resultado = strcmp(vet, d[i]);
    int test = i - resultado;
    printf("%d", resultado);

    if (strcmp(vet, d[i]) == 0)
    {
        printf("Empate");
    }
    else if (strcmp(vet, d[i]) > 0)
    {
        printf("computador venceu");
    }
    else if (resultado < 0)
    {
        printf("humano venceu");
    }
}
