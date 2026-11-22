# Trabalho 2 - API REST Relacional e Interface Gráfica (Consultório)

Continuação do Trabalho 1 (API de Pacientes). Agora o sistema é **Cliente-Servidor**:

- **Backend:** Web API RESTful em **Java 17 + Spring Boot 3** (Spring Web, Spring Data JPA, Validation) com banco **H2** em memória.
- **Frontend:** interface gráfica Web em **HTML5, CSS3 e JavaScript puro** (Fetch API), que conversa com a API **apenas por requisições HTTP**.

## Estrutura do repositório

```
Trabalho 2 - Desenvolvimento de Sistemas
├── backend/                      # API Spring Boot (Maven)
│   ├── pom.xml
│   ├── requisicoes.http          # requisições prontas para testar a API
│   └── src/main/java/com/consultorio
│       ├── ConsultorioApplication.java
│       ├── model/                # entidades JPA (Paciente, Convenio)
│       ├── repository/           # interfaces JpaRepository
│       ├── service/              # regras de negócio
│       ├── controller/           # endpoints REST
│       ├── exception/            # exceções e tratamento global de erros
│       └── config/               # CORS e dados iniciais
└── frontend/                     # interface gráfica (GUI)
    ├── index.html
    ├── style.css
    └── app.js
```

O código segue a separação em camadas (MVC): **Model** (entidades), **Controller** (rotas HTTP), **Service** (regras de negócio) e **Repository** (acesso ao banco). A **View** é o frontend.

## Como rodar

Pré-requisitos: **Java 17+** e **Maven** instalados.

### 1. Subir a API (backend)

```bash
cd backend
mvn spring-boot:run
```

Ou gerando o `.jar`:

```bash
cd backend
mvn clean package
java -jar target/consultorio-1.0.0.jar
```

A API sobe em `http://localhost:8080`.

- As tabelas são criadas automaticamente pelo Hibernate (`spring.jpa.hibernate.ddl-auto=update`).
- Ao iniciar, a API cadastra 5 convênios (Particular, Unimed, Amil, Bradesco Saúde, SulAmérica) e 2 pacientes de exemplo.
- Console do H2: `http://localhost:8080/h2-console` (JDBC URL `jdbc:h2:mem:consultorio`, usuário `sa`, sem senha).

### 2. Abrir a interface gráfica (frontend)

Com a API rodando, abra o arquivo `frontend/index.html` no navegador (duplo clique).

Também funciona com a extensão **Live Server** do VS Code, ou com um servidor simples:

```bash
cd frontend
python -m http.server 5500
# acesse http://localhost:5500
```

O selo no canto superior direito mostra se a API está **online** ou **offline**.

## Entidades e relacionamento

**1 Convênio possui N Pacientes** (cada paciente pertence a exatamente 1 convênio).

```
+--------------+          +---------------------+
|  convenio    |  1     N |  paciente           |
+--------------+----------+---------------------+
| id (PK)      |          | id (PK)             |
| nome         |          | nome                |
+--------------+          | email               |
                          | telefone            |
                          | data_nascimento     |
                          | convenio_id (FK)    |
                          +---------------------+
```

- `Paciente` tem `@ManyToOne` com `@JoinColumn(name = "convenio_id", nullable = false)`, o que gera a chave estrangeira `fk_paciente_convenio` no banco.
- `Convenio` tem o lado inverso `@OneToMany(mappedBy = "convenio")` com `@JsonIgnore` para evitar loop infinito no JSON.
- Ao listar pacientes, o convênio vem junto no JSON (`"convenio": {"id": 2, "nome": "Unimed"}`).
- **Integridade:** não é possível excluir um convênio que tenha pacientes vinculados (a API responde `409 Conflict`).

### `Convenio` (entidade secundária)

| Campo  | Tipo     | Regras                                                   |
|--------|----------|----------------------------------------------------------|
| `id`   | `Long`   | Chave primária, auto-incremento                          |
| `nome` | `String` | **Obrigatório**, entre 2 e 60 caracteres, **único**      |

