const paths = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </>
  ),
  door: (
    <>
      <path d="M14 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4" />
      <path d="M4 12h10M10 8l4 4-4 4" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  play: <path d="M8 5.5v13l11-6.5z" />,
  pause: <path d="M8 5v14M16 5v14" />,
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18.5h2" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  shield: <path d="M12 3 5 6v5.5c0 4.2 2.9 7.6 7 9.5 4.1-1.9 7-5.3 7-9.500V6z" />,
  chat: <path d="M4 5h16v11H10l-4.5 4v-4H4z" />,
  bank: (
    <>
      <path d="M3 9.5 12 4l9 5.500zM5 10v7M9.5 10v7M14.5 10v7M19 10v7M3 20h18" />
    </>
  ),
  remote: (
    <>
      <path d="M5 12.500a10 10 0 0 1 14 0M8 15.500a5.5 5.5 0 0 1 8 0" />
      <circle cx="12" cy="19" r="1" />
      <path d="M2 9a14.5 14.5 0 0 1 20 0" />
    </>
  ),
  person: (
    <>
      <circle cx="9.5" cy="8" r="3.5" />
      <path d="M3 20c.5-3.5 3-5.5 6.5-5.5 2 0 3.7.7 4.9 1.900M15.5 18l2 2 4-4" />
    </>
  ),
  list: (
    <>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="m3.5 6 1 1 1.8-2M3.5 12l1 1 1.8-2M3.5 18l1 1 1.8-2" />
    </>
  ),
  printer: (
    <>
      <path d="M7 8V3.500h10V8M7 17H4.500v-7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7H17" />
      <rect x="7" y="14" width="10" height="6.5" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.500M12 7.500v.5" />
    </>
  ),
};

/** Ícones decorativos de traço simples. Sempre ocultos de leitores de tela. */
export default function Icon({ name, className = "h-6 w-6 shrink-0" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
