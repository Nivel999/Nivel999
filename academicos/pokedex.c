#include <stdio.h> 
#include "pokedex.h"

Pokemon pokedex[] = {
    {1,  "Charmander", "Fogo",         "Blaze",          8.5, 16, 36}, 
    {2,  "Charmeleon", "Fogo",         "Blaze",         19.0, 36}, 
    {3,  "Squirtle",   "Agua",         "Torrent",        9.0, 16, 36}, 
    {4,  "Pikachu",    "Eletrico",     "Static",         6.0, 0},  
    {5,  "Eevee",      "Normal",       "Adaptability",   6.5, 0}, 
    {6,  "Snorlax",    "Normal",       "Thick Fat",    460.0, 0},  
    {7,  "Gengar",     "Fantasma/Veneno", "Levitate", 40.5, 0}, 
    {8,  "Mewtwo",     "Psiquico",     "Pressure",     122.0, 0}, 
    {9,  "Lucario",    "Lutador/Metal","Inner Focus",   54.0, 0},  
    {10, "Charizard",  "Fogo/Voador",  "Blaze",       90.5, 0}, 
    {11, "Bulbasaur",  "Grama/Veneno", "Overgrow",      6.9, 16, 36} 
};

int n = sizeof(pokedex) / sizeof(pokedex[0]);