### `Paciente` (entidade principal)

| Campo            | Tipo        | Regras                                                  |
|------------------|-------------|---------------------------------------------------------|
| `id`             | `Long`      | Chave primária, auto-incremento                         |
| `nome`           | `String`    | **Obrigatório**, entre 3 e 100 caracteres               |
| `email`          | `String`    | **Obrigatório**, formato de email válido, **único**     |
| `telefone`       | `String`    | Opcional, máximo 20 caracteres                          |
| `dataNascimento` | `LocalDate` | Opcional, deve estar no passado (`yyyy-MM-dd`)          |
| `convenio`       | `Convenio`  | **Obrigatório**, deve ser um convênio existente (FK)    |

## Rotas da API

### Pacientes (CRUD completo)

| Método | Rota                  | Descrição                               | Sucesso        | Erros         |
|--------|-----------------------|-----------------------------------------|----------------|---------------|
| GET    | `/api/pacientes`      | Lista todos com o convênio (`?nome=` filtra por nome) | 200 OK | -   |
| GET    | `/api/pacientes/{id}` | Busca paciente por ID                   | 200 OK         | 400, 404      |
| POST   | `/api/pacientes`      | Cria um paciente                        | 201 Created    | 400, 409      |
| PUT    | `/api/pacientes/{id}` | Atualiza todos os campos                | 200 OK         | 400, 404, 409 |
| PATCH  | `/api/pacientes/{id}` | Atualiza apenas os campos enviados      | 200 OK         | 400, 404, 409 |
| DELETE | `/api/pacientes/{id}` | Remove o paciente                       | 204 No Content | 404           |

### Convênios

| Método | Rota                  | Descrição                                       | Sucesso        | Erros    |
|--------|-----------------------|-------------------------------------------------|----------------|----------|
| GET    | `/api/convenios`      | Lista todos (ordem alfabética)                  | 200 OK         | -        |
| GET    | `/api/convenios/{id}` | Busca convênio por ID                           | 200 OK         | 404      |
| POST   | `/api/convenios`      | Cria um convênio                                | 201 Created    | 400, 409 |
| DELETE | `/api/convenios/{id}` | Remove o convênio (só se não houver pacientes)  | 204 No Content | 404, 409 |

### Códigos de erro

- **400 Bad Request:** dados inválidos (validação), convênio inexistente, JSON mal formado ou ID não numérico.
- **404 Not Found:** ID inexistente.
- **409 Conflict:** email/convênio duplicado ou tentativa de excluir convênio com pacientes vinculados.

## Exemplos de JSON

### POST `/api/pacientes`

A chave estrangeira é enviada como um objeto com o `id` do convênio.

Requisição:
```json
{
  "nome": "Ana Costa",
  "email": "ana@email.com",
  "telefone": "(61) 97777-0000",
  "dataNascimento": "2000-01-15",
  "convenio": { "id": 3 }
}
```
Resposta `201 Created` (o convênio vem completo):
```json
{
  "id": 3,
  "nome": "Ana Costa",
  "email": "ana@email.com",
  "telefone": "(61) 97777-0000",
  "dataNascimento": "2000-01-15",
  "convenio": { "id": 3, "nome": "Amil" }
}
```

### GET `/api/pacientes`

Resposta `200 OK` (dados das duas tabelas unidas):
```json
[
  {
    "id": 1,
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "telefone": "(61) 99999-1111",
    "dataNascimento": "1990-05-20",
    "convenio": { "id": 2, "nome": "Unimed" }
  },
  {
    "id": 2,
    "nome": "João Souza",
    "email": "joao@email.com",
    "telefone": "(61) 98888-2222",
    "dataNascimento": "1985-11-03",
    "convenio": { "id": 1, "nome": "Particular" }
  }
]
```

### PUT `/api/pacientes/3`

