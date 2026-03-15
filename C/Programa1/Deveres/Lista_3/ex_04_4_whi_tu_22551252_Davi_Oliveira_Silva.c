
#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void main(void)
{
    setlocale(LC_ALL, "Portuguese");

    float nota, soma = 0, media;
    int ini = 1, fin = 4;

        while (ini <= fin)
        {
            printf("Digite a nota do aluno número %d: ", ini);
            scanf("%f", &nota);

            soma += nota;
            ini++;
        }

        media = soma / fin;

        printf("Média da turma = %.2f\n", media);
}
