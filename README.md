# 📊 Sales Analysis — Monitor de Vendas

> APS de Banco de Dados — Curso de ADS, 3° semestre (2026.1)

Sistema full-stack para **monitoramento e análise de vendas** por vendedor e região. O projeto contempla um backend REST em **Spring Boot 4**, banco de dados **MySQL 8** rodando em **Docker** e um frontend em **Angular 21** (em desenvolvimento).

---

## 📋 Índice

- [Visão Geral](#visao-geral)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [System Design](#system-design)
- [Banco de Dados](#banco-de-dados)
- [Endpoints da API](#endpoints-da-api)
- [Frontend (em desenvolvimento)](#frontend)
- [Como Rodar](#como-rodar)
- [Variáveis de Ambiente](#variaveis-ambiente)
- [Roadmap](#roadmap)

---

<a name="visao-geral"></a>
## 🔍 Visão Geral

O **Monitor de Vendas** permite:

- Cadastrar e gerenciar **regiões** de atuação
- Cadastrar e gerenciar **vendedores**, associando-os a uma região
- Registrar **vendas** vinculadas a um vendedor, com valor total e período
- Consultar vendas filtradas por **vendedor**, **intervalo de datas** ou ambos
- Visualizar os dados em um **dashboard de análise** (futuro)

---

<a name="tecnologias"></a>
## 🛠 Tecnologias

| Camada       | Tecnologia                                  |
| ------------ | ------------------------------------------- |
| **Backend**  | Java 21, Spring Boot 4.0.4, Spring Data JPA |
| **Banco**    | MySQL 8.0 (Docker)                          |
| **Frontend** | Angular 21, TypeScript 5.9                  |
| **Infra**    | Docker Compose                              |
| **Libs**     | Lombok, dotenv-java, Bean Validation        |

---

<a name="arquitetura"></a>
## 🏗 Arquitetura

O sistema segue uma **arquitetura em camadas** no backend, com separação clara de responsabilidades:

```
Controller → Service (interface + impl) → Repository → MySQL
     ↕              ↕
  DTOs          Entities (JPA)
```

- **Controller** — Recebe as requisições HTTP, delega para o Service e retorna DTOs de resposta.
- **Service** — Contém a lógica de negócio; converte DTOs de request em entidades e vice-versa.
- **Repository** — Interface JPA com queries derivadas para acesso ao banco.
- **DTOs** — Records Java para request/response, com validação via Bean Validation (`@NotBlank`, `@NotNull`).
- **CORS** — Configuração centralizada permitindo origens definidas por variável de ambiente.

A arquitetura de software planejada para as funcionalidades do sistema:

<p align="center">
  <img src="docs/Software architeture APS-BD 2026.1.png" alt="Arquitetura de Software" width="700"/>
</p>

---

<a name="system-design"></a>
## 🔄 System Design

O system design descreve o fluxo de dados end-to-end entre o frontend Angular, as camadas do Spring Boot (Controller → Service → Repository) e o banco MySQL, incluindo a conversão entre DTOs e Entities. O diagrama também contempla uma futura camada de **cache com Redis** para otimizar consultas de relatórios de vendas.

<p align="center">
  <img src="docs/System design APS-BD 2026.1.png" alt="System Design" width="800"/>
</p>

---

<a name="banco-de-dados"></a>
## 🗄 Banco de Dados

O banco **MySQL 8** roda em um container Docker e é inicializado automaticamente com os scripts SQL localizados em `docs/`.

### Diagrama MER

<p align="center">
  <img src="docs/Diagrama do banco.png" alt="Diagrama MER do Banco de Dados" width="500"/>
</p>

### Tabelas (pós-migrations)

Após a aplicação do `schema.sql` (criação inicial) e `changes.sql` (ajustes), o banco final possui **3 tabelas**:

| Tabela       | Descrição                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------- |
| `regiao`     | Regiões de atuação (`idregiao` PK, `nomeregiao`)                                            |
| `vendedor`   | Vendedores com FK para `regiao` (`idvendedor` PK, `nomevendedor`, `idregiao` FK)             |
| `venda`      | Vendas registradas (`idvenda` PK, `idvendedor` FK, `total` DECIMAL, `periodo` DATE)          |

> **Nota:** As tabelas `Cliente`, `Produto` e `ItemVenda` foram removidas pelo script `changes.sql` para simplificar o escopo do projeto, focando na análise por vendedor/região.

### Docker Compose

O container é configurado via `docker-compose.yml`:

```yaml
services:
  db:
    image: mysql:8.0
    container_name: sales-analysis
    environment:
      MYSQL_DATABASE: MonitorVendas
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
    ports:
      - "3300:3306"
    volumes:
      - ./docs/schema.sql:/docker-entrypoint-initdb.d/01-schema.sql
      - ./docs/changes.sql:/docker-entrypoint-initdb.d/02-changes.sql
```

- A porta exposta é **3300** (para evitar conflito com instalações locais do MySQL).
- Os scripts SQL são montados no `docker-entrypoint-initdb.d/` e executados automaticamente na primeira inicialização.

---

<a name="endpoints-da-api"></a>
## 🔌 Endpoints da API

Base URL: `http://localhost:8080/api`

### Regiões — `/api/regions`

| Método   | Rota               | Descrição             | Status      |
| -------- | ------------------- | --------------------- | ----------- |
| `POST`   | `/api/regions`      | Criar uma nova região | `201`       |
| `GET`    | `/api/regions`      | Listar todas          | `200`       |
| `DELETE` | `/api/regions/{id}` | Deletar por ID        | `204`       |

**Request body (POST):**
```json
{ "region": "Sudeste" }
```

**Response body:**
```json
{ "id": 1, "name": "Sudeste" }
```

---

### Vendedores — `/api/sellers`

| Método   | Rota                | Descrição              | Status      |
| -------- | -------------------- | ---------------------- | ----------- |
| `POST`   | `/api/sellers`       | Criar um novo vendedor | `201`       |
| `GET`    | `/api/sellers`       | Listar todos           | `200`       |
| `DELETE` | `/api/sellers/{id}`  | Deletar por ID         | `204`       |

**Request body (POST):**
```json
{ "name": "João Silva", "idregion": 1 }
```

**Response body:**
```json
{ "id": 1, "name": "João Silva", "region": "Sudeste" }
```

---

### Vendas — `/api/sales`

| Método   | Rota                   | Descrição                                 | Status      |
| -------- | ----------------------- | ----------------------------------------- | ----------- |
| `POST`   | `/api/sales`            | Registrar uma nova venda                  | `201`       |
| `GET`    | `/api/sales`            | Listar todas as vendas                    | `200`       |
| `GET`    | `/api/sales/seller`     | Filtrar vendas por vendedor (`?idSeller`) | `200`       |
| `GET`    | `/api/sales/date`       | Filtrar por período (`?dateBefore&dateAfter`) | `200`  |
| `GET`    | `/api/sales/seller-date`| Filtrar por vendedor + período            | `200`       |
| `DELETE` | `/api/sales/{id}`       | Deletar por ID                            | `204`       |

**Request body (POST):**
```json
{ "idSeller": 1, "date": "2026-04-20", "total": 1500.00 }
```

**Response body:**
```json
{ "id": 1, "total": 1500.00, "date": "2026-04-20", "seller": "João Silva", "region": "Sudeste" }
```

---

<a name="frontend"></a>
## 🖥 Frontend (em desenvolvimento)

O frontend é uma aplicação **Angular 21** com lazy-loaded routes. Atualmente, a estrutura de componentes já existe, mas a interface ainda está **incompleta**. O planejamento inclui:

| Página                | Rota             | Funcionalidade                                            | Status         |
| --------------------- | ---------------- | --------------------------------------------------------- | -------------- |
| Listagem de Regiões   | `/region`        | Listar e deletar regiões                                  | 🔨 Em progresso |
| Criar Região          | `/region/new`    | Formulário para criar uma nova região                     | 🔨 Em progresso |
| Listagem de Vendedores| `/seller`        | Listar e deletar vendedores                               | 🔨 Em progresso |
| Criar Vendedor        | `/seller/new`    | Formulário com seleção de região                          | 🔨 Em progresso |
| Listagem de Vendas    | `/sale`          | Listar e deletar vendas                                   | 🔨 Em progresso |
| Criar Venda           | `/sale/new`      | Formulário com seleção de vendedor, período e valor       | 🔨 Em progresso |
| **Dashboard**         | `/dashboard`     | Análise de vendas com filtros (vendedor, região, período) | 📋 Planejado    |

---

<a name="como-rodar"></a>
## 🚀 Como Rodar

### Pré-requisitos

- **Java 21** (com preview features)
- **Docker** e **Docker Compose**
- **Node.js** e **npm** (para o frontend)

### 1. Clonar o repositório

```bash
git clone https://github.com/aleblima/Sales-analysis.git
cd Sales-analysis
```

### 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e preencha com seus dados:

```bash
cp .env.example .env
```

```env
DB_USER=root
DB_PASSWORD=sua_senha
FRONTEND_URL=http://localhost:4200
```

### 3. Subir o banco de dados (Docker)

```bash
docker compose up -d
```

O container MySQL será criado com o banco `MonitorVendas` e as tabelas serão criadas automaticamente.

### 4. Rodar o backend

```bash
cd backend
./mvnw spring-boot:run
```

O servidor inicia em `http://localhost:8080`.

### 5. Rodar o frontend

```bash
cd frontend
npm install
npm start
```

A aplicação Angular inicia em `http://localhost:4200`.

---

<a name="variaveis-ambiente"></a>
## 🔐 Variáveis de Ambiente

| Variável        | Descrição                                       |
| --------------- | ------------------------------------------------ |
| `DB_USER`       | Usuário do banco MySQL                           |
| `DB_PASSWORD`   | Senha do banco MySQL (também usada pelo Docker)  |
| `FRONTEND_URL`  | URL do frontend para configuração de CORS        |

As variáveis são carregadas no Spring Boot via **dotenv-java** a partir do arquivo `.env` na raiz do projeto.

---

<a name="roadmap"></a>
## 🗺 Roadmap

- [x] Modelagem do banco de dados (MER)
- [x] Configuração do MySQL via Docker Compose
- [x] CRUD de Regiões (API)
- [x] CRUD de Vendedores (API)
- [x] CRUD de Vendas com filtros por vendedor e período (API)
- [x] Configuração de CORS dinâmico
- [x] DTOs com Bean Validation
- [x] Estrutura do frontend Angular com rotas lazy-loaded
- [ ] Finalizar páginas de CRUD no frontend (Region, Seller, Sale)
- [ ] Implementar Dashboard de análise de vendas
- [ ] Adicionar cache com **Redis** para relatórios
- [ ] Testes unitários e de integração
