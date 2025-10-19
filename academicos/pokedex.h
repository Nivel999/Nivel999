#ifndef POKEDEX_H
#define POKEDEX_H

typedef struct {
    int id;
    char nome[50];
    char tipo[20];
    char habilidade[50];
    float peso;
    int evo1;
    int evo2;
} Pokemon;

extern Pokemon pokedex[];
extern int n;


#endif
