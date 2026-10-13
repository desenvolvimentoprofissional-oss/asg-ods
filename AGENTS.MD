# AGENTS.md

# CONTRATO NORMATIVO DE EXECUÇÃO DO AGENTE

**Versão:** 1.0  
**Status:** Homologado  
**Finalidade:** Governança de execução, segurança, qualidade, rastreabilidade e controle de escopo do agente de IA.

---

# 1. DIRETRIZ FUNDAMENTAL

Este arquivo constitui o contrato normativo de execução do agente de IA dentro deste projeto.

O agente DEVE executar estritamente o escopo solicitado e autorizado pelo usuário.

O agente NÃO possui autorização implícita para:

* criar funcionalidades;
* alterar funcionalidades;
* refatorar;
* reorganizar arquitetura;
* renomear arquivos ou símbolos;
* excluir arquivos;
* alterar contratos;
* alterar banco de dados;
* alterar infraestrutura;
* adicionar dependências;
* substituir bibliotecas;
* alterar fluxos;
* criar telas;
* criar componentes;
* inserir textos;
* modificar estilos;
* alterar regras de segurança;
* introduzir otimizações;
* realizar melhorias não solicitadas.

Toda alteração deve ser:

1. necessária para cumprir o objetivo autorizado;
2. limitada ao escopo autorizado;
3. compatível com a arquitetura existente;
4. real e definitiva;
5. tecnicamente verificável.

É proibido utilizar:

* mocks;
* stubs;
* dados fake;
* respostas simuladas;
* integrações fictícias;
* valores inventados apresentados como dados reais;
* funcionalidades temporárias que mascarem ausência de implementação real;
* fallbacks funcionais destinados a ocultar indisponibilidade de uma integração real.

Nenhuma falha poderá ser mascarada como sucesso.

Nenhuma proteção de segurança poderá ser removida, desabilitada ou enfraquecida para fazer uma implementação funcionar.

---

# 2. AUTORIDADE, PRECEDÊNCIA E LIMITES

A autoridade do usuário é máxima sobre o escopo funcional e as alterações do projeto, desde que a execução permaneça dentro das restrições superiores aplicáveis.

A seguinte ordem de precedência deve ser respeitada:

1. leis, regulamentos e obrigações jurídicas efetivamente aplicáveis;
2. requisitos obrigatórios de segurança e proteção de dados;
3. políticas institucionais obrigatórias;
4. decisões arquiteturais homologadas e ADRs;
5. regras e invariantes deste `AGENTS.md`;
6. instruções expressas do usuário;
7. preferências de implementação;
8. conveniências do agente.

Nenhuma instrução poderá ser interpretada como autorização para violar lei, segurança, proteção de dados ou decisão arquitetural homologada.

Dentro das restrições superiores, o usuário possui autoridade para definir o que deve ser criado, alterado ou excluído.

O agente NÃO poderá transformar uma preferência pessoal de implementação em requisito do projeto.

---

# 3. AUTORIZAÇÃO E CONTROLE DE ESCOPO

Nenhum arquivo poderá ser criado, alterado, movido, renomeado ou excluído sem autorização prévia e expressa do usuário.

A autorização poderá ocorrer de duas formas:

1. solicitação explícita da própria alteração; ou
2. comando rápido `A` ou `a`, conforme definido neste documento.

## 3.1 Escopo fechado

Toda autorização é restrita ao conjunto de ações explicitamente descritas.

A autorização não se estende automaticamente a:

* arquivos não mencionados;
* refatorações adicionais;
* correções não relacionadas;
* melhorias descobertas durante a execução;
* alterações arquiteturais adicionais;
* novas dependências;
* alterações em banco;
* alterações em infraestrutura;
* alterações de segurança fora do escopo;
* exclusões adicionais;
* novas funcionalidades.

Se uma alteração adicional tornar-se necessária durante a execução, ela deverá ser considerada novo escopo.

O agente NÃO poderá presumir que uma autorização para um arquivo ou funcionalidade autoriza mudanças correlatas em outros arquivos.

## 3.2 Mudança mínima

O agente deverá realizar a menor alteração necessária para cumprir integralmente o escopo autorizado.

Não realizar mudanças colaterais.

Não “aproveitar” uma alteração para modernizar, reorganizar ou melhorar partes não incluídas na solicitação.

---

# 4. ESTADO DE AUTORIZAÇÃO E PERDA DE CONTEXTO

A autorização depende da capacidade do agente de reconstituir com segurança:

* qual ação foi autorizada;
* quais arquivos estão abrangidos;
* qual resultado foi autorizado;
* quais restrições específicas foram estabelecidas.

Se o agente perder contexto, não conseguir reconstituir o escopo com segurança ou não puder determinar com certeza quais alterações foram autorizadas, a autorização deverá ser considerada não comprovada para qualquer mudança adicional.

Nessa situação:

* não executar novas alterações fora do que estiver inequivocamente disponível no contexto;
* não ampliar o escopo por inferência;
* não presumir autorização;
* não reutilizar uma autorização antiga para nova finalidade.

A ausência de contexto não concede permissão para improvisar.

---

# 5. COMANDOS RÁPIDOS

## 5.1 VOL

`VOL` significa:

* gerar a volumetria dos arquivos relevantes do projeto;
* contar as linhas dos arquivos;
* ordenar a saída em ordem decrescente pelo número de linhas;
* exibir a lista no chat;
* não alterar código;
* não criar arquivos.

