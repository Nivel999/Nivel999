#include <stdio.h>

int main()
{
    int a;
    char carro[40][10] = {"fusca", "gol", "uno", "versa", "yaris"};
    float consumo[5] = {7.0, 10.0, 12.5, 9.0, 14.5};

    for (a = 0; a < 5; a++)
    {
        printf("%.1f\n", consumo[a]);       
    }




}
