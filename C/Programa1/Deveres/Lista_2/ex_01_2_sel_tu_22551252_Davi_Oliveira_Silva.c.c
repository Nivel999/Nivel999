/*
1. Faça um programa que leia o ano de nascimento de uma pessoa e calcule sua idade. Após
isso verifique se ela já tem idade para votar (16 anos ou mais). mostre a mensagem informando a
situação dela:
*/

#include <stdio.h>
#include <stdlib.h>
#include <locale.h>


void main(void)  {
    setlocale(LC_ALL, "Portuguese");
    
	int idade, nasc;
	printf("Digite o ano do seu nascimento: \n");
	scanf("%d", &nasc);
	idade = 2025 - nasc;
	printf("\n Idade: %d", idade);
		
	if (idade >=16) {
		printf("\nQuem nasce em %d tem %d anos, pode votar\n", nasc, idade);	
	}
	else printf("\nQuem nasce em %d tem %d anos, num pode\n", nasc, idade);
}