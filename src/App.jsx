import Icon from "./Icon.jsx";
import Vsl, { temVsl } from "./Vsl.jsx";
import { config, camposPendentes, checkoutValido } from "./config.js";

const checkoutPronto = checkoutValido(config.checkoutUrl);
const previsto = !config.conteudoFinalizado;
const { capturaVideo, checklist } = config.materiais;
const temMateriais = Boolean(capturaVideo.src || checklist.src);
const preco = `R$ ${config.preco.valor}`;
const condicao =
  config.preco.condicao[0].toUpperCase() + config.preco.condicao.slice(1);

// Pendências: só no console em desenvolvimento, nunca na página pública.
if (import.meta.env.DEV) {
  const p = camposPendentes();
  if (p.length) console.warn("[LP] Pendências em src/config.js:", p.join(", "));
}

function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

function Botao({ href, children, className = "" }) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-cta px-8 py-4 text-center text-base font-extrabold uppercase tracking-wide text-cta-ink transition-colors hover:bg-cta-hover sm:w-auto ${className}`}
    >
      {children}
    </a>
  );
}

function Titulo({ children, id }) {
  return (
    <h2
      id={id}
      className="text-balance text-[1.75rem] font-extrabold leading-tight tracking-tight text-navy-900 sm:text-4xl"
    >
      {children}
    </h2>
  );
}

function Check({ children }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1 text-green-700">
        <Icon name="check" className="h-5 w-5" />
      </span>
      {children}
    </li>
  );
}

/* 1. DOR + VSL */
function Hero() {
  return (
    <header className="bg-navy-900 text-white">
      <Container className="py-10 text-center sm:py-14">
        <h1 className="mx-auto max-w-3xl text-balance text-[2.05rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
          Se levarem seu celular, suas contas estarão protegidas?
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-navy-100 sm:text-xl">
          Aprenda, com um passo a passo em vídeo, a configurar as proteções do
          seu Android ou iPhone.
        </p>

        {temVsl() && (
          <div className="mx-auto mt-8 max-w-3xl">
            <Vsl />
          </div>
        )}

        <div className="mt-8">
          <Botao href="#oferta">Quero acessar o método</Botao>
          <p className="mt-3 text-base font-semibold text-navy-100">
            {preco} • {condicao}
          </p>
        </div>
      </Container>
    </header>
  );
}

/* 2. EXPECTATIVA */
const beneficios = [
  { icone: "bell", texto: "Reduza a exposição de mensagens e códigos nas notificações." },
  { icone: "shield", texto: "Configure as proteções disponíveis para suas contas." },
  { icone: "list", texto: "Prepare um plano para agir se o aparelho desaparecer." },
];

function Expectativa() {
  return (
    <section aria-labelledby="t-exp" className="py-12 sm:py-16">
      <Container>
        <Titulo id="t-exp">Prepare suas proteções antes de precisar delas.</Titulo>
        <ul className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {beneficios.map((b) => (
            <li key={b.texto} className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white">
                <Icon name={b.icone} />
              </span>
              <p className="pt-1.5 text-lg font-semibold leading-snug text-navy-900">
                {b.texto}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* 3. ENTREGA */
const entregaveis = [
  {
    icone: "play",
    titulo: "Passo a passo em vídeo",
    texto: "Veja onde tocar e configure junto no seu celular.",
  },
  {
    icone: "phone",
    titulo: "Orientações para Android e iPhone",
    texto: "Siga o caminho do seu sistema, conforme os recursos disponíveis no aparelho.",
  },
  {
    icone: "printer",
    titulo: "Checklist de emergência",
    texto: "Consulte os passos e canais necessários sem depender do celular perdido.",
  },
];

/** Composição só com materiais reais (config.materiais). */
function Materiais() {
  return (
    <div className="relative mx-auto flex w-full max-w-md items-end justify-center gap-4 sm:gap-6">
      {capturaVideo.src && (
        <div className="w-[48%] max-w-[13rem] shrink-0 rounded-[2rem] border-[6px] border-navy-900 bg-navy-900 shadow-xl">
          <img
            src={capturaVideo.src}
            alt={capturaVideo.alt}
            loading="lazy"
            className="aspect-[9/19] w-full rounded-[1.5rem] object-cover object-top"
          />
        </div>
      )}
      {checklist.src && (
        <img
          src={checklist.src}
          alt={checklist.alt}
          loading="lazy"
          className="w-[48%] max-w-[13rem] rounded-lg border border-navy-100 bg-white shadow-xl"
        />
      )}
    </div>
  );
}

function Entrega() {
  return (
    <section aria-labelledby="t-entrega" className="bg-navy-50 py-12 sm:py-16">
      <Container
        className={temMateriais ? "grid items-center gap-10 md:grid-cols-2" : ""}
      >
        <div>
          <Titulo id="t-entrega">O que você recebe no Método Celular Protegido</Titulo>
          <ul
            className={`mt-8 grid gap-6 ${temMateriais ? "" : "sm:grid-cols-3 sm:gap-8"}`}
          >
            {entregaveis.map((e) => (
              <li key={e.titulo} className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-navy-800 shadow-sm">
                  <Icon name={e.icone} />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold uppercase leading-snug tracking-wide text-navy-900">
                    {e.titulo}
                  </h3>
                  <p className="mt-1 text-lg text-muted">{e.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {temMateriais && <Materiais />}
      </Container>
    </section>
  );
}

/* 4. CONTEÚDO */
const temas = [
  { icone: "lock", texto: "Senha, biometria e privacidade das notificações" },
  { icone: "chat", texto: "Segurança do WhatsApp e do e-mail" },
  { icone: "remote", texto: "Proteções contra roubo e bloqueio remoto disponíveis no aparelho" },
  { icone: "list", texto: "Preparação e ações de emergência" },
];

function Conteudo() {
  return (
    <section aria-labelledby="t-conteudo" className="py-12 sm:py-16">
      <Container>
        <Titulo id="t-conteudo">O que o método ensina</Titulo>
        <ol className="mt-6 grid gap-x-10 sm:grid-cols-2">
          {temas.map((t) => (
            <li
              key={t.texto}
              className="flex items-center gap-4 border-b border-navy-100 py-4"
            >
              <span className="text-navy-700">
                <Icon name={t.icone} className="h-7 w-7 shrink-0" />
              </span>
              <span className="text-lg font-bold text-navy-900">{t.texto}</span>
            </li>
          ))}
        </ol>
        {previsto && (
          <p className="mt-4 text-sm text-muted">
            Conteúdo previsto: os temas podem ter ajustes até a versão final.
          </p>
        )}
      </Container>
    </section>
  );
}

/* 5. OFERTA */
function Oferta() {
  const detalhes = [
    ["Entrega", config.entrega],
    ["Acesso", config.prazoAcesso],
    ["Suporte", config.suporte],
    ["Reembolso", config.reembolso],
  ].filter(([, v]) => v);

  return (
    <section id="oferta" aria-labelledby="t-oferta" className="bg-navy-900 py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-lg rounded-3xl bg-white p-6 text-center shadow-2xl shadow-black/30 sm:p-10">
          <Titulo id="t-oferta">Acesse o Método Celular Protegido</Titulo>

          <p className="mt-6 text-navy-900">
            <span className="block text-6xl font-extrabold tracking-tight">{preco}</span>
            <span className="mt-1 block text-lg font-semibold text-muted">{condicao}</span>
          </p>

          <ul className="mx-auto mt-6 w-fit space-y-2 text-left text-lg font-medium">
            <Check>Passo a passo em vídeo</Check>
            <Check>Orientações para Android e iPhone</Check>
            <Check>Checklist de preparação e emergência</Check>
          </ul>

          <div className="mt-7">
            {checkoutPronto ? (
              <Botao href={config.checkoutUrl.trim()} className="sm:w-full">
                Quero acessar o método
              </Botao>
            ) : (
              // PENDENTE: configurar checkoutUrl em src/config.js
              <p className="rounded-xl bg-navy-50 px-4 py-4 text-base font-semibold text-navy-800">
                As inscrições ainda não foram abertas.
              </p>
            )}
          </div>

          {detalhes.length > 0 && (
            <dl className="mt-6 space-y-1 text-left text-base text-muted">
              {detalhes.map(([k, v]) => (
                <div key={k}>
                  <dt className="inline font-bold text-navy-900">{k}: </dt>
                  <dd className="inline">{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </Container>
    </section>
  );
}

/* 6. FAQ */
const perguntas = [
  {
    p: "Preciso entender de tecnologia?",
    r: "Não. O passo a passo em vídeo mostra a tela e onde tocar. Basta saber abrir as configurações e os aplicativos do seu celular.",
  },
  {
    p: "Serve para o meu celular?",
    r: "Há orientações para Android e para iPhone. Os recursos e menus variam conforme o aparelho e a versão do sistema, então alguns passos podem ser diferentes no seu.",
  },
  {
    p: "Como recebo o acesso?",
    // PENDENTE: confirmar forma e prazo em config.entrega
    r: config.entrega || "Você recebe as instruções de acesso depois da compra.",
  },
];

function Faq() {
  return (
    <section aria-labelledby="t-faq" className="py-12 sm:py-16">
      <Container>
        <Titulo id="t-faq">Perguntas frequentes</Titulo>
        <div className="mt-6 max-w-3xl divide-y divide-navy-100 border-y border-navy-100">
          {perguntas.map(({ p, r }) => (
            <details key={p} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-bold text-navy-900">
                {p}
                <span className="shrink-0 text-navy-700 transition-transform group-open:rotate-180 motion-reduce:transition-none">
                  <Icon name="chevron" className="h-5 w-5" />
                </span>
              </summary>
              <p className="pb-5 text-muted">{r}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Rodape() {
  const { nome, documento, endereco } = config.vendedor;
  const vendedor = [nome, documento, endereco].filter(Boolean).join(" • ");
  return (
    <footer className="bg-navy-950 py-8 text-sm text-navy-100">
      <Container className="space-y-2">
        <p className="font-bold text-white">{config.produto.nome}</p>
        {vendedor && <p>Vendido por {vendedor}</p>}
        {config.suporte && <p>Suporte: {config.suporte}</p>}
        <p>
          Método educativo em vídeo, independente, sem vínculo com Apple,
          Google, WhatsApp, bancos ou órgãos públicos. Não é aplicativo nem
          seguro.
        </p>
      </Container>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <Expectativa />
        <Entrega />
        <Conteudo />
        <Oferta />
        <Faq />
      </main>
      <Rodape />
    </>
  );
}
