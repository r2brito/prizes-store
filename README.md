# Programa de Fidelidade - Front-End

Este é um projeto front-end para um programa de fidelidade onde os usuários podem visualizar produtos, adicioná-los ao carrinho e realizar compras usando seus pontos acumulados. A aplicação foi desenvolvida usando React, TypeScript, Material-UI para componentes e SASS para estilização.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **React Router**: Utilizado para gerenciamento de rotas na aplicação.
- **Material-UI**: Biblioteca de componentes React para design.
- **SASS/SCSS**: Preprocessador CSS para estilização da aplicação.

## Estrutura do Projeto

A estrutura principal do projeto está organizada da seguinte forma:

```
/components # Componentes reutilizáveis
/context # Gerenciar estados da aplicação
/guards # Guardas de rota para proteger rotas autenticadas
/layouts # Layouts para as páginas da aplicação
/pages # Páginas principais da aplicação
/styles # Arquivos de estilo SASS/SCSS
/routes # Configuração de rotas
/sections # Seções personalizadas da aplicação
/utils # Funções utilitárias
```

## Funcionalidades Implementadas

1. **Navbar**:

   - Exibe o saldo de pontos atual do usuário.
   - Exibe o número de itens no carrinho.
   - Acesso ao histórico de transações.

2. **Visualização de Produtos**:

   - Exibe uma lista de produtos disponíveis para troca por pontos.
   - Permite adicionar produtos ao carrinho.

3. **Carrinho**:

   - Visualiza produtos adicionados ao carrinho.
   - Permite remover produtos do carrinho.
   - Mostra o total de pontos dos produtos no carrinho.

4. **Checkout**:

   - Permite que o usuário realize o checkout usando seus pontos.
   - Verifica se o usuário possui pontos suficientes para a compra.
   - Atualiza o saldo de pontos e o histórico de transações após o checkout.

5. **Histórico de Transações**:

   - Exibe um histórico das compras realizadas pelo usuário.

6. **Autenticação**:
   - Tela de login para usuários autenticados.
   - Proteção de rotas para áreas que requerem autenticação.

## Configuração e Execução do Projeto

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu ambiente:

- Node.js (v14 ou superior)
- npm ou yarn

### Passos para Executar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone git@github.com:r2brito/prizes-store.git
   cd prizes-store
   ```

2. **Instale as dependências:**

Usando npm:

```bash
npm install
```

Usando yarn:

```bash
yarn install
```

3. **Execute o projeto:**

Para iniciar o projeto em ambiente de desenvolvimento:

Usando npm:

```bash
npm start
```

Usando yarn:

```bash
yarn start
```

A aplicação estará disponível em http://localhost:3000.

4. **Rodar Servidor:**

- A aplicação está usando o json-server para simular um servidor com os dados dos produtos e usuários:

```bash
yarn server
```

### Dados

É possivel usar 2 usuários para teste:

- email: user@example.com; password: P@ssw0rd
- email: user2@example.com; password: P@ssw0rd

Caso queira adicionar outro usuário para teste, isso pode ser feito no arquivo `server.json`
