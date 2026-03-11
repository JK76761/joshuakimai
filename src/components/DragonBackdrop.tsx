export default function DragonBackdrop() {
  return (
    <div className="site-dragon" aria-hidden="true">
      <div className="site-dragon-shell">
        <svg
          className="site-dragon-svg"
          viewBox="0 0 920 620"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="dragonBodyGradient" x1="311" y1="140" x2="653" y2="508" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f9f9f8" stopOpacity="0.62" />
              <stop offset="48%" stopColor="#c7cbd2" stopOpacity="0.52" />
              <stop offset="100%" stopColor="#8b919b" stopOpacity="0.42" />
            </linearGradient>
            <linearGradient id="dragonWingGradient" x1="132" y1="92" x2="805" y2="420" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.58" />
              <stop offset="100%" stopColor="#9ea4af" stopOpacity="0.36" />
            </linearGradient>
            <linearGradient id="dragonOutlineGradient" x1="230" y1="120" x2="780" y2="500" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#5d636d" stopOpacity="0.72" />
              <stop offset="100%" stopColor="#c5c9cf" stopOpacity="0.52" />
            </linearGradient>
            <filter id="dragonBlur" x="-18%" y="-18%" width="136%" height="136%">
              <feGaussianBlur stdDeviation="14" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g className="site-dragon-frame" filter="url(#dragonBlur)">
            <path
              className="site-dragon-wing site-dragon-wing-back"
              d="M430 266C365 145 245 84 114 88C194 131 246 198 266 270C173 260 98 292 57 356C143 329 236 332 315 365C366 386 408 419 439 457L430 266Z"
            />
            <path
              className="site-dragon-wing site-dragon-wing-front"
              d="M510 256C579 132 706 74 844 99C759 140 698 208 673 281C775 270 853 302 898 366C801 338 704 343 620 377C567 399 523 432 489 470L510 256Z"
            />
            <path
              className="site-dragon-body-solid"
              d="M456 252C470 206 447 162 402 142C443 137 483 148 514 174C531 189 543 207 547 227C566 207 592 196 620 198C592 219 577 247 575 276C572 304 581 331 602 351C572 345 547 329 534 304C523 282 505 266 484 262C473 260 463 265 456 252ZM459 267C492 230 555 219 608 234C655 247 693 281 704 322C716 364 699 408 662 434C636 452 603 459 572 454C588 483 617 503 651 513C604 531 550 517 515 486C497 470 483 450 477 430C453 428 430 420 411 405C378 380 364 346 370 311C376 281 398 258 430 253C439 251 449 255 459 267ZM424 408C365 424 320 468 309 521C301 558 316 595 350 617C315 617 281 603 257 576C232 549 223 511 229 474C239 420 281 373 343 346C304 340 271 324 246 299C216 269 201 232 204 191C216 243 259 286 311 305C353 320 392 351 414 392C418 397 421 402 424 408Z"
            />
            <path
              className="site-dragon-tail"
              d="M422 404C378 428 350 470 347 510C344 543 359 569 385 586"
            />
            <path
              className="site-dragon-outline"
              d="M452 250C468 208 447 165 406 144C444 141 481 152 509 176C523 187 534 202 540 219C556 202 579 194 603 196C577 214 562 238 559 264C556 292 563 317 579 336"
            />
            <path
              className="site-dragon-outline"
              d="M458 268C492 233 551 223 601 236C650 249 688 282 701 320C716 362 701 405 666 431C639 452 602 461 568 454"
            />
            <path
              className="site-dragon-outline"
              d="M427 406C370 424 327 467 316 516C309 553 321 585 346 604"
            />
            <path
              className="site-dragon-whisker"
              d="M592 205C626 192 657 194 687 210"
            />
            <path
              className="site-dragon-whisker"
              d="M600 221C637 221 670 231 700 253"
            />
            <path
              className="site-dragon-horn"
              d="M557 174C572 150 597 137 623 136C607 151 596 168 591 187"
            />
            <path
              className="site-dragon-horn"
              d="M538 178C549 154 569 141 591 137C577 153 568 170 565 187"
            />
            <circle className="site-dragon-eye" cx="580" cy="225" r="5.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}