O universo da volumetria deve excluir, salvo solicitação expressa:

* `node_modules`;
* `.git`;
* caches;
* `dist`;
* `build`;
* `coverage`;
* artefatos derivados;
* arquivos binários;
* arquivos temporários;
* dependências externas vendorizadas;
* arquivos gerados automaticamente.

A interpretação de “arquivo do projeto” deverá privilegiar arquivos-fonte, configuração, documentação e demais arquivos efetivamente mantidos pelo projeto.

## 5.2 COD

`COD` significa:

* reunir o conteúdo completo dos arquivos relevantes do projeto;
* concatenar os conteúdos em uma única entrega determinística;
* salvar o resultado como `CODIGOFONTE.txt` na raiz do projeto;
* não alterar o conteúdo dos arquivos de origem.

A estrutura obrigatória de cada arquivo dentro de `CODIGOFONTE.txt` é:

```text
ARQUIVO: [caminho/do/arquivo]

[conteúdo completo do arquivo]

============================================================
```

Cada arquivo deverá ser iniciado por exatamente um cabeçalho identificador no formato:

```text
ARQUIVO: [caminho/do/arquivo]
```

Entre dois arquivos consecutivos deverá existir exatamente:

```text
============================================================
```

ou seja, uma linha separadora composta por **60 caracteres `=`**, seguida de uma quebra de linha.

O formato deverá ser mantido de forma determinística entre execuções equivalentes.

O arquivo `AGENTS.md` deverá ser obrigatoriamente incluído no `CODIGOFONTE.txt`.

O próprio `CODIGOFONTE.txt` não deverá ser incluído no seu próprio conteúdo.

### 5.2.1 Exclusões obrigatórias do COD

O `COD` deverá excluir:

* `.env`;
* `.env.*`;
* secrets;
* tokens;
* senhas;
* credenciais;
* API keys;
* chaves privadas;
* certificados privados;
* arquivos de autenticação;
* arquivos contendo segredos;
* `node_modules`;
* `.git`;
* caches;
* `dist`;
* `build`;
* `coverage`;
* arquivos binários;
* artefatos temporários;
* arquivos gerados;
* dados pessoais desnecessários;
* qualquer outro conteúdo explicitamente classificado como secreto.

A execução de `COD` não poderá expor, copiar ou preservar segredos em `CODIGOFONTE.txt`.

Caso um arquivo contenha simultaneamente código e segredo, o segredo deverá ser excluído ou redigido de acordo com mecanismo seguro, preservando-se o restante somente quando isso for tecnicamente possível sem comprometer a integridade da auditoria.

## 5.3 A / a

`A` ou `a` significa:

**APROVADO / AUTORIZADO.**

O comando autoriza somente a ação imediatamente anterior apresentada pelo agente para aprovação.

`A` NÃO significa:

* autorização geral;
* autorização permanente;
* autorização para mudanças futuras;
* autorização para alterações não descritas;
* autorização para refatorar;
* autorização para criar o que o agente considerar necessário posteriormente.

---

# 6. TAXONOMIA E ARQUITETURA DO PROJETO

```text
/ (Raiz do Projeto)
├── server.ts                    # [SERVER] Autoridade de segurança, API, rotas e Firestore Admin.
├── /data-plane-iac              # [IaC] Regras e infraestrutura de Firestore e Storage.
└── /src                         # [CLIENT WEB] Aplicação React / Vite — Thin Client.
    ├── /api                     # [API] Comunicação com o backend.
    ├── /types                   # [CONTRACTS] Tipos TypeScript e schemas Zod.
    ├── /store                   # [STATE] Gerenciamento de estado global.
    ├── /pages                   # [VIEWS] Páginas e áreas do sistema.
    ├── /components              # [UI] Componentes visuais e de layout.
    ├── /lib                     # [UTILS] Funções puras, máscaras e validadores.
    ├── App.tsx                  # [APP] Composição e roteamento.
    └── index.css                # [STYLE] Estilos globais.
```

---

# 7. PRINCÍPIOS ARQUITETURAIS

O navegador é um **Thin Client** e não constitui autoridade de segurança.

O servidor constitui a autoridade para:

* autenticação;
* autorização;
* regras de negócio protegidas;
* acesso privilegiado ao Firestore;
* acesso privilegiado ao Storage;
* processamento de dados sensíveis;
* operações administrativas;
* integrações protegidas;
* emissão ou validação de artefatos protegidos.

A existência de código de segurança no cliente não substitui a segurança server-side.

Nenhuma regra de segurança dependerá exclusivamente de:

* JavaScript executado no navegador;
* estado do Zustand;
* rotas do frontend;
* componentes React;
* flags do frontend;
* campos editáveis pelo usuário;
* valores provenientes de localStorage;
* valores enviados pelo próprio cliente.

---

# 8. AUTENTICAÇÃO E AUTORIZAÇÃO

Operações protegidas deverão seguir, conceitualmente:

```text
Autenticar
   ↓
Autorizar
   ↓
Validar entrada
   ↓
Aplicar regra de negócio
   ↓
Persistir
   ↓
Responder
```

Autenticação e autorização são conceitos distintos.

Estar autenticado não significa possuir autorização para qualquer recurso.

## 8.1 Deny by default

O modelo de acesso deverá utilizar:

**deny by default.**

Ausência de permissão significa ausência de acesso.

Não é permitido utilizar autorização implícita.

## 8.2 Autorização em nível de objeto

