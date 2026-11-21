# Método Celular Protegido (landing page)

Landing page em React + Vite + Tailwind. Sem rastreadores, fontes externas ou envio de dados.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera a pasta dist/ para publicar
```

## Antes de publicar

Tudo que é comercial fica em **`src/config.js`**: preço, link do checkout, entrega,
prazo de acesso, suporte, reembolso e dados do vendedor.

- Campo vazio aparece na página como `[PREENCHER: ...]` e entra no aviso amarelo
  de rascunho no topo. O aviso some quando tudo estiver preenchido.
- Sem `checkoutUrl` (https), o botão de compra da oferta não é exibido e os
  demais botões levam à seção da oferta.
- `conteudoFinalizado: false` mantém as etiquetas de "conteúdo previsto".
  Mude para `true` quando as aulas e o checklist estiverem prontos.

## VSL e materiais do método

- **VSL**: `config.vsl` aceita um `.mp4` próprio (`arquivo`) ou um link de
  incorporação do YouTube/Vimeo (`embedUrl`), mais uma imagem de `capa`.
  Sem vídeo configurado, o player não aparece. Com `embedUrl` + `capa`, o
  player externo só carrega quando a pessoa clica. Nunca há autoplay com som.
- **O que você recebe**: `config.materiais.capturaVideo` (captura vertical de um
  vídeo do método) e `config.materiais.checklist` (imagem do checklist). Com
  pelo menos um deles, a seção passa a ter duas colunas no computador.

Pendências aparecem só no console em modo de desenvolvimento, nunca na página pública.
