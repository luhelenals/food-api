# FoodApp
Esta API foi desenvolvida utilizando ASP.NET Core com Entity Framework com funcionalidades de gerenciamento de ingredientes e receitas.

## Preview
![image](https://github.com/user-attachments/assets/362b19b3-677d-4418-ab4c-75515cbe2c17)

## Funcionalidades
**Gerenciamento de Ingredientes e Receitas**:
-  Listar todos os ingredientes ou receitas
-  Listar as receitas compatíveis aos ingredientes em estoque
-  Obter detalhes de um ingrediente ou uma receita por Id
-  Criar, atualizar e excluir ingredientes ou receitas
-  Calcular compatibilidade entre ingredientes disponíveis e receitas
## Estrutura do Projeto
**Controllers**:
-  `IngredienteController` e `ReceitaController`: Gerenciam os endpoints relacionados a ingredientes e receitas.

**Models**:
-  `Ingrediente`: Representa um ingrediente.
-  `Receita`: Representa uma receita e calcula sua compatibilidade com base nos ingredientes disponíveis.
-  `IngredienteSummary` e `ReceitaSummary`: Modelos simplificados para representar relacionamentos.

**DTOs (Data Transfer Objects)**:
-  `IngredienteRequestDto`: Estrutura para criação e alteração de ingredientes.
-  `ReceitaRequestDto`: Estrutura para criação e alteração de receitas.
-  `IngredienteDto` e `ReceitaDto`: Representações detalhadas para transferência de dados.

**Mappers**:
-  Mapeamento entre modelos e DTOs para simplificar o tráfego de dados entre a API e o cliente.

**Data**:
-  `ApplicationDBContext`: Contexto do Entity Framework configurado para gerenciar os relacionamentos entre receitas e ingredientes.

## Configuração

1.  **Clonar o repositório**:

```bash
git clone https://github.com/luhelenals/food-api.git
```
2.  **Configurar a conexão com banco de dados**:
Editar a string de conexão de `api/appsettings.json`:
```json
"ConnectionStrings": {
	"DefaultConnectionString":  "YourConnectionString"
}
```
3. **Aplicar migrações e criar banco de dados**:
```bash
dotnet ef migrations add InitialMigration
dotnet ef database update
```
4. **Executar back end**:
```bash
cd api
dotnet run
```
5. **Executar front end Angular**:
```bash
cd angular-ui
ng serve
```
6. **Ou acessar Swagger**:
http://localhost:5077/swagger/index.html

## Endpoints

### Ingredientes
-   `GET /api/ingrediente`: Lista todos os ingredientes.
-   `GET /api/ingrediente/{id}`: Retorna detalhes de um ingrediente específico.
-   `POST /api/ingrediente`: Cria um novo ingrediente.
-   `PUT /api/ingrediente/{id}`: Atualiza um ingrediente existente.
-   `DELETE /api/ingrediente/delete/{id}`: Remove um ingrediente.

### Receitas
-   `GET /api/receita`: Lista todas as receitas.
-   `GET /api/receita/{id}`: Retorna detalhes de uma receita específica.
-   `POST /api/receita`: Cria uma nova receita.
-   `PUT /api/receita/{id}`: Atualiza uma receita existente.
-   `DELETE /api/receita/delete/{id}`: Remove uma receita.

## Tecnologias Utilizadas
-   **Linguagem da API**: C# com .NET 9.0
-   **Banco de Dados**: PostgreSQL/Entity Framework Core
-   **Framework Web**: ASP.NET Core
-   **Documentação**: OpenAPI/Swagger
-   **Front end**: Angular 19
