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

A imagem do celular na primeira dobra é uma ilustração feita em CSS
(`IlustracaoCelular` em `src/App.jsx`). Troque por captura real das aulas quando houver.