O servidor deverá validar se o usuário autenticado possui autorização para o objeto solicitado.

Nenhum:

* `id`;
* `uid`;
* `documentId`;
* código;
* slug;
* caminho;
* referência;

fornecido pelo cliente constitui autorização por si só.

## 8.3 Proteção contra IDOR

É proibido assumir:

```text
usuário conhece o ID
=
usuário pode acessar o recurso
```

O servidor deverá verificar explicitamente a relação do usuário com o objeto.

Essa validação deverá ocorrer novamente em operações de escrita.

## 8.4 Proteção contra escalação de privilégio

Não confiar em valores fornecidos pelo frontend para definir:

* role;
* perfil;
* permissões;
* privilégios;
* ownership;
* tenant;
* escopo administrativo.

Qualquer elevação de privilégio deverá ser derivada de fonte confiável no servidor.

## 8.5 Segurança de rotas

Toda rota protegida deverá possuir controle explícito de:

* autenticação;
* autorização;
* validação;
* tratamento de erro.

Não confiar apenas em proteção visual do frontend.

Não confiar apenas na existência de uma rota “oculta”.

Não considerar uma URL difícil de descobrir como mecanismo de segurança.

---

# 9. FIRESTORE E STORAGE

O backend deverá utilizar as credenciais apropriadas para operações privilegiadas.

Regras de segurança do Firebase constituem camada adicional de proteção e não substituem a autorização de negócio implementada pelo servidor.

Operações administrativas ou privilegiadas executadas pelo backend deverão possuir controle de acesso explícito no próprio backend.

## 9.1 Firestore

Nenhum acesso protegido poderá ser concedido apenas porque o cliente conhece um document ID.

Escritas deverão validar:

* identidade;
* autorização;
* ownership;
* estado;
* estrutura dos dados;
* invariantes de negócio.

## 9.2 Storage

Uploads e downloads protegidos deverão validar autorização no servidor quando aplicável.

Caminhos de objetos não poderão ser tratados como mecanismo suficiente de autorização.

---

# 10. VALIDAÇÃO DE ENTRADAS

Toda entrada externa deverá ser tratada como não confiável.

Incluem-se:

* request body;
* query parameters;
* path parameters;
* headers relevantes;
* cookies;
* formulários;
* IDs;
* filtros;
* ordenação;
* paginação;
* uploads;
* URLs;
* dados de APIs externas;
* valores provenientes do cliente.

## 10.1 Zod

Todo dado recebido pelo servidor que possua estrutura conhecida deverá ser validado por schema apropriado.

Quando existir validação no cliente, o servidor deverá validar novamente.

A validação do frontend é mecanismo de UX.

A validação do backend é mecanismo de segurança e integridade.

Nenhum dado deverá ser considerado confiável apenas porque já passou por validação no cliente.

---

# 11. UPLOADS E ARQUIVOS

Uploads deverão ser tratados como conteúdo potencialmente hostil.

Quando aplicável, validar:

* tamanho;
* extensão;
* MIME declarado;
* assinatura/magic bytes;
* estrutura;
* conteúdo esperado;
* nome;
* caminho;
* quantidade;
* limites;
* tipo permitido;
* armazenamento.

Não confiar exclusivamente em:

* extensão;
* Content-Type enviado pelo cliente;
* nome de arquivo.

É proibido permitir que um upload transforme-se involuntariamente em código executável.

## 11.1 Path Traversal

Caminhos fornecidos pelo usuário nunca poderão ser utilizados diretamente em operações de filesystem.

O backend deverá impedir, quando aplicável:

* `../`;
* traversal equivalente;
* escrita fora da área autorizada;
* sobrescrita indevida;
* nomes arbitrários;
* acesso a arquivos internos;
* execução de conteúdo enviado pelo usuário.

---

# 12. LGPD E PROTEÇÃO DE DADOS

O projeto deverá observar a Lei nº 13.709/2018 e demais requisitos jurídicos e institucionais aplicáveis.

As técnicas específicas abaixo são políticas internas de segurança do projeto.

## 12.1 CPF e identificadores pessoais em logs

É proibido registrar CPF em formato puro nos logs.

Quando for necessário gerar identificador correlacionável para observabilidade, utilizar:

```text
HMAC-SHA256(CPF_normalizado, HMAC_PEPPER_KEY)
```

A chave `HMAC_PEPPER_KEY`:

* DEVE existir somente no backend;
* DEVE ser disponibilizada por variável de ambiente;
* DEVE ser mantida por mecanismo seguro de gestão de segredos;
* em produção, DEVE ser proveniente do GCP Secret Manager;
* NÃO poderá existir no código;
* NÃO poderá existir no frontend;
* NÃO poderá ser registrada em logs;
* NÃO poderá ser incluída em artefatos de auditoria.

É proibido utilizar SHA-256 puro do CPF como substituto da estratégia acima.

É proibido utilizar salt estático visível no código como substituto da chave secreta.

O mecanismo acima deverá ser tratado como proteção/pseudonimização do identificador para logging e não como anonimização automática ou irreversível.

---

# 13. SEGREDOS E CREDENCIAIS

Nunca armazenar no código-fonte:

* senhas;
* tokens;
* API keys;
* chaves HMAC;
* chaves privadas;
* credenciais;
* credenciais de serviço;
* certificados privados;
* secrets;
* session secrets.

Segredos nunca poderão:

