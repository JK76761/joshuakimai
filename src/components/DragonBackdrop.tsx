export default function DragonBackdrop() {
  return (
    <div className="site-dragon" aria-hidden="true">
      <div className="site-dragon-shell">
        <svg
          className="site-dragon-svg"
          viewBox="0 0 920 560"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="dragonStroke" x1="180" y1="64" x2="780" y2="446" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#484e58" stopOpacity="0.82" />
              <stop offset="48%" stopColor="#848a93" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c4c7cd" stopOpacity="0.88" />
            </linearGradient>
            <linearGradient id="dragonFill" x1="300" y1="112" x2="716" y2="464" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#d2d6dc" stopOpacity="0.08" />
            </linearGradient>
            <filter id="dragonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            className="site-dragon-body"
            d="M153 289C215 212 314 182 391 214C454 240 498 302 564 319C613 332 668 315 695 273C724 227 710 171 669 146C634 124 587 122 555 145C526 166 509 202 517 238C527 282 575 305 620 297C691 285 742 216 765 149C782 100 807 75 842 67C802 61 773 83 756 112C731 154 722 215 677 253C636 288 571 295 521 273C454 244 421 174 350 152C283 131 205 145 154 191C109 231 95 292 114 345C136 406 194 451 261 461C339 473 416 438 476 390C543 337 593 264 673 242C723 228 779 236 824 266C793 223 739 203 688 208C611 215 556 271 495 320C432 370 359 412 287 404C236 398 190 367 167 321C159 305 154 289 153 289Z"
            fill="url(#dragonFill)"
            filter="url(#dragonGlow)"
          />

          <path
            className="site-dragon-line"
            d="M162 289C221 216 318 187 392 219C454 245 498 305 562 321C610 334 661 317 691 279C721 241 719 189 693 160C669 134 628 126 593 138C553 152 526 190 528 228C530 269 569 297 607 300C675 305 736 252 764 192C784 150 793 101 831 80"
          />
          <path
            className="site-dragon-line"
            d="M163 289C138 352 174 421 244 447C316 473 396 451 461 408C522 369 575 307 645 277C700 253 764 253 815 280"
          />
          <path
            className="site-dragon-detail"
            d="M579 146C589 123 612 108 637 108C661 108 683 123 691 145C673 132 649 129 629 135C611 139 595 149 579 146Z"
          />
          <path
            className="site-dragon-detail"
            d="M673 160C691 163 708 175 714 192C699 187 684 187 669 190C660 181 662 170 673 160Z"
          />
          <circle className="site-dragon-eye" cx="648" cy="165" r="4.5" />
          <path
            className="site-dragon-whisker"
            d="M697 163C731 148 761 143 789 148"
          />
          <path
            className="site-dragon-whisker"
            d="M700 178C736 176 766 183 793 198"
          />
          <path
            className="site-dragon-flare"
            d="M459 209C438 186 408 174 379 174"
          />
          <path
            className="site-dragon-flare"
            d="M452 390C422 417 389 436 350 444"
          />
        </svg>
      </div>
    </div>
  );
}
