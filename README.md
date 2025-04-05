# MetaVisível - Seu Gerenciador Financeiro Pessoal 💰📊

Bem-vindo ao MetaVisível, uma aplicação web moderna para ajudar você a visualizar e gerenciar suas finanças pessoais de forma clara e eficiente.

Este projeto foi desenvolvido utilizando React com TypeScript no frontend, estilizado com Ant Design, e um backend robusto em Node.js com Express e SQLite para persistência de dados.

## ✨ Funcionalidades Principais

*   **Autenticação Segura:** Sistema completo de registro e login de usuários com armazenamento seguro de senhas (hash bcrypt) e autenticação baseada em JSON Web Tokens (JWT).
*   **Dashboard Interativo:**
    *   Gráfico de Donut (Pizza) visualizando a distribuição de gastos por categoria.
    *   Interatividade no gráfico para detalhar informações da categoria selecionada.
    *   Formulário intuitivo para adicionar novos gastos (Descrição, Valor, Categoria).
    *   Card de resumo colapsável para otimizar o espaço.
*   **Alternância de Tema:** Botão para alternar facilmente entre modo Claro (Light Mode) e Escuro (Dark Mode) em toda a aplicação.
*   **Design Responsivo:** Interface adaptável a diferentes tamanhos de tela, construída sobre o sistema de Grid do Ant Design.
*   **Seções Adicionais (Exemplos/Testes):**
    *   Galeria de Imagens (`/imagens`): Grid de imagens com paginação e busca.
    *   Clone Visual Instagram (`/azulele`): Recriação da interface de um post e stories do Instagram.

## 🚀 Tecnologias Utilizadas

**Frontend:**

*   React (v18+)
*   TypeScript
*   Vite (Assumido como builder/dev server)
*   Ant Design (`antd`) - Biblioteca de componentes UI
*   Ant Design Plots (`@ant-design/plots`) - Para gráficos
*   React Router (`react-router-dom`) - Para roteamento

**Backend:**

*   Node.js
*   Express - Framework web
*   SQLite (`sqlite3`) - Banco de dados relacional baseado em arquivo
*   JSON Web Token (`jsonwebtoken`) - Para autenticação
*   Bcrypt (`bcrypt`) - Para hashing de senhas
*   CORS (`cors`) - Para permitir requisições do frontend
*   Body Parser (`body-parser`) - Para parsear corpo das requisições

## ⚙️ Configuração e Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente.

**Pré-requisitos:**

*   Node.js (versão LTS recomendada)
*   npm (geralmente vem com o Node.js) ou Yarn
*   Git

**Passos:**

1.  **Clonar o Repositório:**
    ```bash
    # Substitua <URL_DO_REPOSITORIO> pela URL real do seu repo no GitHub/GitLab
    git clone <URL_DO_REPOSITORIO>
    cd meta-visivel
    ```

2.  **Instalar Dependências do Backend:**
    ```bash
    cd backend
    npm install
    ```

3.  **Instalar Dependências do Frontend:**
    ```bash
    cd .. # Voltar para a pasta raiz (meta-visivel)
    npm install
    ```

## ▶️ Executando a Aplicação

Você precisa iniciar o backend e o frontend separadamente.

1.  **Iniciar o Backend:**
    *   Navegue até a pasta do backend.
    *   Execute o comando:
        ```bash
        cd backend
        npm start
        # Ou: node server.js
        ```
    *   O servidor backend estará rodando em `http://localhost:3001` (por padrão).
    *   Na primeira execução, ele criará o arquivo `backend/database.db` e o usuário `admin` com senha `password`.

2.  **Iniciar o Frontend:**
    *   Abra **outro terminal** na pasta raiz do projeto (`meta-visivel`).
    *   Execute o comando:
        ```bash
        npm run dev
        ```
    *   A aplicação frontend estará acessível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

3.  **Acessar:** Abra seu navegador e acesse o endereço do frontend (ex: `http://localhost:5173`). Você será direcionado para a tela de login.

## 📁 Estrutura de Pastas (Simplificada)

```
meta-visivel/
├── backend/           # Código do servidor Node.js/Express
│   ├── node_modules/  # Dependências do backend
│   ├── database.db    # Arquivo do banco de dados SQLite (local)
│   ├── server.js      # Arquivo principal do servidor
│   └── package.json   # Dependências e scripts do backend
├── node_modules/      # Dependências do frontend
├── public/            # Arquivos estáticos do frontend
├── src/               # Código fonte do frontend React
│   ├── components/    # Componentes React reutilizáveis
│   ├── pages/         # Componentes de página (VisaoGeral, Login, Register, etc.)
│   ├── services/      # Lógica para chamadas de API (authService.ts)
│   ├── App.tsx        # Layout principal, Roteamento, Provedores (Tema, Auth)
│   └── main.tsx       # Ponto de entrada da aplicação frontend
├── .gitignore         # Arquivos e pastas ignorados pelo Git
├── index.html         # Template HTML principal (Vite)
├── package.json       # Dependências e scripts do frontend
├── README.md          # Este arquivo
└── tsconfig.json      # Configuração do TypeScript
```

## 🔗 Endpoints da API (Backend)

*   **`POST /api/register`**: Registra um novo usuário.
    *   **Corpo:** `{ "username": "...", "email": "...", "password": "..." }`
    *   **Resposta:** `201 Created` (sucesso) ou erro (`400`, `409`, `500`).
*   **`POST /api/login`**: Autentica um usuário existente.
    *   **Corpo:** `{ "username": "...", "password": "..." }`
    *   **Resposta:** `{ "accessToken": "..." }` (sucesso) ou erro (`401`, `500`).
*   **`GET /api/auth/status`**: Verifica a validade de um token.
    *   **Header:** `Authorization: Bearer <seu_token_jwt>`
    *   **Resposta:** `{ "isAuthenticated": true, "user": { "username": "..." } }` (sucesso) ou erro (`401`, `403`).
*   **`POST /api/logout`**: Endpoint simbólico para logout (principalmente tratado no cliente).

*   **(Futuro) `POST /api/gastos`**: Salvar um novo gasto associado ao usuário.
*   **(Futuro) `GET /api/gastos`**: Buscar os gastos do usuário para exibir no dashboard/gráfico.

## 🔒 Segurança

*   Senhas são armazenadas usando hash `bcrypt` no banco de dados.
*   A autenticação é feita via JWT, com tokens de curta duração (1 hora por padrão).
*   O arquivo `.gitignore` está configurado para evitar o envio de dados sensíveis (como `node_modules`, `.env`, `database.db`) para o repositório Git.
*   **IMPORTANTE:** O `JWT_SECRET` em `backend/server.js` é um placeholder. Em produção, utilize uma variável de ambiente segura.

## 🤝 Contribuição

Pull requests são bem-vindos. Para mudanças maiores, por favor, abra uma issue primeiro para discutir o que você gostaria de mudar.

## 📄 Licença

[MIT](https://choosealicense.com/licenses/mit/) - Sinta-se à vontade para usar e modificar o código.
