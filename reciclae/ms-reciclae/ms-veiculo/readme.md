# ♻️ Reciclaê – Backend

API REST responsável pela gestão dos dados do Reciclaê — uma plataforma que incentiva o descarte correto de resíduos através de gamificação, roteirização inteligente e validação da coleta via QR Code.

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express**
- **Knex.js**
- **PostgreSQL**
- **Jest**
- **Docker + Docker Compose**

## 📁 Estrutura do Projeto

backend/
├── db/
│ ├── migrations/
│ └── seeds/
├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── services/
│ └── server.ts
├── knexfile.ts
├── Dockerfile
├── compose.yaml
└── tsconfig.json


## 🛠 Requisitos

| Ferramenta | Versão mínima |
|------------|--------------|
| Node.js    | 18.x |
| PostgreSQL | 13.x |
| npm        | 8.x |
| Docker     | Opcional |


## ⚙️ Instalação

```sh
cd backend
npm install

🔧 Variáveis de Ambiente
Crie um arquivo .env com:
Copiar código
DATABASE_HOST=localhost
DATABASE_USER=postgres
DATABASE_PASSWORD=senha
DATABASE_NAME=reciclae
DATABASE_PORT=5432
PORT=3001

🗄 Banco de Dados
Criar o banco:

sql
Copiar código
CREATE DATABASE reciclae;
Executar migrations:
Copiar código
npx knex migrate:latest
Executar seeds:
Copiar código
npx knex seed:run
▶ Rodar o servidor

👉 Sem Docker
Copiar código
npm run dev
🐳 Com Docker
sh
Copiar código
docker compose up -d

🧪 Testes
Copiar código
npm test

📌 Funcionalidades
✔ Autenticação JWT
✔ Cadastro de usuários
✔ Registro e consulta de pontos de coleta
✔ Validação de coleta via QR Code
✔ Painel administrativo
✔ API organizada em rotas, controllers e services

👥 Desenvolvedores
Gabriel Dias Cristino Sierra - 822144973
Leonardo Freitas Moraes - 822135116
Marcio Balieiro de Faria - 824219962 
Gabriel dos Santos Castro - 822157975
Lucas Quireza - 822229907
Caio Bonato - 822165248
Juan Silva Souza - 822138724
Patrick Hernani Souza da Silva - 823134370

📜 Licença
Projeto acadêmico – Uso não comercial.