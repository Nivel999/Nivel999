#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

int main()
{
	int a, b;
	scanf("%d", &a);
    scanf("%d", &b);

    printf("\n %d", calc(a, b));
}


int calc (x, y) {

    int soma = x + y;
    printf("A soma do Calc -> %d\n", soma);

    printf("\n %d", jog());

}

int jog() {
    int a ,b;

    scanf("%d", &a);
    scanf("%d", &b);
    printf("esse aqui e o jog");
}

int aa (x, y) {

    int soma = x * y;
	return soma;

}

int ba (x, y) {

    int soma = x + y;
	return soma;

}







