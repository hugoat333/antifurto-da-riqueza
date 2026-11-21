/**
 * CONFIGURAÇÃO COMERCIAL — edite somente este arquivo antes de publicar.
 *
 * Campo vazio ("") não aparece na página. As pendências são listadas só no
 * console do navegador, em modo de desenvolvimento (npm run dev).
 *
 * Só escreva aqui o que estiver confirmado (prazo, suporte, reembolso etc.).
 */
export const config = {
  produto: {
    nome: "Método Celular Protegido",
  },

  preco: {
    valor: "19,90", // sem "R$"
    condicao: "pagamento único",
  },

  // Link do checkout. Precisa começar com https://
  // Enquanto estiver vazio, o botão de compra da oferta não é exibido.
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

  // Imagem ao lado da headline (fornecida pelo responsável). Arquivo em public/.
  // autor/autorUrl/unsplashUrl: preencha só se a imagem exigir crédito.
  fotoTopo: {
    src: "/celulares-topo.webp",
    alt: "Um celular Android e um iPhone lado a lado sobre uma mesa de madeira.",
    largura: 1448,
    altura: 1086,
    autor: "",
    autorUrl: "",
    unsplashUrl: "",
  },

  // VSL (vídeo de vendas). PENDENTE: ainda não existe.
  // Preencha UMA das opções. Sem nenhuma, o player não aparece.
  //   arquivo: vídeo próprio .mp4 em public/ (ex.: "/vsl.mp4") ou URL https
  //   embedUrl: link de incorporação (ex.: "https://www.youtube-nocookie.com/embed/ID"
  //             ou "https://player.vimeo.com/video/ID")
  //   capa: imagem de capa em public/ (ex.: "/vsl-capa.jpg"). Recomendado:
  //         com embedUrl, o player externo só carrega depois do clique.
  vsl: {
    arquivo: "",
    embedUrl: "",
    capa: "",
    titulo: "Vídeo de apresentação do Método Celular Protegido",
  },

  // MATERIAIS REAIS DO MÉTODO (seção "O que você recebe"). PENDENTE.
  // Use apenas arquivos reais em public/. Sem eles, a seção mostra só os textos.
  //   capturaVideo: captura de tela vertical de um vídeo do método
  //   checklist: imagem da primeira página do checklist de emergência
  materiais: {
    capturaVideo: { src: "", alt: "" },
    checklist: { src: "", alt: "" },
  },

  // Mude para true quando os vídeos e o checklist estiverem prontos. Enquanto
  // for false, a lista de temas aparece como "conteúdo previsto".
  conteudoFinalizado: false,
};

/** Campos obrigatórios que ainda estão vazios (listados no console em desenvolvimento). */
export function camposPendentes(c = config) {
  const itens = [
    ["Link do checkout", checkoutValido(c.checkoutUrl)],
    ["Forma e prazo de entrega", c.entrega],
    ["Prazo de acesso", c.prazoAcesso],
    ["Contato de suporte", c.suporte],
    ["Política de reembolso", c.reembolso],
    ["Nome do vendedor", c.vendedor.nome],
    ["CNPJ/CPF do vendedor", c.vendedor.documento],
    ["VSL", c.vsl.arquivo || c.vsl.embedUrl],
    ["Captura de um vídeo do método", c.materiais.capturaVideo.src],
    ["Imagem do checklist", c.materiais.checklist.src],
  ];
  return itens.filter(([, valor]) => !valor).map(([rotulo]) => rotulo);
}

export function checkoutValido(url) {
  return typeof url === "string" && /^https:\/\/\S+$/.test(url.trim());
}
