/**
 * CONFIGURAÇÃO COMERCIAL — edite somente este arquivo antes de publicar.
 *
 * Campos deixados como "" (vazio) aparecem na página marcados como
 * "PREENCHER" e entram no aviso de rascunho no topo. Quando todos estiverem
 * preenchidos, o aviso some sozinho.
 *
 * Só escreva aqui o que estiver confirmado (prazo, suporte, reembolso etc.).
 */
export const config = {
  produto: {
    nome: "Celular Protegido",
    complemento: "Antes de Viajar",
  },

  preco: {
    valor: "19,90", // sem "R$"
    condicao: "pagamento único",
  },

  // Link do checkout. Precisa começar com https://
  // Enquanto estiver vazio, os botões levam à seção da oferta e o botão
  // de compra não é exibido.
  checkoutUrl: "",

  // Forma e prazo de entrega. Ex.: "Você recebe o link de acesso no e-mail
  // informado na compra em até X horas após a confirmação do pagamento."
  entrega: "",

  // Prazo de acesso ao conteúdo. Ex.: "Acesso por 12 meses."
  prazoAcesso: "",

  // Contato de suporte. Ex.: "suporte@seudominio.com.br"
  suporte: "",

  // Política de reembolso. Ex.: "Você pode pedir reembolso em até 7 dias
  // após a compra, pelo e-mail de suporte."
  reembolso: "",

  // Dados do vendedor exibidos no rodapé.
  vendedor: {
    nome: "", // razão social ou nome completo
    documento: "", // CNPJ ou CPF
    endereco: "", // opcional: se ficar vazio, não aparece
  },

  // FOTOS (Unsplash). Arquivo local em public/, baixado pelo link oficial
  // de download do Unsplash (download registrado). Crédito exibido sob a foto.
  fotos: {
    hero: {
      src: "/hero.jpg",
      alt: "Mulher com mochila azul olhando o celular à beira de um lago, durante uma viagem.",
      autor: "Peter Chirkov",
      autorUrl: "https://unsplash.com/@visualkamikaze",
      unsplashUrl: "https://unsplash.com/photos/8eFN_6BATAk",
    },
  },

  // Mude para true quando todas as aulas estiverem gravadas. Enquanto for
  // false, a página apresenta a lista de aulas e o checklist como
  // "conteúdo previsto".
  conteudoFinalizado: false,
};

/** Campos obrigatórios que ainda estão vazios (usado no aviso de rascunho). */
export function camposPendentes(c = config) {
  const itens = [
    ["Link do checkout", checkoutValido(c.checkoutUrl)],
    ["Forma e prazo de entrega", c.entrega],
    ["Prazo de acesso", c.prazoAcesso],
    ["Contato de suporte", c.suporte],
    ["Política de reembolso", c.reembolso],
    ["Nome do vendedor", c.vendedor.nome],
    ["CNPJ/CPF do vendedor", c.vendedor.documento],
  ];
  return itens.filter(([, valor]) => !valor).map(([rotulo]) => rotulo);
}

export function checkoutValido(url) {
  return typeof url === "string" && /^https:\/\/\S+$/.test(url.trim());
}
