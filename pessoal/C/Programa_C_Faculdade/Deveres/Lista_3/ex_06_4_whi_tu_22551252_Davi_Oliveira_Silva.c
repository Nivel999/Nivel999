

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    int Qtd = 0, soma = 0;

    do
    {
        printf("Digite um valor que nao seja negativo ->");
        scanf("%d", &Qtd);

        soma = Qtd + soma;
    } while (Qtd >= 0);

    printf("\nSoma dos numeros positivos: %d\n", soma);
    

}
