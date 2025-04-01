# Agenda Digital

Uma aplicação simples de gerenciamento de contatos com sistema de autenticação.

## Recursos

- Sistema de autenticação (login/cadastro)
- Adicionar, editar e excluir contatos
- Listagem de contatos
- Interface simples e intuitiva

## Tecnologias Utilizadas

- Node.js com Express
- MongoDB Atlas para armazenamento de dados na nuvem
- EJS para templates
- Express-session para gerenciamento de sessões
- bcryptjs para criptografia de senhas
- dotenv para gerenciamento de variáveis de ambiente

## Requisitos

- Node.js (versão 10 ou superior)
- Conta no MongoDB Atlas (gratuita)

## Configuração do MongoDB Atlas

1. **Criar uma conta no MongoDB Atlas**:

   - Acesse [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
   - Preencha o formulário de registro e crie sua conta
   - Você também pode se cadastrar usando sua conta Google

2. **Criar um cluster gratuito**:

   - Após fazer login, clique em "Build a Database"
   - Selecione o plano "Shared" (gratuito)
   - Escolha o provedor de nuvem (AWS, Google Cloud ou Azure)
   - Escolha a região mais próxima de você
   - Clique em "Create Cluster" (pode levar alguns minutos para ser criado)

3. **Configurar a segurança**:

   - Na seção "Database Access", crie um usuário com senha para acessar o banco
   - Na seção "Network Access", adicione seu IP atual ou permita acesso de qualquer local (0.0.0.0/0) para desenvolvimento

4. **Obter a string de conexão**:

   - Clique no botão "Connect" no seu cluster
   - Selecione "Connect your application"
   - Escolha Node.js como driver
   - Copie a string de conexão fornecida
   - Substitua `<password>` pela senha do seu usuário do banco de dados

5. **Configurar a aplicação**:
   - Crie um arquivo `.env` na raiz do projeto (este arquivo não será enviado ao GitHub)
   - Adicione suas variáveis de ambiente conforme exemplo abaixo

## Instalação

1. Clone o repositório:

```
git clone <url-do-repositorio>
cd agenda-digital
```

2. Instale as dependências:

```
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`:

```
PORT=3000
MONGODB_URI=sua-string-de-conexao-do-mongodb
SESSION_SECRET=alguma-string-secreta
```

4. Inicie a aplicação:

```
npm start
```

Para desenvolvimento (com reload automático):

```
npm run dev
```

5. Acesse a aplicação no navegador em `http://localhost:3000`

## Uso

1. Registre-se com um e-mail e senha (entre 6 e 12 caracteres)
2. Faça login com suas credenciais
3. Adicione contatos fornecendo pelo menos nome e telefone
4. Visualize, edite ou exclua seus contatos conforme necessário
5. Faça logout quando terminar

## Estrutura do Projeto

- `server.js` - Arquivo principal da aplicação
- `controllers/` - Lógica de negócios da aplicação
- `models/` - Definição dos modelos do MongoDB
- `routes/` - Definição das rotas
- `views/` - Templates EJS para renderização
- `public/` - Arquivos estáticos (CSS, JavaScript, etc.)
- `.env` - Variáveis de ambiente (não incluído no repositório)
