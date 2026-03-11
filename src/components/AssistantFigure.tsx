type AssistantFigureProps = {
  active?: boolean;
  caption?: string;
  compact?: boolean;
};

export default function AssistantFigure({
  active = false,
  caption = "Ask me about Joshua",
  compact = false,
}: AssistantFigureProps) {
  return (
    <div
      className="assistant-presence"
      data-active={active}
      data-compact={compact}
      aria-hidden="true"
    >
      <div className="assistant-presence-bubble">
        <span className="assistant-presence-bubble-dot" />
        {caption}
      </div>

      <svg
        viewBox="0 0 320 280"
        className="assistant-presence-svg"
        fill="none"
        role="presentation"
      >
        <defs>
          <linearGradient id="assistant-card-skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe0c9" />
            <stop offset="100%" stopColor="#f4b993" />
          </linearGradient>
          <linearGradient id="assistant-card-jacket" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2a2d32" />
            <stop offset="100%" stopColor="#1a1d21" />
          </linearGradient>
          <linearGradient id="assistant-card-shirt" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e9edf3" />
          </linearGradient>
          <linearGradient id="assistant-card-tie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f25f4c" />
            <stop offset="100%" stopColor="#cb4738" />
          </linearGradient>
          <linearGradient id="assistant-card-laptop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fdfdfd" />
            <stop offset="100%" stopColor="#dfe4ea" />
          </linearGradient>
          <linearGradient id="assistant-card-screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fafbfd" />
            <stop offset="100%" stopColor="#eef2f6" />
          </linearGradient>
          <linearGradient id="assistant-card-hair" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22252a" />
            <stop offset="100%" stopColor="#0f1012" />
          </linearGradient>
          <linearGradient id="assistant-card-badge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5aa3ff" />
            <stop offset="100%" stopColor="#2d78d8" />
          </linearGradient>
        </defs>

        <ellipse className="assistant-character-shadow" cx="160" cy="254" rx="84" ry="16" />

        <g className="assistant-character-badge assistant-character-badge-left">
          <rect x="36" y="72" width="46" height="34" rx="12" fill="url(#assistant-card-badge)" />
          <path
            d="M48 89h22M58 81v16"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </g>

        <g className="assistant-character-badge assistant-character-badge-top">
          <rect x="74" y="28" width="58" height="38" rx="14" fill="url(#assistant-card-badge)" />
          <text
            x="103"
            y="52"
            fill="#ffffff"
            fontFamily="Arial, sans-serif"
            fontSize="16"
            fontWeight="700"
            textAnchor="middle"
          >
            JS
          </text>
        </g>

        <g className="assistant-character-badge assistant-character-badge-right">
          <rect x="242" y="44" width="48" height="36" rx="12" fill="url(#assistant-card-badge)" />
          <path
            d="m256 62 8-8m0 0 8 8m-8-8v16m-8-8h16"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.8"
          />
        </g>

        <g className="assistant-character-badge assistant-character-badge-small">
          <circle cx="58" cy="126" r="18" fill="url(#assistant-card-badge)" />
          <text
            x="58"
            y="132"
            fill="#ffffff"
            fontFamily="Arial, sans-serif"
            fontSize="12"
            fontWeight="700"
            textAnchor="middle"
          >
            AI
          </text>
        </g>

        <g className="assistant-character-figure">
          <path
            d="M118 140c9-11 24-17 42-17 18 0 33 6 42 17l20 54H98l20-54Z"
            fill="url(#assistant-card-jacket)"
          />
          <path
            d="M138 136h44l-9 50h-26l-9-50Z"
            fill="url(#assistant-card-shirt)"
          />
          <path
            d="M159 137h9l8 53h-25l8-53Z"
            fill="url(#assistant-card-tie)"
          />

          <rect
            className="assistant-character-laptop"
            x="74"
            y="168"
            width="144"
            height="62"
            rx="18"
            fill="url(#assistant-card-laptop)"
          />
          <rect
            className="assistant-character-screen"
            x="86"
            y="178"
            width="120"
            height="40"
            rx="12"
            fill="url(#assistant-card-screen)"
          />
          <circle cx="146" cy="198" r="4.5" fill="#c2c8d0" />

          <path
            d="M120 158c5-12 14-16 25-16h8c11 0 20 4 25 16l9 22h-76l9-22Z"
            fill="url(#assistant-card-jacket)"
          />
          <path
            d="M97 174c10-12 20-19 31-21l18 17-18 11-31-7Z"
            fill="url(#assistant-card-skin)"
          />
          <path
            d="M223 174c-10-12-20-19-31-21l-18 17 18 11 31-7Z"
            fill="url(#assistant-card-skin)"
          />

          <rect x="141" y="110" width="38" height="30" rx="15" fill="url(#assistant-card-skin)" />
          <ellipse cx="160" cy="86" rx="46" ry="50" fill="url(#assistant-card-skin)" />
          <path
            d="M117 83c0-34 23-52 50-52 19 0 35 9 44 25-6-3-13-4-22-4-22 0-34 13-41 31l-31 0Z"
            fill="url(#assistant-card-hair)"
          />
          <path
            d="M119 84c6-21 20-36 43-36 15 0 28 6 37 17-7 0-16 2-26 6-17 8-32 14-54 13Z"
            fill="url(#assistant-card-hair)"
          />
          <circle cx="114" cy="90" r="7" fill="url(#assistant-card-skin)" />
          <circle cx="206" cy="90" r="7" fill="url(#assistant-card-skin)" />

          <circle cx="145" cy="90" r="18" stroke="#4d4640" strokeWidth="4" fill="#ffffff" fillOpacity="0.16" />
          <circle cx="176" cy="90" r="18" stroke="#4d4640" strokeWidth="4" fill="#ffffff" fillOpacity="0.16" />
          <path d="M163 90h-5" stroke="#4d4640" strokeWidth="4" strokeLinecap="round" />
          <path d="M128 82h12M181 82h12" stroke="#4d4640" strokeLinecap="round" strokeWidth="3" />

          <ellipse className="assistant-character-eye" cx="145" cy="92" rx="3.5" ry="4.5" fill="#26282d" />
          <ellipse className="assistant-character-eye" cx="176" cy="92" rx="3.5" ry="4.5" fill="#26282d" />
          <path
            d="M152 112c4 4 13 4 17 0"
            stroke="#9b5744"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <path
            d="M154 95c0 6 1 9 6 9"
            stroke="#d58a68"
            strokeLinecap="round"
            strokeWidth="2.4"
          />
        </g>
      </svg>
    </div>
  );
}
