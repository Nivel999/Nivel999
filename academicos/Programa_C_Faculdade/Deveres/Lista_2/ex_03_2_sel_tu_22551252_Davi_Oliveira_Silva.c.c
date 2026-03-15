/*
3. Elabore o programa que leia um número qualquer e verifique se ele é positivo, nulo ou
negativo.
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
void main(void) {
    setlocale(LC_ALL, "Portuguese");

    int n1;

    scanf("%d", &n1);

    if (n1 > 0)    
    {
        int dobro = n1*2;
        printf("o valor da variavel e -> %d \n o dobro de seu valor e -> %d", n1, dobro);
    }
    else if (n1 == 0) 
    {
        printf("Esse valor e nulo");
    }
    else if (n1 < 0)
    {
        int triplo = n1*3;
        printf("olvalor da e -> %d \no triplo de seu valor e -> %d", n1, triplo);
    }
    
    

}