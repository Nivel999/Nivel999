# Trabalho 1 - API REST de Pacientes de Consultório

API REST em **Java 17 + Spring Boot 3** com **Spring Data JPA**, **Bean Validation** e banco **H2** em memória.
Implementa o CRUD completo de uma única entidade: `Paciente`.

## Como compilar e rodar (CLI)

Pré-requisitos: Java 17+ e Maven instalados (com `JAVA_HOME` configurado).

```bash
# compilar
mvn clean package

# rodar
mvn spring-boot:run
# ou
java -jar target/consultorio-1.0.0.jar
```

A API sobe em `http://localhost:8080`.
O console do H2 fica em `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:consultorio`, usuário `sa`, sem senha).

A tabela é criada automaticamente pelo Hibernate (`spring.jpa.hibernate.ddl-auto=update`).

## Estrutura do projeto

```
src/main/java/com/consultorio
├── ConsultorioApplication.java        # classe principal
├── model/Paciente.java                # entidade JPA
├── repository/PacienteRepository.java # interface JpaRepository
├── controller/PacienteController.java # endpoints REST
└── exception/                         # exceções e tratamento global de erros
```

## Entidade `Paciente`

| Campo            | Tipo        | Regras                                              |
|------------------|-------------|-----------------------------------------------------|
| `id`             | `Long`      | Chave primária, auto-incremento (`@GeneratedValue`) |
| `nome`           | `String`    | **Obrigatório**, entre 3 e 100 caracteres           |
| `email`          | `String`    | **Obrigatório**, formato de email válido, **único** |
| `telefone`       | `String`    | Opcional, máximo 20 caracteres                      |
| `dataNascimento` | `LocalDate` | Opcional, deve estar no passado (`yyyy-MM-dd`)      |

## Rotas

| Método | Rota                       | Descrição                                   | Sucesso          | Erros         |
|--------|----------------------------|---------------------------------------------|------------------|---------------|
| GET    | `/api/pacientes`           | Lista todos (filtro opcional `?nome=`)      | 200 OK           | -             |
| GET    | `/api/pacientes/{id}`      | Busca paciente por ID                       | 200 OK           | 404           |
| POST   | `/api/pacientes`           | Cria um paciente                            | 201 Created      | 400, 409      |
| PUT    | `/api/pacientes/{id}`      | Atualiza todos os campos do paciente        | 200 OK           | 400, 404, 409 |
| PATCH  | `/api/pacientes/{id}`      | Atualiza apenas os campos enviados          | 200 OK           | 404, 409      |
| DELETE | `/api/pacientes/{id}`      | Remove o paciente                           | 204 No Content   | 404           |

Códigos de erro:
- **400 Bad Request** – dados inválidos (validação) ou JSON mal formado
- **404 Not Found** – ID inexistente
- **409 Conflict** – email já cadastrado para outro paciente

## Exemplos de requisição e resposta

### POST `/api/pacientes`

Requisição:
```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "telefone": "(11) 99999-1111",
  "dataNascimento": "1990-05-20"
}
```
Resposta `201 Created`:
```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "telefone": "(11) 99999-1111",
  "dataNascimento": "1990-05-20"
}
```

### GET `/api/pacientes` (ou `/api/pacientes?nome=maria`)

Resposta `200 OK`:
```json
[
  {
    "id": 1,
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "telefone": "(11) 99999-1111",
    "dataNascimento": "1990-05-20"
  }
]
```

### GET `/api/pacientes/1`

Resposta `200 OK`: o paciente em JSON (mesmo formato acima).

Resposta para ID inexistente (`/api/pacientes/99`) – `404 Not Found`:
```json
{
  "timestamp": "2026-11-08T16:34:23.17",
  "status": 404,
  "erro": "Not Found",
  "mensagem": "Paciente com id 99 não encontrado"
}
```

### PUT `/api/pacientes/1`

Requisição (todos os campos):
```json
{
  "nome": "Maria Silva Santos",
  "email": "maria.santos@email.com",
  "telefone": "(11) 98888-2222",
  "dataNascimento": "1990-05-20"
}
```
Resposta `200 OK`:
```json
{
  "id": 1,
  "nome": "Maria Silva Santos",
  "email": "maria.santos@email.com",
  "telefone": "(11) 98888-2222",
  "dataNascimento": "1990-05-20"
}
```

### PATCH `/api/pacientes/1`

Requisição (só os campos que mudam):
```json
{
  "telefone": "(21) 97777-3333"
}
```
Resposta `200 OK`: o paciente completo com o telefone atualizado.

### DELETE `/api/pacientes/1`

Resposta `204 No Content` (sem corpo).

### Erro de validação – `400 Bad Request`

Requisição:
```json
{
  "nome": "",
  "email": "invalido"
}
```
Resposta:
```json
{
  "timestamp": "2026-11-08T16:34:22.89",
  "status": 400,
  "erro": "Bad Request",
  "mensagem": "Erro de validação",
  "campos": {
    "nome": "O nome é obrigatório",
    "email": "Email inválido"
  }
}
```

### Email duplicado – `409 Conflict`

```json
{
  "timestamp": "2026-11-08T16:34:22.94",
  "status": 409,
  "erro": "Conflict",
  "mensagem": "Já existe um paciente com o email maria@email.com"
}
```

## Testando com cURL

```bash
# criar
curl -i -X POST http://localhost:8080/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria Silva","email":"maria@email.com","telefone":"(11) 99999-1111","dataNascimento":"1990-05-20"}'

# listar todos
curl -i http://localhost:8080/api/pacientes

# filtrar por nome
curl -i "http://localhost:8080/api/pacientes?nome=maria"

# buscar por id
curl -i http://localhost:8080/api/pacientes/1

# atualizar (PUT)
curl -i -X PUT http://localhost:8080/api/pacientes/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria Silva Santos","email":"maria.santos@email.com","telefone":"(11) 98888-2222","dataNascimento":"1990-05-20"}'

# atualizar parcialmente (PATCH)
curl -i -X PATCH http://localhost:8080/api/pacientes/1 \
  -H "Content-Type: application/json" \
  -d '{"telefone":"(21) 97777-3333"}'

# remover
curl -i -X DELETE http://localhost:8080/api/pacientes/1

# erro de validação (400)
curl -i -X POST http://localhost:8080/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"","email":"invalido"}'
```

Também há o arquivo [`pacientes.http`](pacientes.http) com todas as requisições, para usar com a extensão REST Client do VS Code (ou o cliente HTTP do IntelliJ).
