import Icon from "./Icon.jsx";
import { config, camposPendentes, checkoutValido } from "./config.js";

const checkoutPronto = checkoutValido(config.checkoutUrl);
const previsto = !config.conteudoFinalizado;
const hero = config.fotos?.hero;
const temFoto = Boolean(hero?.src);

// Pendências comerciais: só aparecem no console durante o desenvolvimento.
// A página pública nunca mostra avisos administrativos.
if (import.meta.env.DEV) {
  const p = camposPendentes();
  if (p.length) console.warn("[LP] Pendências em src/config.js:", p.join(", "));
  if (!temFoto) console.warn("[LP] Foto principal pendente (config.fotos.hero).");
}

function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Sem checkout configurado, o botão leva à seção da oferta. */
function BotaoCompra({ children, className = "" }) {
  return (
    <a
      href={checkoutPronto ? config.checkoutUrl.trim() : "#oferta"}
      className={`inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-cta px-7 py-4 text-center text-base font-extrabold uppercase tracking-wide text-cta-ink transition-colors hover:bg-cta-hover sm:w-auto ${className}`}
    >
      {children}
    </a>
  );
}

function Titulo({ children, id, claro = false }) {
  return (
    <h2
      id={id}
      className={`text-balance text-[1.75rem] font-extrabold leading-tight tracking-tight sm:text-4xl ${
        claro ? "text-white" : "text-navy-900"
      }`}
    >
      {children}
    </h2>
  );
}

/* 1. DOR */
function Hero() {
  return (
    <header className="bg-navy-900 text-white">
      <Container
        className={`grid gap-8 py-10 sm:py-16 ${
          temFoto ? "md:grid-cols-2 md:items-center md:gap-12" : ""
        }`}
      >
        <div className={temFoto ? "" : "max-w-3xl"}>
          <h1 className="text-balance text-[2.1rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
            Levaram seu celular. E se conseguirem acessar suas contas?
          </h1>
          <p className="mt-5 text-lg text-navy-100 sm:text-xl">
            Antes de viajar, aprenda a configurar proteções para reduzir o
            risco de acesso ao seu WhatsApp, e-mail e aplicativos importantes.
          </p>
          <div className="mt-7">
            <BotaoCompra>Quero preparar meu celular</BotaoCompra>
          </div>
        </div>

        {temFoto && (
          <figure className="md:order-last">
            <img
              src={hero.src}
              alt={hero.alt}
              width="1600"
              height="1200"
              fetchPriority="high"
              className="aspect-[4/3] w-full rounded-2xl object-cover md:aspect-[4/5]"
            />
            {hero.autor && (
              <figcaption className="mt-2 text-xs text-navy-100">
                Foto de{" "}
                <a className="underline" href={hero.autorUrl}>
                  {hero.autor}
                </a>{" "}
                no{" "}
                <a className="underline" href={hero.unsplashUrl}>
                  Unsplash
                </a>
              </figcaption>
            )}
          </figure>
        )}
      </Container>
    </header>
  );
}

/* 2. EXPECTATIVA */
const beneficios = [
  { icone: "shield", texto: "Mais proteção para suas contas." },
  { icone: "bell", texto: "Menos informações expostas na tela bloqueada." },
  { icone: "list", texto: "Passos definidos se o aparelho desaparecer." },
];