Requisição (todos os campos):
```json
{
  "nome": "Ana Costa Lima",
  "email": "ana@email.com",
  "telefone": "(61) 97777-0000",
  "dataNascimento": "2000-01-15",
  "convenio": { "id": 4 }
}
```
Resposta `200 OK`: o paciente atualizado, com `"convenio": { "id": 4, "nome": "Bradesco Saúde" }`.

### PATCH `/api/pacientes/3`

Requisição (só o que muda):
```json
{ "convenio": { "id": 5 } }
```
Resposta `200 OK`: o paciente completo com o novo convênio.

### DELETE `/api/pacientes/3`

Resposta `204 No Content` (sem corpo).

### GET `/api/convenios`

```json
[
  { "id": 3, "nome": "Amil" },
  { "id": 4, "nome": "Bradesco Saúde" },
  { "id": 1, "nome": "Particular" },
  { "id": 5, "nome": "SulAmérica" },
  { "id": 2, "nome": "Unimed" }
]
```

### POST `/api/convenios`

Requisição:
```json
{ "nome": "Hapvida" }
```
Resposta `201 Created`:
```json
{ "id": 6, "nome": "Hapvida" }
```

### Erro de validação: `400 Bad Request`

Requisição:
```json
{ "nome": "", "email": "invalido" }
```
Resposta:
```json
{
  "timestamp": "2026-11-22T17:19:54.79",
  "status": 400,
  "erro": "Bad Request",
  "mensagem": "Erro de validação",
  "campos": {
    "nome": "O nome é obrigatório",
    "email": "Email inválido",
    "convenio": "O convênio é obrigatório"
  }
}
```

### Convênio inexistente: `400 Bad Request`

```json
{
  "status": 400,
  "erro": "Bad Request",
  "mensagem": "Erro de validação",
  "campos": { "convenio": "Convênio com id 99 não existe" }
}
```

### Excluir convênio com pacientes: `409 Conflict`

`DELETE /api/convenios/2`
```json
{
  "status": 409,
  "erro": "Conflict",
  "mensagem": "Não é possível excluir o convênio Unimed: existem 1 paciente(s) vinculado(s) a ele"
}
```

## Interface gráfica (GUI)

A tela é dividida em três partes:

- **Cadastro/Edição de paciente:** formulário com nome, email, telefone, data de nascimento e um **select de convênio**, preenchido com os dados de `GET /api/convenios`. O botão **Editar** da tabela carrega o paciente no formulário (envia `PUT`); **Cancelar edição** volta ao modo de cadastro.
- **Listagem de pacientes:** tabela com as colunas das duas tabelas unidas (dados do paciente + nome do convênio), busca por nome e botões **Editar** e **Excluir**.
- **Convênios:** cadastro de novos convênios e lista com botão **Excluir**.

### Tratamento de erros na interface

- Erros de validação (`400`) aparecem **embaixo de cada campo**, que fica destacado em vermelho.
- Conflitos (`409`), como email duplicado ou exclusão de convênio com pacientes, aparecem em uma **mensagem de alerta** no topo da tela.
- Se a API estiver desligada, a tela não trava: mostra a mensagem "Não foi possível conectar à API" e o selo muda para **API offline**.
- Exclusões pedem confirmação antes de enviar o `DELETE`.

## Testando a API sem a interface

O arquivo [`backend/requisicoes.http`](backend/requisicoes.http) tem todas as requisições (sucesso e erro) para usar com a extensão **REST Client** do VS Code ou o cliente HTTP do IntelliJ. As mesmas rotas podem ser testadas no **Postman/Insomnia**.

Exemplos com cURL:

```bash
# listar pacientes com convênio
curl -i http://localhost:8080/api/pacientes

# criar paciente
curl -i -X POST http://localhost:8080/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Ana Costa","email":"ana@email.com","convenio":{"id":3}}'

# tentar excluir convênio com pacientes (409)
curl -i -X DELETE http://localhost:8080/api/convenios/2
```