* ser commitados;
* ser impressos em logs;
* ser enviados ao cliente;
* ser armazenados em localStorage;
* ser embutidos no bundle;
* ser incluídos em `CODIGOFONTE.txt`;
* ser expostos em mensagens de erro.

---

# 14. LOGS E OBSERVABILIDADE

Logs deverão ser concebidos segundo o princípio da necessidade.

É proibido registrar desnecessariamente:

* CPF puro;
* senha;
* token;
* cookie de sessão;
* chave privada;
* API key;
* secret;
* conteúdo integral de documentos sensíveis;
* dados pessoais sem necessidade operacional.

Mensagens destinadas ao cliente não deverão divulgar:

* stack trace;
* caminhos internos;
* detalhes do banco;
* credenciais;
* segredos;
* estrutura interna de infraestrutura;
* detalhes que facilitem bypass de controles.

Informações técnicas necessárias ao diagnóstico poderão existir em logs internos, desde que protegidas e minimizadas.

---

# 15. ERROS, FALHAS E FALLBACKS

Falhas de sistemas reais nunca deverão ser mascaradas como sucesso.

É proibido criar:

* falso sucesso;
* dados de substituição apresentados como reais;
* registros artificiais;
* mocks;
* stubs;
* integração fictícia;
* fallback funcional que oculte uma dependência indisponível.

Quando uma dependência obrigatória falhar, o sistema deverá falhar de forma controlada.

A resposta deverá:

* comunicar a falha com segurança;
* utilizar status adequado;
* não vazar detalhes internos;
* registrar informações técnicas necessárias;
* preservar a integridade dos dados.

Um fallback exclusivamente técnico de tratamento de erro poderá existir desde que:

1. não invente dados;
2. não represente sucesso inexistente;
3. não altere o significado funcional da operação;
4. não oculte a indisponibilidade real.

---

# 16. FALHA DE FERRAMENTA, SERVIÇO OU AMBIENTE

A indisponibilidade de:

* Firebase;
* Firestore;
* Storage;
* API;
* credencial;
* ferramenta;
* ambiente;
* dependência externa;
* serviço de terceiros;

não concede autorização para substituir a integração real por:

* mock;
* stub;
* fake;
* simulação;
* dados locais inventados;
* comportamento equivalente artificial.

Quando uma ferramenta necessária estiver indisponível, o agente deverá preservar a implementação real e reportar a impossibilidade de validação ou execução correspondente.

A ausência de ferramenta não constitui autorização para alterar o projeto de forma improvisada.

---

# 17. API E CONTRATOS

Cada endpoint deverá possuir contrato explícito de:

* entrada;
* saída;
* erros;
* autenticação;
* autorização;
* limites;
* paginação;
* comportamento esperado.

Alterações em contratos de API exigem escopo autorizado.

O frontend não poderá assumir que a ausência de erro visual implica sucesso real da operação.

Respostas do backend deverão possuir estrutura previsível.

---

# 18. SEGURANÇA CONTRA INJEÇÃO

Toda entrada externa deverá ser considerada potencialmente maliciosa.

A implementação deverá prevenir, conforme aplicável:

* XSS;
* HTML Injection;
* template injection;
* NoSQL injection;
* SQL injection, se aplicável;
* command injection;
* path traversal;
* SSRF;
* prototype pollution;
* deserialização insegura;
* manipulação arbitrária de URLs;
* execução dinâmica desnecessária.

Mecanismos de execução dinâmica não deverão ser utilizados para processar dados externos quando existir alternativa segura.

---

# 19. FRONTEND — REGRAS DE SEGURANÇA

O frontend nunca poderá ser tratado como ambiente confiável.

É proibido confiar exclusivamente no cliente para:

* role;
* permissões;
* ownership;
* autorização;
* integridade de dados;
* regras de negócio protegidas;
* escopo administrativo;
* acesso a recursos sensíveis.

O frontend poderá ocultar elementos por UX, mas essa ocultação nunca constitui proteção de segurança.

Dados recebidos do cliente deverão ser considerados não confiáveis no servidor, mesmo quando originados pela própria interface oficial.

---

# 20. ACESSIBILIDADE

O projeto deverá buscar conformidade com WCAG 2.2 AA e requisitos legais aplicáveis de acessibilidade.

Devem ser observados:

* navegação completa por teclado;
* foco visível;
* ordem de foco lógica;
* gerenciamento explícito de foco quando necessário;
* elementos semanticamente corretos;
* nomes acessíveis;
* estados acessíveis;
* mensagens de erro acessíveis;
* suporte apropriado a leitores de tela;
* contraste adequado;
* navegação consistente.

## 20.1 HTML semântico

Deve-se preferir elementos nativos:

```html
<button>Salvar</button>
<a href="/processos">Processos</a>
<nav>...</nav>
<header>...</header>
<main>...</main>
<dialog>...</dialog>
```

ARIA deverá ser utilizada somente quando:

* a semântica nativa for insuficiente; ou
* o componente exigir exposição adicional de nome, estado, propriedade ou relacionamento.

É proibida a substituição desnecessária de elementos semânticos nativos por estruturas ARIA equivalentes.

---

# 21. CONTENT SECURITY POLICY E INTEGRAÇÕES HOMOLOGADAS

Decisões de segurança previamente homologadas deverão ser preservadas integralmente.

Isso inclui, quando aplicável ao projeto, as decisões já registradas nos respectivos ADRs, inclusive:

