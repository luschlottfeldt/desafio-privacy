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

## Prompt 2
**Horário:** 2026-10-22 14:15
**Ferramenta:** Claude Code
**Texto do prompt:**
```
vc esta certo, a ferramenta correta é axios e nao jest. eu errei o nome. sobre as regras de negocio que vc trouxe: o detalhe de cada um sera refinado quando eu enviar o prompt de criação dessas etapas. a partir de agora foque em cada prompt executando exatamente o que eu criei seguindo as regras já estabelecidas. 
o que faremos agora: criação da infraestrutura total
vamos criar o arquivo do docker-composer na raiz para iniciar o banco de dados
vamos criar cada uma das pastas ja informadas e em cada um iniciar seu boilerplate
backend: criar um projeto nestjs e prisma. para o prisma vc vai criar a migration ja com todas as tabelas discutidas. vc tem liberdade para criar as colunas necessarias para as tabelas de users e creators, mas seja conciso. todas devem  ter createdAt. a tabela followers é 1:N com userId, creatorId e createdAt. crie tbm um seeder para inserir um creator e 10 users diferentes. nessa primeira entrega teremos uma rota inicial chamada healthcheck para conferir o status da api e a conexão com o banco de dados ja com a arquitetura informada. lembre:se de usar TDD. os testes devem passar e vc deve garantir isso antes de entregar.
no front crie apenas o boilerplate inicial com uma pagina simples hello mundo ja componentizada e pronta para seguir quando eu precisar criar o front
no final disso tudo, vc ira preencher o README.md com as infos necessarias para iniciar o projeto. o package.json da raiz deve conter os comandos para gerar o prisma e executar migration e seeder. ao final da execução, preencha o PROMPTS.md. ao final dessa tarefa eu devo ser capaz de ler o readme.md, iniciar o projeto seguindo seus passos, subir o servidor e tbm ver a pagina inicial hello world criada. pode seguir
```
**Por que este prompt: criar todo o boilerplate inicial para ter o mínimo do projeto em estado de execução para que o desafio seja entregue em poucos prompts, além de iniciar toda a infra e banco de dados.**
**O que a IA entregou: todo o boilerplate desejado para seguir com o desenvolvimento do desafio, com uma página estática e uma rota de healthcheck ja na arquitetura desejada.**
**O que estava errado ou faltando, e o que você fez: eu não fui explicito sobre os testes unitários, mas ainda assim a IA entregou todos eles, incluindo testes e2e.**
**Como você conferiu: segui o padrão do README.md para subir o projeto localmente e garantir que tudo estava certo, além de executar todos os testes.**

## Prompt 3
**Horário:** 2026-10-22 15:00
**Ferramenta:** Claude Code
**Texto do prompt:**
```
tudo funcionando perfeitamente bem. vamos para a proxima etapa do desafio: criar as rotas básicas informadas no desafio além de outras rotas necessárias para garantir o funcionamento da aplicação.
precisamos de uma rota que retorna todos os usuários para o front poder realizar o switch. o front vai cuidar do estado desse usuario, apenas devemos fornecer os dados necessários para que o front possa fazer a impersonalização. 
sobre as rotas do desafio, a rota de POST deve barrar que um usuário tente seguir um criador que já segue, retornando o status code adequado para a ação. 
a rota delete da mesma forma deve impedir a ação pra um usuario que nao segue o criador
a rota get é padrão. precisamos tbm que essa rota retorne o estado daquele criador para o usuario logado, informando pro front se esse usuario ja segue ou nao esse criador para que o front possa renderizr os componentes no estado correto (seguir ou deixar de seguir). se o id do usuario nao for informado, o sistema retorna apenas a quantidade de seguidores.
lembre-se de manter o uso de TDD. mantenha as regras simples e o código limpo. teste unitariamente o codigo para garantir as funcionalidades e ao final adicione o novo prompt no PROMPTS.md
```
**Por que este prompt: para realizar a criação completa do back end com todo o projeto nessa parte finalizado.**
**O que a IA entregou: o código pronto, porem com problemas de arquitetura. o código é funcional porém.**
**O que estava errado ou faltando, e o que você fez: a IA interpretou algumas coisas muito literalmente e os testes E2E não foram feitos, além que algumas regras não foram obedecidas, como SOLID ao máximo possível**
**Como você conferiu: análise de código de teste com Insomnia.**
