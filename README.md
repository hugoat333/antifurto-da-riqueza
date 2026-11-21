# Celular Protegido — Antes de Viajar (landing page)

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

## Fotos

A foto principal (Unsplash, Peter Chirkov) fica em `public/hero.jpg` e é configurada em `config.fotos.hero`.
Enquanto `src` estiver vazio, o topo aparece sem foto. Use apenas imagens obtidas pelo
Unsplash e mantenha o crédito do autor.

Avisos de pendência aparecem só no console em modo de desenvolvimento, nunca na página pública.
