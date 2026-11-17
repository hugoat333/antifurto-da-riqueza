import Icon from "./Icon.jsx";
import { config, camposPendentes, checkoutValido } from "./config.js";

const checkoutPronto = checkoutValido(config.checkoutUrl);
const pendentes = camposPendentes();
const previsto = !config.conteudoFinalizado;
const precoTexto = `R$ ${config.preco.valor}`;

/* ---------- Peças reutilizáveis ---------- */

function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Botão de compra. Com checkout configurado, vai para o checkout.
 * Sem checkout, leva à seção da oferta (nunca fica sem função).
 */
function BotaoCompra({ children, className = "" }) {
  return (
    <a
      href={checkoutPronto ? config.checkoutUrl.trim() : "#oferta"}
      className={`inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-cta px-7 py-4 text-center text-lg font-bold text-cta-ink shadow-sm transition-colors hover:bg-cta-hover sm:w-auto ${className}`}
    >
      {children}
    </a>
  );
}

/** Mostra o valor configurado ou um marcador visível de campo pendente. */
function Campo({ valor, rotulo }) {
  if (valor) return <>{valor}</>;
  return (
    <span className="rounded border border-dashed border-amber-600 bg-amber-50 px-1.5 py-0.5 text-sm font-semibold text-amber-900">
      [PREENCHER: {rotulo}]
    </span>
  );
}

