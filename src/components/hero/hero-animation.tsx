import { cn } from '@/lib/utils'

type HeroAnimationProps = {
  className?: string
}

export default function HeroAnimation({ className }: HeroAnimationProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn(className)}
      focusable="false"
      viewBox="0 0 420 420"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path id="p1" d="M210 210 L190 40" />
        <path id="p2" d="M210 210 L335 95" />
        <path id="p3" d="M210 210 L390 215" />
        <path id="p4" d="M210 210 L310 355" />
        <path id="p5" d="M210 210 L215 390" />
        <path id="p6" d="M210 210 L95 330" />
        <path id="p7" d="M210 210 L40 230" />
        <path id="p8" d="M210 210 L85 90" />
        <path id="p9" d="M210 210 L260 60" />
      </defs>

      <use
        href="#p1"
        fill="none"
        stroke="#e07c59"
        strokeLinecap="round"
        strokeWidth="2"
        opacity="0.35"
      />
      <use
        href="#p2"
        fill="none"
        stroke="#e07c59"
        strokeLinecap="round"
        strokeWidth="2.5"
        opacity="0.55"
      />
      <use
        href="#p3"
        fill="none"
        stroke="#e07c59"
        strokeLinecap="round"
        strokeWidth="3"
        opacity="0.85"
      />
      <use
        href="#p4"
        fill="none"
        stroke="#e07c59"
        strokeLinecap="round"
        strokeWidth="2.5"
        opacity="0.55"
      />
      <use
        href="#p5"
        fill="none"
        stroke="#e07c59"
        strokeLinecap="round"
        strokeWidth="2"
        opacity="0.35"
      />
      <use
        href="#p6"
        fill="none"
        stroke="#e07c59"
        strokeLinecap="round"
        strokeWidth="3"
        opacity="0.85"
      />
      <use
        href="#p7"
        fill="none"
        stroke="#e07c59"
        strokeLinecap="round"
        strokeWidth="2.5"
        opacity="0.55"
      />
      <use
        href="#p8"
        fill="none"
        stroke="#e07c59"
        strokeLinecap="round"
        strokeWidth="2"
        opacity="0.35"
      />
      <use
        href="#p9"
        fill="none"
        stroke="#e07c59"
        strokeLinecap="round"
        strokeWidth="3"
        opacity="0.85"
      />

      <circle cx="210" cy="210" r="10" fill="#e07c59" opacity="0.9">
        <animate
          attributeName="r"
          dur="6s"
          repeatCount="indefinite"
          values="9;11;9"
        />
      </circle>

      <circle cx="190" cy="40" r="5" fill="#e07c59" opacity="0.5" />
      <circle cx="335" cy="95" r="5" fill="#e07c59" opacity="0.5" />
      <circle cx="390" cy="215" r="5" fill="#e07c59" opacity="0.5" />
      <circle cx="310" cy="355" r="5" fill="#e07c59" opacity="0.5" />
      <circle cx="215" cy="390" r="5" fill="#e07c59" opacity="0.5" />
      <circle cx="95" cy="330" r="5" fill="#e07c59" opacity="0.5" />
      <circle cx="40" cy="230" r="5" fill="#e07c59" opacity="0.5" />
      <circle cx="85" cy="90" r="5" fill="#e07c59" opacity="0.5" />
      <circle cx="260" cy="60" r="5" fill="#e07c59" opacity="0.5" />

      <g>
        <circle r="3" fill="#f9a07f">
          <animateMotion dur="3.2s" repeatCount="indefinite">
            <mpath href="#p1" xlinkHref="#p1" />
          </animateMotion>
        </circle>
        <circle r="3" fill="#f9a07f">
          <animateMotion dur="4.6s" repeatCount="indefinite">
            <mpath href="#p2" xlinkHref="#p2" />
          </animateMotion>
        </circle>
        <circle r="3" fill="#f9a07f">
          <animateMotion dur="2.9s" repeatCount="indefinite">
            <mpath href="#p3" xlinkHref="#p3" />
          </animateMotion>
        </circle>
        <circle r="3" fill="#f9a07f">
          <animateMotion dur="5.1s" repeatCount="indefinite">
            <mpath href="#p4" xlinkHref="#p4" />
          </animateMotion>
        </circle>
        <circle r="3" fill="#f9a07f">
          <animateMotion dur="3.8s" repeatCount="indefinite">
            <mpath href="#p5" xlinkHref="#p5" />
          </animateMotion>
        </circle>
        <circle r="3" fill="#f9a07f">
          <animateMotion dur="4.2s" repeatCount="indefinite">
            <mpath href="#p6" xlinkHref="#p6" />
          </animateMotion>
        </circle>
        <circle r="3" fill="#f9a07f">
          <animateMotion dur="3.4s" repeatCount="indefinite">
            <mpath href="#p7" xlinkHref="#p7" />
          </animateMotion>
        </circle>
        <circle r="3" fill="#f9a07f">
          <animateMotion dur="5.6s" repeatCount="indefinite">
            <mpath href="#p8" xlinkHref="#p8" />
          </animateMotion>
        </circle>
        <circle r="3" fill="#f9a07f">
          <animateMotion dur="2.7s" repeatCount="indefinite">
            <mpath href="#p9" xlinkHref="#p9" />
          </animateMotion>
        </circle>
      </g>
    </svg>
  )
}
