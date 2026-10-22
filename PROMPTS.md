# PROMPTS

## Prompt 1
**Horário:** 2026-10-22 14:02
**Ferramenta:** Claude Code
**Texto do prompt:**
```
neste repositório iremos resolver um desafio para a empresa Privacy. segue o enunciado do desafio:

O projeto: "Seguir criadora"
Uma API e uma página simples em que um usuário segue e deixa de seguir uma
criadora, e a página mostra quantos seguidores ela tem.
API
• POST /creators/{creatorId}/followers : o usuário (enviado no corpo, userId )
passa a seguir a criadora.
• DELETE /creators/{creatorId}/followers/{userId} : o usuário deixa de seguir.
• GET /creators/{creatorId}/followers/count : devolve "creatorId": ..., "count": ... } .
Página: uma tela com o nome da criadora, o número de seguidores e um botão "Seguir" /
"Deixar de seguir". Pode ser em qualquer framework (Vue, React, Angular) ou em HTML
com JavaScript.
Requisitos
• Backend em Node.js/TypeScript ou em C#/.NET, à sua escolha.
• Banco relacional: PostgreSQL (com Docker) ou SQLite.
• Testes automatizados da API.
• Um README.md que diga como rodar o projeto e os testes. O enunciado é curto de
propósito. Se faltar alguma regra, decida, escreva a decisão no PROMPTS.md e siga.

vc ira atuar como um dev fullstack especialista em typescript, buscando a entrega tanto do front end quanto do back end. a stack que vamos utilizar é a seguinte:
- back end com nestjs e ORM prisma
- front end com react e styled-components

orientações: todas orientações devem ser seguidas a risca. nao crie regras de negocio nao descritas. nao vamos usar lint e typecheck no projeto para poupar tempo, porem é imprescindicel desenvolver a aplicação levando em conta seu uso. leve em conta as regras basicas de lint para formatação e tbm de typecheck. tudo deve ser tipado ao máximo possível.
sobre o back end
por se tratar de um desafio vamos aceitar alguns trade-offs, porem nao vamos deixar de lado jamais codigo simples e clean code. o unico acoplamento aceitavel é do prisma. vamos utilizar suas classes nativas exportadas pelo schema.prisma que servirá como nossa modelagem de dados e tbm nosso orientador de classes de dominio. vamos utilizar o template padrao do nestjs adicionando uma camada extra chamada repository.service. desse modo teremos controller > service (nosso use case) > repository. nao deve haver acoplamento entre as classes, sendo que controller chama service, que injeta o repository. nao vamos interfacear as classes, mas use SOLID ao máximo possível. DTOs devem ficar apartados dos arquivos comuns e importados aonde necessário. a nivel de controller vamos usar class validator para desenhar os DTOs de entrada. nao usaremos guards pra esse projeto. O desenvolvimento deve ser feito usando TDD, ou seja, teste antes e desenvolva.
sobre o front end:
vamos utilizar aqui tbm typescript com as mesmas regras do back end. nao utilizaremos aqui testes de integração. o serviço deve ser servido via VITE e as telas componentizadas e estilizadas com styled-components. para  comunicação com o back end utilize jest. nao temos layout para o desafio, portanto vou deixar o desenvolvimento livre. opte pela simplicidade, porem sem deixar de ser elegante. é imprescindivel que o layout seja mobile first e totalmente responsivo. para fins de velocidade focaremos no objetivo do projeto e nao criaremos telas para criar novos usuarios. deixaremos disponivel 10 usuarios diferentes com uma tela de switch de user para alterar entre um usuário e outro. pra fins de simplicidade tanto front quanto back sao stateless, ou seja, iremos mockar os usuarios no banco de dados e disponibilizar uma rota para retornar todos os usuarios cadastrados. o front ira usar apenas o id desses usuarios para fazer o switch de user para realizar as ações de seguir e deixar de seguir.

sobre a infra:
utilizaremos docker-compose para criar um banco de dados postgre simples com as tabelas creators, users e followers, esta ultima servindo de tabela para indicar quem segue quem em 1:N (um user segue multiplos creators). teremos uma pasta para cada frente, ou seja, uma pasta frontend e outra chamada backend, cada um com o seu proprio package.json, mas a raiz tbm tera seu proprio package.json que inicia ambos.

outras informações. a raiz deve conter um readme.md preenchido com as informações de como executar o projeto (docker, npm run, etc...) conciso e um arquivo chamado PROMPTS.md que sera preenchido por vc a cada finalização de execução apos um novo prompt seguindo esse modelo:

## Prompt 1
**Ferramenta: ** Claude Code
**Texto do prompt: ** (copie exatamente o que você enviou)
**Por que este prompt: ** o que você queria resolver nesta etapa
**O que a IA entregou: ** em 2 ou 3 linhas
**O que estava errado ou faltando, e o que você fez: ** ...
** Como você conferiu: ** comando que rodou, teste, resultado

vc deve preencher SOMENTE o prompt que eu enviei a cada rodada e o resto eu preencho manualmnete, e adicione tbm o horário de cada prompt

a partir do proximo prompt eu irei passar cada tarefa que vc irá executar. agora vc vai iniciar o trabalho preenchendo o o PROMPT.md e resumindo toda a sua compreensão
```
**Por que este prompt: para situar o Claude Code sobre o que e como deve ser feito, apresentando o desafio, o obejtivo e as stacks utilzadas, além do que não é permitido.**
**O que a IA entregou: o resumo de tudo que precisa ser feito além de dúvidas por conta das regras de negócios vagas que entrarei em detalhes no momento adequado.**
**O que estava errado ou faltando, e o que você fez: fui corrigido quanto ao uso de axios (eu falei jest), além das perguntas desnecessárias sobre detalhes de regras de negocio que serei mais específico no momento adequado.**
**Como você conferiu: garanti que o resumo da compreensão de tudo que seria feito, o que pode e não pode fazer estava correto.**