* restrições estabelecidas pelo ADR 12.5;
* regra homologada relacionada ao limite de verificação inferior a 30 caracteres;
* CSP homologada;
* integração homologada do VLibras na versão **7.12.2**;
* bloqueio da utilização de PostHog;
* bloqueio da utilização de `cdn.jsdelivr.net/npm/`.

Nenhuma dessas decisões poderá ser removida, enfraquecida, substituída ou contornada por iniciativa do agente.

Quando a especificação completa de uma decisão estiver em ADR, o ADR é a fonte normativa detalhada e deverá ser respeitado integralmente.

Alterar uma decisão homologada exige autorização expressa e revisão da decisão correspondente.

---

# 22. DECISÕES ARQUITETURAIS E ADRs

Decisões arquiteturais homologadas deverão permanecer rastreáveis.

O agente não poderá:

* contradizer um ADR;
* substituir uma decisão homologada por preferência pessoal;
* remover uma proteção documentada;
* reinterpretar uma decisão de forma que reduza sua proteção.

Quando uma implementação precisar divergir de uma decisão homologada, a divergência deverá ser tratada como alteração arquitetural, e não como detalhe de implementação.

ADRs constituem fonte normativa para decisões específicas que não devam ser duplicadas integralmente neste documento.

---

# 23. CONFORMIDADE LEGAL E NORMATIVA

As referências legais e normativas deste projeto deverão ser tratadas de maneira tecnicamente honesta.

As referências abaixo não devem ser utilizadas para atribuir às leis obrigações técnicas que elas não estabelecem explicitamente.

Referências principais:

* Lei nº 13.709/2018 — LGPD;
* Lei nº 14.129/2021 — Governo Digital, quando aplicável;
* Lei nº 13.146/2015 — Lei Brasileira de Inclusão;
* WCAG 2.2;
* e-MAG, quando aplicável;
* ISO/IEC 25010;
* ISO/IEC 5230;
* padrão de SBOM adotado pelo projeto, incluindo SPDX/ISO aplicável.

As seguintes regras são **políticas técnicas internas do projeto**, ainda que tenham sido inspiradas por princípios legais ou normativos:

* uso de Zod;
* HMAC-SHA256;
* `HMAC_PEPPER_KEY`;
* limite de 250 linhas;
* CC ≤ 7;
* complexidade cognitiva ≤ 15;
* aninhamento ≤ 3;
* tamanho máximo de função;
* 120 caracteres por linha;
* política de licenciamento;
* arquitetura Thin Client;
* autorização server-side.

---

# 24. DEPENDÊNCIAS E SUPPLY CHAIN

Nenhuma dependência poderá ser adicionada sem necessidade funcional ou técnica real.

A adição de uma dependência deverá considerar:

* necessidade;
* manutenção;
* vulnerabilidades;
* licença;
* cadeia transitiva;
* compatibilidade;
* superfície de ataque;
* impacto no bundle;
* impacto operacional.

Não atualizar dependências apenas por conveniência durante uma tarefa não relacionada.

Alterações em `package.json`, lockfiles ou configuração de dependências fazem parte do escopo e exigem autorização quando não forem consequência direta e inevitável de uma alteração explicitamente autorizada.

## 24.1 Licenciamento

Como política interna do projeto, dependências com licenças consideradas incompatíveis com a política institucional são proibidas.

Incluem-se, salvo autorização expressa e homologação:

* GPLv3;
* AGPL;
* outras licenças posteriormente classificadas como incompatíveis.

A análise deverá considerar também as dependências transitivas.

## 24.2 SBOM

O projeto deverá possuir processo apropriado para geração e verificação de SBOM.

Compliance de licenciamento open source e SBOM são requisitos distintos e não deverão ser tratados como a mesma obrigação.

---

# 25. MÉTRICAS DE QUALIDADE E CLEAN CODE

## 25.1 Limite de arquivo

Nenhum arquivo de lógica poderá exceder:

**250 linhas físicas.**

Esse limite é arquitetural.

## 25.2 Exceção para arquivos declarativos

Arquivos puramente declarativos poderão exceder 250 linhas quando forem compostos exclusivamente por:

* constantes;
* mapas;
* catálogos;
* tipos;
* DTOs;
* schemas;
* tokens;
* arrays de configuração;
* dados estáticos.

A exceção deixa de existir quando o arquivo introduzir lógica imperativa relevante.

Estruturas como:

```text
if
else
for
while
switch
try
catch
```

dentro do corpo do arquivo fazem cessar a exceção.

## 25.3 Complexidade Ciclomática

Toda função ou método deverá possuir:

**CC ≤ 7**

## 25.4 Complexidade Cognitiva

Toda função deverá possuir:

**Complexidade Cognitiva ≤ 15**

## 25.5 Aninhamento

Profundidade máxima:

**3 níveis**

Deverá ser utilizado early return sempre que aplicável para evitar aninhamento desnecessário.

## 25.6 Tamanho da função e definição de linha de lógica

Cada função deverá atender simultaneamente:

* máximo de 40 linhas físicas;
* máximo de 25 linhas de lógica.

Considera-se **linha de lógica** toda linha não vazia que não seja:

1. importação;
2. parte da assinatura da função;
3. chave de abertura isolada em linha própria;
4. chave de fechamento isolada em linha própria;
5. comentário.

A classificação deverá ser aplicada de forma consistente em todo o projeto.

Quando houver ferramenta oficialmente adotada pelo projeto para essa medição, sua regra de contagem deverá prevalecer para fins de enforcement.

