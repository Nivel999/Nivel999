# TaskTracker

Aplicação de linha de comando (CLI) em Python para cadastrar e visualizar tarefas do dia a dia.
Projeto desenvolvido no **Bootcamp II** — Fase 3 (Entrega Final): conteinerização e orquestração com Docker.

## Descrição funcional

O TaskTracker oferece um menu contínuo no terminal com as opções:

1. **Cadastrar tarefa** — informa título, descrição, prioridade e data limite.
2. **Listar tarefas** — mostra todas as tarefas e o total de pendentes e concluídas.
3. **Concluir tarefa** — muda o status de uma tarefa para `Concluída` a partir do ID.
4. **Sair**

Cada tarefa é guardada como um dicionário com os campos:

| Campo       | Regra                                                                 |
|-------------|-----------------------------------------------------------------------|
| ID          | Número gerado automaticamente pelo sistema (começa em 1).             |
| Título      | Obrigatório. Entradas vazias ou só com espaços são rejeitadas.        |
| Descrição   | Texto livre (opcional).                                               |
| Prioridade  | Aceita apenas `Alta`, `Média` (ou `Media`) e `Baixa`.                 |
| Data limite | Deve seguir o formato `dd/mm/aaaa` (ex: 25/09/2026).                  |
| Status      | Definido automaticamente como `Pendente` no cadastro.                 |

Quando uma entrada é inválida, o sistema mostra uma mensagem de erro e pede o dado novamente.
Se nenhuma tarefa tiver sido cadastrada, a listagem exibe `Nenhuma tarefa cadastrada.`

Exemplo de listagem:

```
[1] Ler artigo sobre Git | Prioridade: Baixa | Data: 25/09/2026 | Status: Pendente
    Descrição: Capítulos 1 a 3 do livro base

Total: 1 | Pendentes: 1 | Concluídas: 0
```

## Tecnologias utilizadas

- Python 3.11 (somente biblioteca padrão)
- Docker e Docker Compose
- Git e GitHub para versionamento

## Estrutura do repositório

```
tasktracker-projeto/
├── .gitignore
├── .dockerignore                 # Arquivos que não entram na imagem Docker
├── docs/
│   └── planejamento_logico.pdf   # Planejamento lógico entregue na Fase 1
├── src/
│   └── main.py                   # Código-fonte principal (Fase 2)
├── Dockerfile                    # Receita da imagem (Fase 3)
├── docker-compose.yml            # Orquestração da execução interativa (Fase 3)
└── README.md
```

## Executando com Docker (recomendado)

Pré-requisito: [Docker Desktop](https://www.docker.com/products/docker-desktop/) (ou Docker Engine + Compose) instalado e em execução.

Clone o repositório e entre na pasta:

```bash
git clone https://github.com/Nivel999/tasktracker-projeto.git
cd tasktracker-projeto
```

### 1. Como construir a imagem

```bash
docker build -t tasktracker .
```

### 2. Como rodar o container em modo isolado

```bash
docker run -it --rm tasktracker
```

> `-i` mantém a entrada de dados aberta e `-t` aloca um terminal — os dois são necessários porque a CLI usa `input()`. O `--rm` remove o container ao sair.

### 3. Como rodar via orquestração (recomendado)

```bash
docker compose run --rm tasktracker
```

Na primeira vez, o `docker compose run` constrói a imagem automaticamente. Depois de alterar o código, use `docker compose build` para gerar a imagem novamente.

### Como funciona

**Dockerfile** — empacota a aplicação e gera a imagem:

| Instrução                       | Função                                                        |
|---------------------------------|---------------------------------------------------------------|
| `FROM python:3.11-slim`         | Base leve do sistema, só com o necessário para o Python.      |
| `WORKDIR /app`                  | Define a pasta central de operações dentro do container.      |
| `ENV PYTHONUNBUFFERED=1`        | Mostra a saída do Python na hora, sem buffer.                 |
| `COPY src/ /app/src/`           | Copia o código local para dentro do container.                |
| `CMD ["python", "src/main.py"]` | Comando que inicia a aplicação.                               |

**docker-compose.yml** — orquestra a execução interativa da CLI:

- `stdin_open: true` — mantém o canal de entrada de dados aberto (equivale ao `-i`).
- `tty: true` — aloca um terminal virtual, simulando o console (equivale ao `-t`).

> Observação: as tarefas ficam em memória, então são perdidas quando o container é encerrado.

## Execução sem Docker

1. Instale o [Python 3](https://www.python.org/downloads/).
2. Na pasta do projeto, execute:
   ```bash
   python src/main.py
   ```
   No Windows, também é possível usar `py src/main.py`.