function Nota({ children, escuro = false }) {
  return (
    <p
      className={`flex gap-3 rounded-xl p-4 text-base ${
        escuro ? "bg-white/10 text-navy-100" : "bg-navy-50 text-ink"
      }`}
    >
      <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

function Titulo({ children, id, claro = false }) {
  return (
    <h2
      id={id}
      className={`text-balance text-[1.7rem] font-extrabold leading-tight tracking-tight sm:text-4xl ${
        claro ? "text-white" : "text-navy-900"
      }`}
    >
      {children}
    </h2>
  );
}

function Etiqueta({ children }) {
  return (
    <span className="inline-block rounded-full bg-navy-100 px-3 py-1 text-sm font-semibold text-navy-800">
      {children}
    </span>
  );
}

/* ---------- Aviso de rascunho (some quando a config estiver completa) ---------- */

function AvisoRascunho() {
  if (pendentes.length === 0 && !previsto) return null;
  return (
    <aside
      aria-label="Aviso para o responsável pela página"
      className="border-b-2 border-amber-600 bg-amber-100 px-5 py-3 text-sm text-amber-950"
    >
      <p className="mx-auto max-w-5xl">
        <strong>Rascunho — não publicar ainda.</strong>{" "}
        {pendentes.length > 0 && (
          <>Preencha em <code>src/config.js</code>: {pendentes.join(", ")}. </>
        )}
        {previsto && (
          <>
            A página está no modo “conteúdo previsto” (
            <code>conteudoFinalizado: false</code>).
          </>
        )}
      </p>
    </aside>
  );
}

/* ---------- 1. Primeira dobra ---------- */

function IlustracaoCelular() {
  const aulas = [
    "Bloqueio de tela",
    "Privacidade das notificações",
    "Verificação em duas etapas",
  ];
  return (
    <figure className="mx-auto w-full max-w-[17rem]">
      <div
        role="img"
        aria-label="Ilustração de um celular exibindo uma videoaula que mostra uma tela de configurações, com a lista de aulas logo abaixo."
        className="rounded-[2.4rem] border-[6px] border-navy-700 bg-white p-3 shadow-2xl shadow-black/40"
      >
        <div aria-hidden="true">
          <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-navy-100" />

          {/* Quadro do vídeo: tela de ajustes genérica + indicação de toque */}
          <div className="relative rounded-xl bg-navy-900 p-3">
            <div className="rounded-lg bg-white p-3">
              <div className="mb-3 h-2.5 w-20 rounded bg-navy-800" />
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-t border-navy-100 py-2.5"
                >
                  <div className="space-y-1.5">
                    <div className="h-2 w-24 rounded bg-navy-100" />
                    <div className="h-1.5 w-16 rounded bg-navy-50" />
                  </div>
                  <div
                    className={`relative h-4 w-7 rounded-full ${
                      i === 1 ? "bg-cta" : "bg-navy-100"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 h-3 w-3 rounded-full bg-white ${
                        i === 1 ? "right-0.5" : "left-0.5"
                      }`}
                    />
                    {i === 1 && (
                      <div className="absolute -inset-2.5 rounded-full border-2 border-amber-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-white">
              <Icon name="play" className="h-4 w-4 fill-current" />
              <div className="h-1 flex-1 rounded-full bg-white/25">
                <div className="h-1 w-2/5 rounded-full bg-cta" />
              </div>
            </div>
          </div>

          <p className="mt-3 text-[0.7rem] font-bold uppercase tracking-wide text-muted">
            Trilha Android · iPhone
          </p>
          <ul className="mt-1.5 space-y-1.5">
            {aulas.map((aula, i) => (
              <li
                key={aula}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[0.8rem] font-semibold ${
                  i === 1 ? "bg-navy-100 text-navy-900" : "text-muted"
                }`}
              >
                <Icon name="play" className="h-3.5 w-3.5 shrink-0" />
                {aula}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-navy-100">
        Imagem ilustrativa: representação do formato das aulas.
      </figcaption>
    </figure>
  );
}

function Hero() {
  return (
    <header className="bg-navy-900 text-white">
      <Container className="grid items-center gap-10 py-10 sm:py-16 md:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-green-300">
            Treinamento em vídeo • Android e iPhone
          </p>
          <h1 className="mt-4 text-[2.05rem] font-extrabold leading-[1.12] tracking-tight sm:text-5xl">
            Vai viajar? Antes de fazer as malas, configure as proteções do seu
            celular.
          </h1>
          <p className="mt-5 text-lg text-navy-100 sm:text-xl">
            Aprenda, com vídeos passo a passo, a proteger o acesso ao WhatsApp,
            e-mail e outras contas importantes — e prepare um plano para agir
            se o aparelho for perdido ou roubado.
          </p>
          <p className="mt-6 border-l-4 border-cta pl-4 text-xl font-bold">
            O prejuízo pode ir além do celular.
          </p>
          <div className="mt-8">
            <BotaoCompra>Quero preparar meu celular</BotaoCompra>
            <p className="mt-3 text-base text-navy-100">
              Aulas práticas para você assistir e configurar junto.
            </p>
          </div>
        </div>
        <IlustracaoCelular />
      </Container>
    </header>
  );
}

/* ---------- 2. Dor ---------- */

const dores = [
  {
    icone: "mail",
    titulo: "O e-mail abre outras portas",
    texto:
      "Muitos serviços mandam o link de “esqueci minha senha” para o seu e-mail. Quem entra nele pode tentar trocar a senha de outras contas.",
  },
  {
    icone: "bell",
    titulo: "A tela bloqueada pode mostrar demais",
    texto:
      "Dependendo da configuração, mensagens e códigos de confirmação aparecem nas notificações, mesmo com o aparelho bloqueado.",
  },
  {
    icone: "door",
    titulo: "Você também pode ficar do lado de fora",
    texto:
      "Sem o aparelho e sem o chip, receber códigos e entrar nas suas próprias contas fica mais difícil. Longe de casa, mais ainda.",
  },
  {
    icone: "compass",
    titulo: "Na hora, falta saber por onde começar",
    texto:
      "Ligar para quem? Bloquear o quê primeiro? Sem preparo, o tempo vai embora procurando informação.",
  },
];

function Dor() {
  return (
    <section id="risco" aria-labelledby="t-risco" className="py-14 sm:py-20">
      <Container>
        <Titulo id="t-risco">
          Seu banco, suas conversas e suas fotos estão no mesmo aparelho.
        </Titulo>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Praia, aeroporto, festa, passeio. Um aparelho novo se compra. O que
          dá trabalho é o que vem junto com ele.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {dores.map((d) => (
            <li
              key={d.titulo}
              className="rounded-2xl border border-navy-100 bg-white p-5"
            >
              <div className="flex items-center gap-3 text-navy-800">
                <Icon name={d.icone} />
                <h3 className="text-lg font-bold text-navy-900">{d.titulo}</h3>
              </div>
              <p className="mt-2 text-muted">{d.texto}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 max-w-3xl">
          <Nota>
            Isso não quer dizer que alguém vai conseguir acessar tudo. Depende
            de como o aparelho e as contas estão configurados — e é isso que dá
            para revisar antes de sair de casa.
          </Nota>
        </div>
      </Container>
    </section>
  );
}

/* ---------- 3. Expectativa ---------- */

const resultados = [
  "Revisa o bloqueio de tela: senha, biometria e tempo para bloquear.",
  "Reduz o que aparece nas notificações com a tela bloqueada.",
  "Configura as proteções que o seu aparelho oferece.",
  "Prepara alternativas para recuperar o acesso às suas contas.",
  "Fica sabendo onde recorrer para pedir bloqueios.",
];

function Expectativa() {
  return (
    <section
      id="resultado"
      aria-labelledby="t-resultado"
      className="bg-navy-50 py-14 sm:py-20"
    >
      <Container>
        <Titulo id="t-resultado">
          Saia de casa com as configurações revisadas e um plano preparado.
        </Titulo>
        <p className="mt-4 text-lg text-muted">
          Seguindo as aulas e aplicando no seu aparelho, você:
        </p>
        <ul className="mt-6 max-w-3xl space-y-3">
          {resultados.map((r) => (
            <li
              key={r}
              className="flex gap-3 rounded-xl bg-white p-4 text-lg font-medium text-ink"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
                <Icon name="check" className="h-4 w-4" />
              </span>
              {r}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-base text-muted">
          <strong className="text-ink">O resultado depende de você.</strong>{" "}
          Assistir sem configurar não muda nada no seu celular. E nenhuma
          configuração elimina o risco: ela reduz.
        </p>
      </Container>
    </section>
  );
}

/* ---------- 4. Solução ---------- */

const passos = [
  {
    icone: "play",
    titulo: "Assista",
    texto: "A aula mostra a tela do celular e onde tocar.",
  },
  {
    icone: "pause",
    titulo: "Pause",
    texto: "Pare o vídeo quando quiser. Não precisa decorar nada.",
  },
  {
    icone: "phone",
    titulo: "Repita no seu celular",
    texto: "Faça a mesma configuração no seu aparelho e siga para a próxima.",
  },
];

function Solucao() {
  return (
    <section id="como-funciona" aria-labelledby="t-como" className="py-14 sm:py-20">
      <Container>
        <Titulo id="t-como">Você assiste, pausa e repete no seu celular.</Titulo>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          O {config.produto.nome} é um treinamento em vídeos curtos, em
          português. Não tem teoria longa: é demonstração na tela.
        </p>

        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {passos.map((p, i) => (
            <li key={p.titulo} className="rounded-2xl border border-navy-100 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-white">
                  <Icon name={p.icone} className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-navy-900">
                  <span className="sr-only">Passo {i + 1}: </span>
                  {p.titulo}
                </h3>
              </div>
              <p className="mt-3 text-muted">{p.texto}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-2xl bg-navy-900 p-6 text-white sm:p-8">
          <h3 className="text-2xl font-extrabold">
            Escolha sua trilha: Android ou iPhone.
          </h3>
          <p className="mt-2 text-navy-100">
            Cada sistema tem as suas aulas. Você segue só a do seu aparelho.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {["Trilha Android", "Trilha iPhone"].map((t) => (
              <li
                key={t}
                className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-4 text-lg font-bold"
              >
                <Icon name="phone" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <Nota escuro>
              Os menus mudam conforme o modelo, a versão do sistema e a versão
              de cada aplicativo. O caminho na sua tela pode ser um pouco
              diferente do mostrado na aula, e alguns recursos podem não
              existir no seu aparelho.
            </Nota>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-base text-muted">
          É um treinamento educativo. Não é aplicativo, seguro nem serviço de
          monitoramento, e ninguém bloqueia o aparelho por você: as
          configurações são feitas por você, no seu celular.
        </p>
      </Container>
    </section>
  );
}

/* ---------- 5. Conteúdo ---------- */

const modulos = [
  {
    icone: "lock",
    titulo: "Senha, biometria e bloqueio de tela",
    texto: "A primeira barreira do aparelho, revisada ponto a ponto.",
  },
  {
    icone: "bell",
    titulo: "Privacidade das notificações",
    texto: "O que pode ou não aparecer com a tela bloqueada.",
  },
  {
    icone: "shield",
    titulo: "Recursos de proteção contra roubo do sistema",
    texto: "Onde ficam e como ativar os que existirem no seu aparelho.",
  },
  {
    icone: "chat",
    titulo: "Bloqueio e verificação em duas etapas do WhatsApp",
    texto: "Uma camada a mais para abrir e para reinstalar o aplicativo.",
  },
  {
    icone: "mail",
    titulo: "Segurança e recuperação do e-mail principal",
    texto: "A conta que serve de chave para recuperar as outras.",
  },
  {
    icone: "bank",
    titulo: "Opções de segurança e limites dos aplicativos bancários",
    texto:
      "O que procurar no aplicativo do seu banco. As opções variam de banco para banco.",
  },
  {
    icone: "remote",
    titulo: "Preparação para bloqueio remoto",
    texto: "Deixar pronto o recurso de localizar e bloquear à distância.",
  },
  {
    icone: "person",
    titulo: "Cadastro no Celular Seguro e pessoa de confiança",
    texto:
      "Como se cadastrar no serviço do governo federal e indicar alguém para ajudar.",
  },
  {
    icone: "list",
    titulo: "O que fazer após perda, furto ou roubo",
    texto: "A ordem dos passos e os canais oficiais a procurar.",
  },
];

function Conteudo() {
  return (
    <section
      id="conteudo"
      aria-labelledby="t-conteudo"
      className="bg-navy-50 py-14 sm:py-20"
    >
      <Container>
        {previsto && <Etiqueta>Conteúdo previsto</Etiqueta>}
        <div className="mt-3">
          <Titulo id="t-conteudo">O que as aulas mostram</Titulo>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modulos.map((m) => (
            <li key={m.titulo} className="rounded-2xl bg-white p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-100 text-navy-800">
                <Icon name={m.icone} />
              </span>
              <h3 className="mt-4 text-lg font-bold leading-snug text-navy-900">
                {m.titulo}
              </h3>
              <p className="mt-2 text-base text-muted">{m.texto}</p>
            </li>
          ))}
        </ul>
        {previsto && (
          <p className="mt-6 max-w-3xl text-base text-muted">
            As aulas estão em produção. Esta é a lista de temas previstos e
            pode ter ajustes até a versão final.
          </p>
        )}
      </Container>
    </section>
  );
}

/* ---------- 6. Diferencial ---------- */

function Diferencial() {
  return (
    <section id="diferencial" aria-labelledby="t-dif" className="py-14 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <Titulo id="t-dif">“Essas informações existem gratuitamente?”</Titulo>
          <p className="mt-5 text-xl font-semibold text-navy-900">
            Sim. Os recursos são oferecidos pelos próprios sistemas e serviços.
          </p>
          <p className="mt-3 text-lg text-muted">
            O treinamento organiza as orientações em uma sequência prática, com
            demonstrações em vídeo para facilitar a configuração.
          </p>
          <ul className="mt-6 space-y-3 text-lg">
            {[
              "Em vez de procurar tema por tema, você segue uma ordem única.",
              "Em vez de ler instruções, você vê a tela e onde tocar.",
              "Em vez de descobrir na hora do aperto, você deixa pronto antes.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1 text-green-700">
                  <Icon name="check" className="h-5 w-5" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base text-muted">
            Não há método secreto nem tecnologia própria. É um treinamento
            independente, sem vínculo com Apple, Google, WhatsApp, bancos ou
            governo.
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ---------- 7. Checklist ---------- */

function Checklist() {
  return (
    <section
      id="checklist"
      aria-labelledby="t-checklist"
      className="bg-navy-900 py-14 text-white sm:py-20"
    >
      <Container className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          {previsto && (
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
              Complemento previsto
            </span>
          )}
          <div className="mt-3">
            <Titulo id="t-checklist" claro>
              Um checklist de emergência que não fica dentro do celular.
            </Titulo>
          </div>
          <p className="mt-4 text-lg text-navy-100">
            Se o aparelho sumir, as anotações que estavam nele somem junto. O
            checklist é para imprimir ou guardar em outro lugar, com:
          </p>
          <ul className="mt-5 space-y-2 text-lg">
            {[
              "Os passos a seguir, em ordem.",
              "Os canais oficiais que você pode precisar: banco, operadora, fabricante e autoridades.",
              "Espaço para os telefones e contatos dos seus próprios serviços.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1 text-green-300">
                  <Icon name="check" className="h-5 w-5" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Nota escuro>
              O checklist não é lugar para senhas nem códigos de recuperação.
              Ele guarda o caminho e os contatos, não as chaves.
            </Nota>
          </div>
        </div>

        {/* Ilustração decorativa de uma folha impressa */}
        <div
          aria-hidden="true"
          className="mx-auto w-full max-w-60 rotate-2 rounded-lg bg-white p-5 text-navy-900 shadow-xl"
        >
          <div className="flex items-center gap-2 text-sm font-bold">
            <Icon name="printer" className="h-4 w-4" />
            Checklist de emergência
          </div>
          {[70, 85, 60, 78, 66].map((w, i) => (
            <div key={i} className="mt-4 flex items-center gap-3">
              <div className="h-4 w-4 shrink-0 rounded border-2 border-navy-700" />
              <div
                className="h-2 rounded bg-navy-100"
                style={{ width: `${w}%` }}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- 8. Oferta ---------- */

function Preco({ claro = false }) {
  return (
    <p className={claro ? "text-white" : "text-navy-900"}>
      <span className="text-5xl font-extrabold tracking-tight sm:text-6xl">
        {precoTexto}
      </span>
      <span
        className={`mt-1 block text-lg font-semibold ${
          claro ? "text-navy-100" : "text-muted"
        }`}
      >
        {config.preco.condicao}
      </span>
    </p>
  );
}

function Oferta() {
  const inclui = [
    "Treinamento em vídeo",
    "Trilhas para Android e iPhone",
    "Checklist de preparação e emergência",
  ];
  const detalhes = [
    ["Entrega", config.entrega, "forma e prazo de entrega"],
    ["Acesso", config.prazoAcesso, "prazo de acesso"],
    ["Suporte", config.suporte, "contato de suporte"],
    ["Reembolso", config.reembolso, "política de reembolso"],
  ];
  return (
    <section id="oferta" aria-labelledby="t-oferta" className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-xl rounded-3xl border-2 border-navy-900 p-6 sm:p-10">
          <Titulo id="t-oferta">
            {config.produto.nome} — {config.produto.complemento}
          </Titulo>
          <ul className="mt-6 space-y-3 text-lg font-medium">
            {inclui.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1 text-green-700">
                  <Icon name="check" className="h-5 w-5" />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Preco />
          </div>

          <div className="mt-6">
            {checkoutPronto ? (
              <BotaoCompra className="sm:w-full">
                Quero acessar o passo a passo
              </BotaoCompra>
            ) : (
              <p className="rounded-xl border-2 border-dashed border-amber-600 bg-amber-50 p-4 text-base font-semibold text-amber-900">
                [PREENCHER: link do checkout em src/config.js] — o botão “Quero
                acessar o passo a passo” aparece aqui quando o link for
                configurado.
              </p>
            )}
          </div>

          <dl className="mt-8 space-y-3 border-t border-navy-100 pt-6 text-base">
            {detalhes.map(([rotulo, valor, pendente]) => (
              <div key={rotulo} className="sm:flex sm:gap-3">
                <dt className="w-28 shrink-0 font-bold text-navy-900">
                  {rotulo}
                </dt>
                <dd className="text-muted">
                  <Campo valor={valor} rotulo={pendente} />
                </dd>
              </div>
            ))}
          </dl>

          {previsto && (
            <p className="mt-6 text-sm text-muted">
              As aulas e o checklist estão em produção. Confira acima a forma e
              o prazo de entrega antes de comprar.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

/* ---------- 9. FAQ ---------- */

const perguntas = [
  {
    p: "Serve para Android e iPhone?",
    r: (
      <>
        Sim. Há uma trilha para cada sistema, e você segue a do seu aparelho.
        Os menus podem mudar conforme o modelo e a versão do sistema.
      </>
    ),
  },
  {
    p: "Preciso entender de tecnologia?",
    r: (
      <>
        Não. As aulas mostram a tela e onde tocar. Basta saber abrir as
        configurações e os aplicativos do seu celular, e ter as senhas das
        suas contas à mão.
      </>
    ),
  },
  {
    p: "O treinamento impede o roubo?",
    r: (
      <>
        Não. Nenhum treinamento impede perda, furto ou roubo. O foco é
        preparação e redução de riscos: dificultar o acesso indevido e deixar
        você sabendo o que fazer. Não há garantia de recuperar o aparelho, de
        impedir acesso às contas nem de evitar prejuízo.
      </>
    ),
  },
  {
    p: "Isso é um aplicativo ou seguro?",
    r: (
      <>
        Nenhum dos dois. É um treinamento educativo em vídeo. Não monitora,
        não rastreia e não bloqueia o aparelho por você.
      </>
    ),
  },
  {
    p: "As configurações são iguais em todos os aparelhos?",
    r: (
      <>
        Não. Elas variam conforme a marca, o modelo, a versão do sistema e a
        versão de cada aplicativo. Alguns recursos podem ter outro nome, estar
        em outro menu ou não existir no seu aparelho. Nos bancos, cada
        aplicativo tem as próprias opções.
      </>
    ),
  },
  {
    p: "Vou precisar instalar alguma ferramenta?",
    r: (
      <>
        O treinamento usa recursos do próprio sistema e dos aplicativos que
        você já tem. Ele não vende nem exige ferramenta paga. O Celular Seguro
        é um serviço gratuito do governo federal; se você ainda não usa, a
        aula mostra como fazer o cadastro.
      </>
    ),
  },
  {
    p: "E se o meu celular já tiver sido roubado?",
    r: (
      <>
        Não espere pelas aulas. Procure agora os canais oficiais do
        fabricante, da operadora e dos seus bancos, e as autoridades, conforme
        a situação. O treinamento é de preparação: ele ajuda a configurar o
        próximo aparelho e as contas daqui para frente.
      </>
    ),
  },
  {
    p: "Como recebo o acesso?",
    r: <Campo valor={config.entrega} rotulo="forma e prazo de entrega" />,
  },
];

function Faq() {
  return (
    <section id="duvidas" aria-labelledby="t-faq" className="bg-navy-50 py-14 sm:py-20">
      <Container>
        <Titulo id="t-faq">Perguntas frequentes</Titulo>
        <div className="mt-8 max-w-3xl space-y-3">
          {perguntas.map(({ p, r }) => (
            <details key={p} className="group rounded-2xl bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-lg font-bold text-navy-900">
                {p}
                <span className="shrink-0 text-navy-700 transition-transform group-open:rotate-180 motion-reduce:transition-none">
                  <Icon name="chevron" className="h-5 w-5" />
                </span>
              </summary>
              <p className="px-5 pb-5 text-muted">{r}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-base text-muted">
          O treinamento prioriza preparação e redução de riscos. Em caso de
          ocorrência, siga os canais oficiais do fabricante, da operadora, dos
          bancos e das autoridades, conforme a situação.
        </p>
      </Container>
    </section>
  );
}

/* ---------- 10. Fechamento + rodapé ---------- */

function Fechamento() {
  return (
    <section
      aria-labelledby="t-fim"
      className="bg-navy-900 py-14 text-center text-white sm:py-20"
    >
      <Container>
        <h2
          id="t-fim"
          className="mx-auto max-w-2xl text-balance text-[1.7rem] font-extrabold leading-tight sm:text-4xl"
        >
          Antes de sair para viajar, reserve um momento para preparar seu
          celular.
        </h2>
        <div className="mt-8">
          <Preco claro />
        </div>
        <div className="mt-6">
          <BotaoCompra>Quero acessar o passo a passo</BotaoCompra>
        </div>
        <p className="mt-4 text-base text-navy-100">
          Treinamento em vídeo • Android e iPhone • Checklist de emergência
        </p>
      </Container>
    </section>
  );
}

function Rodape() {
  const { nome, documento, endereco } = config.vendedor;
  return (
    <footer className="bg-navy-950 py-10 text-sm text-navy-100">
      <Container className="space-y-3">
        <p className="font-bold text-white">
          {config.produto.nome} — {config.produto.complemento}
        </p>
        <p>
          Vendido por <Campo valor={nome} rotulo="nome do vendedor" /> •{" "}
          <Campo valor={documento} rotulo="CNPJ/CPF" />
          {endereco && <> • {endereco}</>}
        </p>
        <p>
          Suporte: <Campo valor={config.suporte} rotulo="contato de suporte" />
        </p>
        <p>
          Treinamento educativo e independente. Não é aplicativo, seguro nem
          serviço de monitoramento. Não garante a recuperação do aparelho nem
          impede acessos indevidos ou prejuízos. Sem vínculo com Apple, Google,
          WhatsApp, instituições financeiras ou órgãos públicos. Android,
          iPhone, WhatsApp e demais marcas citadas pertencem aos respectivos
          titulares.
        </p>
      </Container>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <AvisoRascunho />
      <Hero />
      <main>
        <Dor />
        <Expectativa />
        <Solucao />
        <Conteudo />
        <Diferencial />
        <Checklist />
        <Oferta />
        <Faq />
        <Fechamento />
      </main>
      <Rodape />
    </>
  );
}
