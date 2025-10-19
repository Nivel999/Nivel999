#include <stdio.h>
#include <locale.h>
#include <windows.h>
#include "pokedex.h"

int main(void) {
    SetConsoleOutputCP(CP_UTF8);
    setlocale(LC_ALL, "");

    int opcao;
    int escolha;
    char R;

    do {
        // Menu
        printf("\n=================================\n");
        printf("           POKEDEX               \n");
        printf("=================================\n");
        printf(" [1] Lista\n");
        printf(" [2] Como funciona\n");
        printf(" [3] Credito\n");
        printf(" [4] Sair\n");
        printf("=================================\n");
        printf("Escolha uma opcao: ");
        scanf(" %d", &opcao);

        switch (opcao) {
            case 1:
                printf("\n-> Você escolheu a opcao Lista.\n");
                printf("=== LISTA DE POKEMONS ===\n");
                for (int i = 0; i < n; i++) {
                    printf("%d - %s\n", pokedex[i].id, pokedex[i].nome);
                }

                printf("\nDigite o numero do Pokemon que deseja ver: ");
                scanf("%d", &escolha);

                int encontrado = 0;
                for (int i = 0; i < n; i++) {
                    if (escolha == pokedex[i].id) {
                        printf("\nVoce escolheu: %s!\n", pokedex[i].nome);
                        printf("=== DETALHES ===\n");
                        printf("ID: %d\n", pokedex[i].id);
                        printf("Tipo: %s\n", pokedex[i].tipo);
                        printf("Habilidade: %s\n", pokedex[i].habilidade);
                        printf("Peso: %.2f\n", pokedex[i].peso);                                        
                        if (pokedex[i].evo1 != 0)
                            printf("Nivel de evolucao 1 => %d\n", pokedex[i].evo1);
                        if (pokedex[i].evo2 != 0)
                            printf("Nivel de evolucao 2 => %d\n", pokedex[i].evo2);

                        encontrado = 1;

                        // Evolução específica do Charmander
                        if (escolha == 1) {
                            printf("Temos uma evolucao para o Charmander! Quer ver? (S/N): ");
                            scanf(" %c", &R);
                            if (R == 's' || R == 'S') {
                                for (int j = 0; j < n; j++) {
                                    if (pokedex[j].id == 2 || pokedex[j].id == 10) {
                                        printf("\nVocê escolheu: %s!\n", pokedex[j].nome);
                                        printf("=== DETALHES ===\n");
                                        printf("ID: %d\n", pokedex[j].id);
                                        printf("Tipo: %s\n", pokedex[j].tipo);
                                        printf("Habilidade: %s\n", pokedex[j].habilidade);
                                        printf("Peso: %.2f\n", pokedex[j].peso);
                                        if (pokedex[j].evo1 != 0)
                                            printf("Nivel de evolucao 1 => %d\n", pokedex[j].evo1);
                                        if (pokedex[j].evo2 != 0)
                                            printf("Nivel de evolucao 2 => %d\n", pokedex[j].evo2);
                                    }
                                }
                            } else {
                                printf("Ok, sem evolucao!\n");
                            }
                        }

                        break;
                    }
                }
                if (!encontrado) {
                    printf("\nPokemon nao encontrado!\n");
                }
                break;

            case 2:
                printf("\n\n\n\nFunciona da seguinte forma:\n");
                printf("Toda a funcionalidade e pelo teclado numerico\n\n\n\n");
                break;

            case 3:
                printf("\n\n\n\nFeito por: Davi Oliveira\n\n\n\n");
                break;

            case 4:
                printf("Saindo...\n");
                break;

            default:
                printf("\n\n\n\nOpcao invalida!\n\n\n\n");
                break;
        }

    } while (opcao != 4); // enquanto não escolher sair, o menu repete

    return 0;
}
