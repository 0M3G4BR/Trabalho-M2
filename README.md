# Banco de Alimentos - Parque Dom Bosco

Trabalho M2 de Programação Web (UNIVALI). Aplicação web para mostrar as campanhas de arrecadação de alimentos do [Parque Dom Bosco](https://parquedombosco.org/), em Itajaí (SC), e registrar doações.

- **backend/**: API em Node.js + Express (porta 3000)
- **frontend/**: site em Vue.js 3 + Vue Router (porta 5173)
- Os dados ficam em arrays na memória (`backend/data/dados.js`) e voltam ao início quando o servidor reinicia.

## Requisitos

- [Node.js](https://nodejs.org/) na versão `22.18` ou superior (ou `24.12` ou superior), com o npm que vem junto.
- Um navegador atual.

Para conferir a versão instalada: `node -v`.

## Como rodar

Use **dois terminais**, um para a API e outro para o site. Os dois precisam ficar abertos ao mesmo tempo.

**Terminal 1 - API**

```sh
cd backend
npm install
npm start
```

Deve aparecer `API rodando em http://localhost:3000`.

**Terminal 2 - Site**

```sh
cd frontend
npm install
npm run dev
```

Depois abra http://localhost:5173 no navegador.

Para parar qualquer um dos servidores, use `Ctrl + C` no terminal dele.

## Telas (frontend)

| Endereço | Arquivo | O que mostra |
| --- | --- | --- |
| `/` | `views/CampanhasView.vue` | Lista de campanhas, com carregando, erro e lista vazia |
| `/campanha/:id` | `views/CampanhaDetalheView.vue` | Detalhes de uma campanha, lendo o `:id` da URL |
| `/doar` | `views/DoarView.vue` | Formulário de doação (aceita `?campanha=ID` para já escolher a campanha) |
| qualquer outro | `views/NaoEncontradoView.vue` | Página "não encontrada" |

Fluxo entre as telas:

1. Na tela inicial, o botão **Ver detalhes** de cada cartão leva a `/campanha/:id`.
2. Na tela de detalhes, o botão **Quero doar** leva a `/doar?campanha=ID` (aparece só se a campanha estiver ativa).
3. Depois de enviar a doação com sucesso, a tela mostra uma mensagem e volta para os detalhes da campanha, já com o total atualizado.

## API (backend)

| Método | Endereço | Respostas |
| --- | --- | --- |
| GET | `/api/campanhas` | 200 |
| GET | `/api/campanhas/:id` | 200, ou 404 se não existir |
| POST | `/api/doacoes` | 201, ou 400 (dados inválidos / campanha concluída), 404 (campanha não existe) |

Corpo do `POST /api/doacoes`:

```json
{ "campanhaId": 1, "nomeDoador": "Maria Souza", "email": "maria@email.com", "quantidade": 5 }
```

Exemplos de erro:

```json
{ "erro": "Campanha não encontrada" }
```

```json
{ "erro": "Dados inválidos", "detalhes": ["nomeDoador é obrigatório (mínimo 3 letras)"] }
```

### Regras de negócio

- Uma doação precisa de campanha existente, nome do doador com pelo menos 3 letras, e-mail com `@` e quantidade maior que zero.
- A ordem das verificações no `POST` é: validar os campos (400), procurar a campanha (404) e conferir se está ativa (400).
- Cada doação soma na campanha. Quando o arrecadado chega na meta, a campanha vira `concluida` e para de aceitar doações.
- A data da doação é gerada pelo servidor, no formato `AAAA-MM-DD`.

### Como testar a API sem o site

Com o servidor rodando, abra no navegador:

- http://localhost:3000/api/campanhas
- http://localhost:3000/api/campanhas/1
- http://localhost:3000/api/campanhas/99 (deve dar 404)

Para o `POST`, use o Postman, o Insomnia ou a extensão Thunder Client do VS Code, enviando o corpo acima em JSON.

## Pastas

```text
backend/
  server.js            liga o servidor (cors, express.json e as rotas)
  data/dados.js        arrays campanhas e doacoes
  routes/campanhas.js  GET /api/campanhas e GET /api/campanhas/:id
  routes/doacoes.js    POST /api/doacoes
frontend/src/
  main.js              inicia o Vue e liga o router
  App.vue              topo, menu e <router-view />
  router/index.js      rotas
  services/api.js      chamadas à API com fetch (a URL da API fica aqui)
  components/          CampanhaCard.vue
  views/               as telas
  assets/main.css      estilos gerais
```

## Observações

- Como os dados ficam na memória, doações registradas somem quando o servidor da API é reiniciado.
- O frontend chama a API em `http://localhost:3000/api` (definido em `frontend/src/services/api.js`). O `cors` no servidor é o que permite essa chamada entre portas diferentes.
- A pasta `node_modules` não vai para o GitHub (está no `.gitignore`). Por isso é preciso rodar `npm install` em `backend/` e em `frontend/` depois de baixar o projeto.
