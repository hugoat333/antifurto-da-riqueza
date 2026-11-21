import { useState } from "react";
import Icon from "./Icon.jsx";
import { config } from "./config.js";

/**
 * Player da VSL. Só renderiza quando existe um vídeo real em config.vsl.
 * - arquivo (.mp4): <video> nativo, sem autoplay, carrega só a capa.
 * - embedUrl: mostra a capa e só carrega o player externo após o clique.
 */
export function temVsl() {
  return Boolean(config.vsl.arquivo || config.vsl.embedUrl);
}

export default function Vsl() {
  const { arquivo, embedUrl, capa, titulo } = config.vsl;
  const [ativo, setAtivo] = useState(false);
  const moldura = "aspect-video w-full overflow-hidden rounded-2xl bg-navy-950 shadow-2xl shadow-black/40";

  if (arquivo) {
    return (
      <video
        className={moldura}
        src={arquivo}
        poster={capa || undefined}
        controls
        preload={capa ? "none" : "metadata"}
        playsInline
        aria-label={titulo}
      />
    );
  }

  if (!embedUrl) return null;

  if (ativo || !capa) {
    const sep = embedUrl.includes("?") ? "&" : "?";
    return (
      <div className={moldura}>
        <iframe
          className="h-full w-full"
          src={ativo ? `${embedUrl}${sep}autoplay=1` : embedUrl}
          title={titulo}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setAtivo(true)}
      className={`group relative block ${moldura}`}
      aria-label={`Assistir: ${titulo}`}
    >
      <img src={capa} alt="" className="h-full w-full object-cover" />
      <span className="absolute inset-0 flex items-center justify-center bg-navy-950/25">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cta text-cta-ink shadow-lg transition-transform group-hover:scale-105 motion-reduce:transition-none">
          <Icon name="play" className="ml-1 h-9 w-9 fill-current" />
        </span>
      </span>
    </button>
  );
}
