#include <stdio.h>

//Colocou depois, PRECISA DECLARAR.



//Colocou a função antes do main, NÃO PRECISA DECLARAR FORA DA MAIN
int sub(int a, int b){
    int teste = a - b;
    return teste;
}

int mult(int a, int b){
    int calc = a*b;
    return calc;
}

int main (){
    int soma(int a, int b);
    float div (int a, int b);

    int a, b;
    printf("Digite o primeiro numero");
    scanf("%d", &a);

    printf("Digite o primeiro numero");
    scanf("%d", &b);

    printf("soma %d\n", soma(a, b));
    printf("sub %d\n", sub(a, b));
    printf("mult %d\n", mult(a, b));
    printf("div %.2f\n", div(a , b));
    printf("sei la");
}

int soma(int a, int b){
    int result = a + b;
    return result;
}

float div (int a, int b){
    float bla = a/b;
    return bla;
}