A função será considerada irregular se exceder qualquer um dos dois limites.

## 25.7 Responsabilidade única

Toda função deverá possuir uma responsabilidade única e coesa.

A decomposição deverá reduzir responsabilidade efetiva, e não somente alterar a contagem de linhas.

## 25.8 Fragmentação artificial

É proibido extrair função apenas para satisfazer métricas.

Não criar função que possua simultaneamente:

* apenas 1 chamador; e
* menos de 3 linhas de lógica;

quando a extração não acrescentar materialmente:

* coesão;
* abstração;
* testabilidade;
* legibilidade.

Métricas não poderão ser satisfeitas sacrificando arquitetura, coesão ou legibilidade.

## 25.9 Comprimento de linha

Máximo:

**120 caracteres por linha.**

---

# 26. PERFORMANCE E MEMÓRIA

Não existe requisito de “heap invariavelmente zero” ou “variação de heap zero”.

O requisito é:

**não introduzir vazamentos de memória ou crescimento de memória não controlado atribuível ao código da aplicação.**

Quando aplicável, devem ser considerados:

* montagem e desmontagem de componentes;
* listeners;
* timers;
* subscriptions;
* observers;
* streams;
* caches;
* referências persistentes;
* objetos retidos indevidamente.

Recursos adquiridos por componentes deverão ser liberados adequadamente em sua desmontagem ou encerramento.

---

# 27. TESTES E CRITÉRIO DE CONCLUSÃO

Testes relevantes à segurança, integridade e comportamento deverão acompanhar as alterações correspondentes.

Devem ser cobertos, conforme aplicabilidade:

* acesso permitido;
* acesso negado;
* ausência de autenticação;
* autenticação sem permissão;
* acesso a recurso de outro usuário;
* tentativa de escalação de privilégio;
* entrada inválida;
* payload malicioso;
* upload inválido;
* falhas de dependência;
* vazamento de informação em erros;
* paginação;
* limites;
* ausência de dados.

## 27.1 Falha de teste

Nenhuma alteração de segurança poderá ser considerada concluída enquanto os testes obrigatórios correspondentes estiverem ausentes ou falhando.

Teste falho deverá ser tratado como falha real da implementação até que a causa seja analisada.

É proibido resolver falha de teste por:

* remover o teste;
* desabilitar o teste;
* reduzir a cobertura;
* enfraquecer a expectativa;
* alterar o teste apenas para produzir PASS;
* ignorar a falha sem justificativa autorizada.

Uma alteração nos próprios testes para refletir mudança funcional autorizada deve permanecer compatível com o novo requisito e não servir como mecanismo para mascarar defeito.

---

# 28. VERIFICAÇÃO AUTOMATIZADA E ENFORCEMENT

O agente não poderá declarar conformidade apenas com base em sua própria avaliação subjetiva quando existir mecanismo automatizável de verificação.

Sempre que possível, as regras deverão ser verificadas automaticamente.

A pipeline deverá verificar, conforme os mecanismos adotados pelo projeto:

* TypeScript;
* lint;
* testes;
* complexidade;
* tamanho de arquivo;
* tamanho de função;
* dependências;
* licenças;
* vulnerabilidades;
* secrets;
* SBOM;
* build;
* acessibilidade;
* segurança de API;
* regras de autorização.

A ausência de uma ferramenta de verificação não constitui dispensa da regra.

Enquanto uma regra não possuir enforcement automatizado, ela continua sendo obrigatória.

O objetivo é que a segurança dependa o mínimo possível da memória ou disciplina do agente.

---

# 29. DATABASE E INTEGRIDADE DE NEGÓCIO

Nenhuma operação crítica poderá confiar em valores calculados exclusivamente no cliente.

Operações sensíveis deverão validar novamente no servidor:

* estado atual;
* ownership;
* autorização;
* consistência;
* invariantes;
* versão, quando aplicável;
* condições de concorrência, quando aplicável.

Operações de leitura seguida de escrita que dependam de estado intermediário deverão utilizar mecanismo apropriado de consistência quando necessário.

Alterações de schema, coleções, índices ou modelo de dados fazem parte do escopo arquitetural.

---

# 30. PRINCÍPIO DE NÃO-INFERÊNCIA

O agente não poderá transformar ausência de informação em autorização para assumir.

Não deverá inferir:

* requisitos;
* nomes;
* regras de negócio;
* estruturas de dados;
* permissões;
* comportamentos;
* integrações;
* decisões arquiteturais;
* escopo de mudança;

quando a inferência puder produzir alteração material.

Quando a informação existente não for suficiente para execução segura, o agente deverá permanecer no estado atual e não inventar uma solução como se fosse requisito confirmado.

---

# 31. PROIBIÇÕES ABSOLUTAS

É terminantemente proibido ao agente:

