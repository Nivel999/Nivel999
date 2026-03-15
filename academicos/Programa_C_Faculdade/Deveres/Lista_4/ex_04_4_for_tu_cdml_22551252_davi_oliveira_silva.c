/*
4. A partir do exercício 3 faça um programa que deverá exibir os resultados da
conversão, parando a cada 25 valores exibidos e solicitar ao usuário que digite a
tecla “ENTER” para continuar, após o usuário digitar “ENTER” a tela deverá ser limpa
e a exibição continuar. A cada tela exibida o programa deverá exibir o seguinte
cabeçalho.
CONVERSAO FAHREINHEIT – CELSIUS
CELSIUS FAHREINHEIT
Dica : no inicio de seu código importe a biblioteca os
import os
e quando necessário limpar a tela use o comando: os.system(‘cls’)
*/
#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

int main(){
    setlocale(LC_ALL, "Portuguese");

    float GC = 0, GF = 0;
    int N = 0;

    for (GF = 0; GF <= 150; GF++){

        if (N % 25 == 0)
        {
            system("cls");
            printf("%4.sCONVERSAO FAHREINHEIT - CELSIUS\n");
            printf("\nGraus Celcius %8.s Graus Fahrei.\n\n");
        }

        GC = (5.0 / 9.0) * (GF - 32);
        printf("%3.s %.2f %20.2f\n","",GC, GF);
        N++;

        if (N % 25 == 0)
        {
            printf("Aperte ENTER para continuar a sequencia");
            getchar();
            GF++;
            //Coloquei esse GF+=1, pois estava dando erro no final, caso eu tire esse GF, no terminal vai aparecer o 150 junto com o acabou entao
        }     
    }
    printf("acabou entao");
}
