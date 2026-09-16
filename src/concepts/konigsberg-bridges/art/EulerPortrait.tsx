/** A flat cartoon of Leonhard Euler in his famous turban-ish cap, in the site's illustration style. */
export default function EulerPortrait({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`illo ${className}`} role="img" aria-label="Cartoon of Leonhard Euler">
      <circle cx="100" cy="100" r="92" fill="#e4eef6" />
      {/* shoulders / coat */}
      <path d="M40 200v-30q0-30 30-34l30-4 30 4q30 4 30 34v30z" fill="#4b5a78" stroke="#2b2033" strokeWidth="5" />
      <path d="M86 136h28l-14 34z" fill="#fff" stroke="#2b2033" strokeWidth="4" />
      {/* neck */}
      <rect x="88" y="118" width="24" height="22" fill="#f6d6c2" stroke="#2b2033" strokeWidth="4" />
      {/* face */}
      <rect x="62" y="52" width="76" height="78" rx="34" fill="#f8dccb" stroke="#2b2033" strokeWidth="5" />
      {/* cap */}
      <path d="M58 70q6-40 42-42t42 42l-6 6q-36-14-72 0z" fill="#8a6f9e" stroke="#2b2033" strokeWidth="5" />
      <ellipse cx="100" cy="72" rx="42" ry="9" fill="#a68abb" stroke="#2b2033" strokeWidth="4" />
      {/* eyes: right eye squinting (Euler lost sight in it) */}
      <rect x="80" y="86" width="5" height="12" rx="2.5" fill="#2b2033" />
      <path d="M110 92q6-4 12 0" stroke="#2b2033" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* nose + mouth */}
      <path d="M100 96v10" stroke="#2b2033" strokeWidth="3" strokeLinecap="round" />
      <path d="M92 114q8 6 16 0" stroke="#2b2033" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* cheeks */}
      <circle cx="76" cy="106" r="5" fill="#f4b3a0" />
      <circle cx="124" cy="106" r="5" fill="#f4b3a0" />
      {/* quill */}
      <path d="M150 150l22-40" stroke="#2b2033" strokeWidth="4" strokeLinecap="round" />
      <path d="M172 110q10-16 4-30q-14 8-18 26z" fill="#fff" stroke="#2b2033" strokeWidth="4" />
    </svg>
  );
}