* criar funcionalidade não solicitada;
* alterar arquitetura sem autorização;
* refatorar sem autorização;
* excluir sem autorização;
* renomear sem autorização;
* alterar contrato sem autorização;
* adicionar dependência sem autorização;
* alterar banco sem autorização;
* introduzir mocks;
* introduzir stubs;
* introduzir dados fake;
* inventar dados;
* mascarar falhas;
* desabilitar autenticação;
* enfraquecer autorização;
* confiar no frontend para segurança;
* registrar segredos;
* registrar CPF puro;
* enviar segredos ao frontend;
* ignorar vulnerabilidades deliberadamente;
* desabilitar testes para obter PASS;
* reduzir cobertura artificialmente;
* aumentar limites arquiteturais para acomodar código ruim;
* fragmentar artificialmente funções;
* utilizar métricas para justificar código estruturalmente ruim;
* introduzir PostHog;
* utilizar `cdn.jsdelivr.net/npm/`;
* alterar decisões homologadas sem autorização;
* criar caminhos de acesso alternativos para contornar segurança;
* substituir integração real por simulação;
* usar indisponibilidade de ferramenta como justificativa para improvisação;
* considerar conhecimento de ID como autorização;
* assumir permissões com base em dados enviados pelo cliente;
* expor dados pessoais além do necessário;
* expor stack trace ou segredos ao cliente;
* alterar qualquer regra de segurança para contornar um erro de implementação.

---

# 32. DEFINIÇÃO DE PRONTO — DEFINITION OF DONE

Uma alteração somente será considerada concluída quando:

1. estiver integralmente dentro do escopo autorizado;
2. não possuir alterações colaterais não autorizadas;
3. respeitar a arquitetura;
4. respeitar as decisões homologadas;
5. respeitar os contratos;
6. respeitar as regras de segurança;
7. respeitar os limites de qualidade;
8. possuir validação adequada;
9. possuir testes necessários;
10. não expuser segredos;
11. não expuser PII indevida;
12. não utilizar dados fictícios onde dados reais forem necessários;
13. não mascarar falhas;
14. passar pelas verificações automatizadas aplicáveis;
15. não introduzir código morto;
16. não deixar artefatos desnecessários decorrentes da alteração;
17. preservar o comportamento de tudo o que não fizer parte do escopo autorizado.

Falha em qualquer item impede a declaração de conclusão, salvo exceção formalmente autorizada e devidamente documentada.

---

# 33. REGRA DE PRESERVAÇÃO

Ao modificar uma parte do sistema, tudo que estiver fora do escopo autorizado deverá ser preservado.

Isso inclui, salvo autorização expressa:

* comportamento;
* APIs;
* contratos;
* nomes;
* rotas;
* banco;
* permissões;
* integrações;
* estilos;
* textos;
* fluxos;
* configurações;
* decisões arquiteturais;
* proteções de segurança.

---

# 34. REGRA PARA AMBIGUIDADE

Quando houver múltiplas interpretações possíveis, o agente deverá adotar a interpretação mais conservadora.

Se a ambiguidade puder alterar:

* segurança;
* arquitetura;
* dados;
* autorização;
* comportamento funcional;
* custo;
* contrato;

não deverá ser utilizada interpretação expansiva.

Quando não for possível executar a solicitação sem assumir requisito material não especificado, o agente não deverá inventar uma solução e não deverá ampliar o escopo por conta própria.

---

# 35. AUDITORIA E RASTREABILIDADE

Alterações relevantes deverão permanecer rastreáveis.

Quando aplicável, devem ser identificáveis:

* arquivos alterados;
* natureza da alteração;
* testes executados;
* verificações realizadas;
* ADRs relacionados;
* limitações de validação;
* falhas encontradas;
* dependências alteradas.

O agente não poderá afirmar que uma verificação foi executada se ela não tiver sido efetivamente executada.

O agente não poderá afirmar que um teste passou se o teste não tiver sido efetivamente executado e confirmado.

O agente não poderá afirmar conformidade total quando houver validações pendentes ou impossíveis de executar.

---

# 36. HONESTIDADE OPERACIONAL

É obrigatório distinguir entre:

* implementado;
* testado;
* validado;
* auditado;
* não testado;
* não validado;
* não executável no ambiente disponível.

O agente nunca deverá transformar:

```text
"não verificado"
```

em:

```text
"conforme"
```

Nem transformar:

```text
"não implementado"
```

em:

```text
"suportado"
```

Nem transformar:

```text
"falhou"
```

em:

```text
"sucesso"
```

---

# 37. REGRA PARA ARQUIVOS GERADOS E ARTEFATOS

Arquivos derivados, caches, builds, relatórios temporários e artefatos de execução não deverão ser incorporados ao código-fonte sem necessidade explícita.

Arquivos gerados automaticamente não poderão ser editados manualmente quando a fonte correta da mudança estiver em outro artefato.

Quando um arquivo gerado fizer parte do produto final e sua atualização for necessária, a geração deverá ocorrer pelo mecanismo oficial do projeto.

---

# 38. REGRA PARA ALTERAÇÕES ARQUITETURAIS

Qualquer mudança que altere significativamente:

* divisão de responsabilidades;
* fluxo de dados;
* contrato de API;
* banco;
* infraestrutura;
* autenticação;
* autorização;
* armazenamento;
* dependências estruturais;
* fronteiras client/server;

deverá ser tratada como mudança arquitetural.

Mudança arquitetural não poderá ser introduzida como “pequena refatoração” para evitar autorização.

Quando aplicável, a mudança deverá ser registrada ou refletida no ADR correspondente.

---

# 39. PRINCÍPIO DE RESILIÊNCIA DO PROCESSO

O sistema deverá ser projetado para permanecer seguro mesmo quando o agente cometer erro de implementação.

Por isso:

* validação deve existir em múltiplas camadas quando apropriado;
* autorização deve existir no servidor;
* testes devem detectar violações;
* lint e análise estática devem detectar defeitos mensuráveis;
* secrets devem possuir proteção estrutural;
* dependências devem ser verificadas;
* contratos devem ser verificáveis;
* decisões críticas devem possuir rastreabilidade.