function Expectativa() {
  return (
    <section aria-labelledby="t-exp" className="py-14 sm:py-20">
      <Container>
        <Titulo id="t-exp">
          Viaje com as proteções configuradas e um plano para agir.
        </Titulo>
        <ul className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {beneficios.map((b) => (
            <li key={b.texto} className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white">
                <Icon name={b.icone} />
              </span>
              <p className="pt-2.5 text-lg font-semibold leading-snug text-navy-900">
                {b.texto}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* 3. SOLUÇÃO */
const itens = [
  { icone: "lock", texto: "Senha, biometria e notificações" },
  { icone: "chat", texto: "WhatsApp e e-mail" },
  { icone: "remote", texto: "Proteções contra roubo e bloqueio remoto" },
  { icone: "list", texto: "Preparação e ações de emergência" },
];

function Solucao() {
  return (
    <section aria-labelledby="t-sol" className="bg-navy-50 py-14 sm:py-20">
      <Container>
        <Titulo id="t-sol">Assista. Pause. Configure no seu celular.</Titulo>
        <p className="mt-3 text-lg text-muted">
          Vídeos mostrando onde tocar, com trilhas para Android e iPhone.
        </p>

        <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {itens.map((i) => (
            <li
              key={i.texto}
              className="flex items-center gap-4 border-b border-navy-100 pb-5"
            >
              <span className="text-navy-700">
                <Icon name={i.icone} className="h-7 w-7 shrink-0" />
              </span>
              <span className="text-lg font-bold text-navy-900">{i.texto}</span>
            </li>
          ))}
        </ul>
        {previsto && (
          <p className="mt-4 text-sm text-muted">
            Conteúdo previsto: os temas podem ter ajustes até a versão final.
          </p>
        )}

        {/* Faixa compacta do checklist */}
        <div className="mt-10 flex flex-col gap-3 rounded-2xl bg-navy-900 p-5 text-white sm:flex-row sm:items-center sm:gap-5 sm:p-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
            <Icon name="printer" />
          </span>
          <p className="text-base sm:text-lg">
            <strong>Checklist de emergência</strong> para imprimir ou guardar
            fora do celular, com os passos e os canais oficiais. Sem senhas.
          </p>
        </div>
      </Container>
    </section>
  );
}

/* 4. PROPOSTA */
function Oferta() {
  const inclui = [
    "Aulas em vídeo",
    "Trilhas para Android e iPhone",
    "Checklist de preparação e emergência",
  ];
  const detalhes = [
    ["Entrega", config.entrega],
    ["Acesso", config.prazoAcesso],
    ["Suporte", config.suporte],
    ["Reembolso", config.reembolso],
  ].filter(([, v]) => v);

  return (
    <section id="oferta" aria-labelledby="t-oferta" className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Titulo id="t-oferta">Prepare seu celular antes da próxima viagem.</Titulo>

          <p className="mt-8 text-navy-900">
            <span className="block text-6xl font-extrabold tracking-tight">
              R$ {config.preco.valor}
            </span>
            <span className="mt-1 block text-lg font-semibold text-muted">
              {config.preco.condicao[0].toUpperCase() + config.preco.condicao.slice(1)}
            </span>
          </p>

          <ul className="mx-auto mt-6 w-fit space-y-2 text-left text-lg font-medium">
            {inclui.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1 text-green-700">
                  <Icon name="check" className="h-5 w-5" />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            {checkoutPronto ? (
              <BotaoCompra className="sm:w-full">Quero acessar as aulas</BotaoCompra>
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

          <p className="mt-6 text-sm text-muted">
            Os recursos variam conforme o aparelho e a versão do sistema. O
            treinamento ensina configurações para reduzir riscos; não impede
            roubos nem garante proteção total.
          </p>
        </div>
      </Container>
    </section>
  );
}

/* 5. FAQ */
const perguntas = [
  {
    p: "Preciso entender de tecnologia?",
    r: "Não. As aulas mostram a tela e onde tocar. Você só precisa saber abrir as configurações e os aplicativos do seu celular.",
  },
  {
    p: "Serve para o meu celular?",
    r: "Há uma trilha para Android e outra para iPhone. Os menus variam conforme o modelo e a versão do sistema, então alguns passos podem ficar um pouco diferentes no seu aparelho.",
  },
  {
    p: "Isso impede o roubo do aparelho?",
    r: "Não. O treinamento ensina configurações para reduzir riscos e preparar você para agir. Ele não impede roubos nem garante proteção total ou recuperação do aparelho.",
  },
  {
    p: "Como recebo o acesso?",
    // PENDENTE: confirmar forma e prazo em config.entrega
    r: config.entrega || "Você recebe as instruções de acesso depois da compra.",
  },
];

function Faq() {
  return (
    <section aria-labelledby="t-faq" className="bg-navy-50 py-14 sm:py-20">
      <Container>
        <Titulo id="t-faq">Perguntas frequentes</Titulo>
        <div className="mt-8 max-w-3xl divide-y divide-navy-100 border-y border-navy-100">
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
        <p className="font-bold text-white">
          {config.produto.nome} — {config.produto.complemento}
        </p>
        {vendedor && <p>Vendido por {vendedor}</p>}
        {config.suporte && <p>Suporte: {config.suporte}</p>}
        <p>
          Treinamento educativo e independente, sem vínculo com Apple, Google,
          WhatsApp, bancos ou órgãos públicos.
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
        <Solucao />
        <Oferta />
        <Faq />
      </main>
      <Rodape />
    </>
  );
}
