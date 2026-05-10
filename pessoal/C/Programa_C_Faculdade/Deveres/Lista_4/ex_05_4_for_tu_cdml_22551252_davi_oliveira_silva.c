/*
5. Sabendo que a 01 pé equivale a 0.3048m, faça um programa que mostre na tela a
conversão de metros para pés, de 0 a 100metros. Seu programa deverá exibir o
cabeçalho abaixo e a cada 20 valores exibidos na tela, seu programa deverá solicitar
ao usuário que digite a tecla ENTER pra continuar, após isso deverá ser limpa a tela ,
exibido o cabeçalho e continuar o processamento até o final do programa.
Conversão metros – pés
Metros pés
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

int main(){
    setlocale(LC_ALL, "Portuguese");

    float Metro = 0.3048;
    int N = 0, Pe = 0;

    for (Pe = 0; Pe <= 100; Pe++){

        if (N % 20 == 0)
        {
            system("cls");
            printf("%4.sConversao metros - pes\n");
            printf("\n%4.s Pe %10.s Metro\n\n");
        }

        float calc = Metro * Pe;
        printf("%3.s %.2d %20.5f\n","",Pe, calc);
        N++;

        if (N % 20 == 0)
        {
            printf("Aperte ENTER para continuar a sequencia");
            getchar();
            Pe++;
            //Coloquei esse Pe+=1, pois estava dando erro no final, caso eu tire esse GF, no terminal vai aparecer o 150 junto com o acabou entao
        }     
    }
    printf("acabou entao");
}
