type JoshAssistantAvatarProps = {
  className?: string;
};

export default function JoshAssistantAvatar({
  className = "",
}: JoshAssistantAvatarProps) {
  return (
    <span className={`josh-assistant-avatar ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 64 64" fill="none" role="presentation">
        <circle cx="32" cy="32" r="31" fill="#f5f5f3" stroke="rgba(24,26,29,0.08)" />
        <ellipse cx="32" cy="52" rx="15" ry="8" fill="#22262c" />
        <path
          d="M18 52c1.2-8.8 7.3-14 14-14s12.8 5.2 14 14"
          fill="url(#avatar-jacket)"
        />
        <path
          d="M26.6 40.2 32 47l5.4-6.8"
          fill="#f8fafc"
        />
        <path
          d="M29.8 40.4h4.4l-2.2 7.6-2.2-7.6Z"
          fill="#eb5b49"
        />
        <ellipse cx="32" cy="25.5" rx="11.8" ry="12.5" fill="url(#avatar-skin)" />
        <path
          d="M20.8 24.8c0-8.5 5.2-14.8 13.1-14.8 5.1 0 8.7 1.8 11.6 5.9 1.1 1.6 1.7 3.8 1.7 6.5-2.3-2-4.8-3-7.5-3.2-2.2-.2-4.1-.7-5.8-1.7-3.3 2.8-7.7 4.9-13.1 6.2v1.1Z"
          fill="url(#avatar-hair)"
        />
        <circle cx="27.5" cy="25.8" r="4.7" stroke="#2b3138" strokeWidth="1.6" />
        <circle cx="36.5" cy="25.8" r="4.7" stroke="#2b3138" strokeWidth="1.6" />
        <path d="M32.2 25.8h-.4" stroke="#2b3138" strokeLinecap="round" strokeWidth="1.6" />
        <circle cx="27.5" cy="25.8" r="0.9" fill="#2b3138" />
        <circle cx="36.5" cy="25.8" r="0.9" fill="#2b3138" />
        <path
          d="M29.1 31.1c1 1 1.9 1.4 2.9 1.4s1.9-.4 2.9-1.4"
          stroke="#b16f58"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="avatar-jacket" x1="20" y1="39" x2="44" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#383d45" />
            <stop offset="1" stopColor="#161a1f" />
          </linearGradient>
          <radialGradient id="avatar-skin" cx="0" cy="0" r="1" gradientTransform="translate(27 19) rotate(42) scale(18 20)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffe9d7" />
            <stop offset="1" stopColor="#f1b790" />
          </radialGradient>
          <radialGradient id="avatar-hair" cx="0" cy="0" r="1" gradientTransform="translate(28 13) rotate(29) scale(20 18)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#373c43" />
            <stop offset="1" stopColor="#121417" />
          </radialGradient>
        </defs>
      </svg>
    </span>
  );
}