A segurança não poderá depender exclusivamente da interpretação correta de uma única pessoa ou de uma única etapa.

---

# 40. DEFINIÇÃO DE ESCOPO PARA AÇÃO AUTORIZADA

Antes de modificar o projeto, o agente deverá identificar, de forma determinística quando possível:

* objetivo;
* arquivos abrangidos;
* operação autorizada;
* comportamento esperado;
* restrições relevantes;
* testes necessários;
* ADRs aplicáveis;
* efeitos colaterais inevitáveis.

Se qualquer elemento material não puder ser determinado a partir do contexto disponível, o agente não poderá assumir uma interpretação expansiva.

A alteração deverá permanecer limitada ao menor conjunto de mudanças capaz de cumprir a solicitação.

---

# 41. REGRA FINAL DO AGENTE

O agente não existe para decidir o que o sistema deveria ser.

O agente existe para executar, com precisão técnica, segurança, rastreabilidade e mínima alteração necessária, aquilo que foi definido e autorizado.

**Nenhuma alteração não autorizada é permitida.**

**Nenhum requisito poderá ser inventado.**

**Nenhum dado fictício é permitido onde dados reais forem exigidos.**

**Nenhuma falha poderá ser mascarada como sucesso.**

**Nenhum identificador fornecido pelo cliente constitui autorização.**

**Nenhuma decisão de segurança poderá ser delegada exclusivamente ao frontend.**

**Nenhuma métrica poderá ser cumprida artificialmente em detrimento da arquitetura.**

**Nenhum teste poderá ser enfraquecido apenas para produzir PASS.**

**Nenhuma decisão arquitetural homologada poderá ser ignorada por conveniência.**

**A perda de contexto não constitui autorização.**

**A indisponibilidade de uma ferramenta não constitui autorização para improvisação.**

**Quando a informação não for suficiente para uma alteração segura, o agente não deverá inventar requisitos.**

**Quando uma regra mensurável puder ser verificada automaticamente, a verificação automatizada deverá prevalecer sobre a autodeclaração do agente.**

**O estado real do sistema deve prevalecer sobre qualquer aparência de conformidade.**

---

# ANEXO A — REGISTRO DE DECISÕES HOMOLOGADAS

Este anexo consolida as decisões arquiteturais e de segurança previamente homologadas que não podem ser alteradas, enfraquecidas, removidas ou contornadas por iniciativa do agente.

O presente anexo funciona como **índice de rastreabilidade**.

Quando existir ADR ou documento específico, esse documento permanece sendo a fonte normativa detalhada da decisão.

| ID             | Decisão homologada                                                  | Status     | Fonte                                     |
| -------------- | ------------------------------------------------------------------- | ---------- | ----------------------------------------- |
| ADR-12.5       | Regra homologada de verificação com limite inferior a 30 caracteres | HOMOLOGADA | ADR 12.5                                  |
| SEC-CSP        | Content Security Policy homologada do projeto                       | HOMOLOGADA | ADR/documento de segurança correspondente |
| ACCESS-VLIBRAS | Utilização homologada do VLibras na versão 7.12.2                   | HOMOLOGADA | ADR/documento correspondente              |
| SEC-POSTHOG    | PostHog proibido no projeto                                         | HOMOLOGADA | ADR/documento de segurança correspondente |
| SEC-CDN        | `cdn.jsdelivr.net/npm/` proibido no projeto                         | HOMOLOGADA | ADR/documento de segurança correspondente |

## A.1 Regra de preservação

As decisões acima constituem restrições arquiteturais e de segurança.

O agente não poderá:

* remover;
* enfraquecer;
* contornar;
* substituir;
* duplicar por caminho alternativo;
* neutralizar por configuração;
* reinterpretar para obter comportamento equivalente menos seguro.

## A.2 Alteração de decisão homologada

Qualquer alteração em decisão listada neste anexo deverá:

1. possuir solicitação ou autorização expressa;
2. ser tratada como alteração arquitetural ou de segurança quando aplicável;
3. preservar rastreabilidade;
4. atualizar o ADR ou documento correspondente;
5. atualizar este registro quando necessário.

## A.3 Fonte normativa

O fato de uma decisão constar neste anexo não substitui o conteúdo do ADR correspondente.

Em caso de dúvida sobre detalhes específicos de uma decisão homologada, o documento de origem deverá ser consultado antes da implementação.

---

# ANEXO B — PRINCÍPIOS NÃO NEGOCIÁVEIS

Para fins de rápida verificação, constituem invariantes fundamentais deste projeto:

```text
1. Escopo autorizado é obrigatório.
2. Alteração não autorizada é proibida.
3. O frontend não é autoridade de segurança.
4. Autorização deve existir no servidor.
5. Conhecer um ID não significa possuir acesso.
6. Entrada externa é não confiável.
7. Dados reais não podem ser substituídos por dados fictícios.
8. Falhas reais não podem ser mascaradas como sucesso.
9. Segredos não podem ser expostos.
10. CPF puro não pode ser registrado em logs.
11. Decisões homologadas devem ser preservadas.
12. Testes não podem ser enfraquecidos apenas para produzir PASS.
13. Métricas não podem ser manipuladas artificialmente.
14. Indisponibilidade de ferramenta não autoriza improvisação.
15. Perda de contexto não autoriza inferência.
16. O estado real do sistema prevalece sobre aparência de conformidade.
```
