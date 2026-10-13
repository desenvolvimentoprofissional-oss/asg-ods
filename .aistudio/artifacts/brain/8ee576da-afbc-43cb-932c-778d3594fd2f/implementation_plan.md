# Resolução de Vínculo de Publicação e Desvinculação de Localhost (asg-ods.ai.studio)

Ajuste do fluxo de publicação no Google AI Studio para eliminar a vinculação da porta `localhost:3000` identificada em *Advanced Settings*, permitindo que os links de acesso da interface direcionem diretamente para `https://asg-ods.ai.studio`.

## Decisões Confirmadas pelo Usuário

> [!IMPORTANT]
> Confirmado pelo usuário: Em **Advanced Settings** do painel de publicação do AI Studio, está configurada a porta **3000 ou localhost**. O usuário autorizou a execução do fluxo de **Unpublish** seguido de **Republish** para corrigir a vinculação na infraestrutura do Cloud.

- **Vínculo Local Detectado:** A porta 3000 ou localhost configurada em *Advanced Settings* faz com que o AI Studio mapeie o botão de acesso e a rota para `http://localhost:3000`.
- **Ação Autorizada:** Executar o desvinculamento do app (*Unpublish app*), limpar o direcionamento legado em *Advanced Settings*, e realizar nova publicação direta vinculada ao subdomínio oficial `asg-ods.ai.studio`.

---

## 1. Visão Geral e Causa Raiz

- **Problema:** O painel de publicação do Google AI Studio possui um campo em *Advanced Settings* onde foi definida ou mantida a porta interna de desenvolvimento (`3000` / `localhost`). Isso fez com que o roteador de publicação do Cloud associasse o atalho do botão `Visit` ao host local da máquina física, em vez de apontar para a URL gerenciada em nuvem.
- **Solução:**
  1. Despublicar a versão atual no painel do AI Studio clicando no botão **Unpublish app**.
  2. Ajustar/limpar o campo de porta/host em **Advanced Settings** para que a publicação assuma a URL pública padrão.
  3. Republicar com o subdomínio **`asg-ods`** (formando `https://asg-ods.ai.studio`).
  4. Manter o código da aplicação e o container Node/Express alinhados com a variável dinâmica de produção (`PORT=8080` do Cloud Run) e homepage canônica.

---

## 2. Passo a Passo do Fluxo de Correção

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. PAINEL AI STUDIO                                                    │
│    Clicar em [Unpublish app] no canto inferior direito                 │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 2. CONFIGURAÇÕES AVANÇADAS (Advanced Settings)                         │
│    Remover / limpar qualquer menção a "localhost" ou "porta 3000"     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 3. NOVA PUBLICAÇÃO (Publish / Republish)                               │
│    Definir App URL: asg-ods                                            │
│    Destino final: https://asg-ods.ai.studio                            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 4. VALIDAÇÃO FINAL                                                     │
│    Botão [Visit] e link 'asg-ods.ai.studio' abrindo a página pública   │
└────────────────────────────────────────────────────────────────────────┘
```

### Detalhamento das Etapas:

1. **Etapa 1 - Despublicação do Applet:**
   * No painel do Google AI Studio (Imagem 3), clicar no botão **Unpublish app**.
   * Isso desaloca o roteamento incorreto que estava atrelado a `localhost:3000`.

2. **Etapa 2 - Limpeza de Configurações Avançadas:**
   * Em **Advanced Settings**, verificar os campos de porta/proxy.
   * Se houver campo de porta, deixar vazio ou indicar a porta de nuvem gerenciada (ou porta padrão que o assistente do Cloud Run define).
   * Assegurar que nenhum campo de URL contenha `localhost` ou `127.0.0.1`.

3. **Etapa 3 - Republicação Oficial:**
   * Clicar em **Publish App**.
   * Inserir o subdomínio: `asg-ods` (resultado: `https://asg-ods.ai.studio`).
   * Concluir o deploy.

4. **Etapa 4 - Teste de Clique:**
   * Clicar no botão `[ Visit ]` e no link `App URL` para garantir que ambos abrem diretamente em `https://asg-ods.ai.studio` sem qualquer redirecionamento para `localhost:3000`.

---

## 3. Garantias de Código e Governança

- **Preservação Integral:** O código-fonte da aplicação (layout, temas, acessibilidade com VLibras, formulário de adesão de IES e cabeçalhos de segurança CSP) permanece 100% preservado e pronto para produção.
- **Conformidade Normativa:** O código respeita todas as regras do `AGENTS.md` (limites de arquivo, linhas, complexidade e zero dados simulados).
- **Consistência:** `CODIGOFONTE.txt` e a pasta `dist` permanecem sincronizados para que qualquer build de produção subsequente entregue a revisão homologada.
