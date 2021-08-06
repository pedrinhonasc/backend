# Coteminas - Backend
## Objetivo
Densenvolver uma aplicação utilizando NodeJS e Typescript que exponha uma API Rest e faça comunicação com um banco de dados(relacional ou não relacional).
## Tecnologias
- Stack: NodeJS e Typescript
- Banco de dados: Postgres
- Ferramentas para formataçãoe e análise de código: Prettier e Eslint
- Framework de test: Jest

## Requisitos
- NodeJS v12.18.4
- Yarn v1.22.5
- Postegres
## Execução
Primeiro, abra um terminal e execute o comando abaixo para instalar todas as dependências do projeto:
```
# yarn
```
Em seguida, inicie um banco de dados Postgres com o nome `coteminas`, usuário `postegres`, senha `docker` e que escute a porta `5234`.

Então, crie um arquivo `.env` para que a aplicação consiga encontrar as variáveis de ambiente utilizadas por ela.
```
# cp .env.example .env
```
Com o Postgres escutando a porta `5234`, rode as migrações e popule as tabelas do banco:
```
# yarn typeorm migration:run  <-- Gera as tabelas do banco de dados
# yarn seed:run  <-- Popula as tabelas do banco de dados
```
Por último, execute o comando seguinte para iniciar a aplicação:
```
# yarn dev:server
```
Ela estará rodando em `http://localhost:3333`.

Um exemplo de uma requisição que pode ser feita pelo browser é
`http://localhost:3333/products?productsPerPage=5&currentPage=1&name=Toalha`.

Caso queira, é possível utilizar o Insomnia com a mesma finalidade.

## Testes
Os testes form implementados usando `Jest`. Além da execução dos testes, `Jest` é responsável pela geração de um relatório de cobertura. Este relatório mostra quais funcionalidades do código estão sendo cobertas pelos testes, quantas vezes cada linha do código foi executada, entre outras coisas.

Para executar  e gerar o relatório de cobertura, basta abrir um terminal e rodar o seguinte comando:
```
# yarn test
```
