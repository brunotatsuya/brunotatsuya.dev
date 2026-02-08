import LogoLoop, { type LogoItem } from '@/components/ui/logo-loop'

export function SkillsSection({
  title,
  items,
  direction,
}: {
  title: string
  items: LogoItem[]
  direction: 'left' | 'right'
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
          {title}
        </h3>
        <span className="bg-border/70 h-px flex-1" />
      </div>
      <LogoLoop
        logos={items}
        speed={32}
        direction={direction}
        gap={44}
        logoHeight={32}
        fadeOut
        fadeOutColor="var(--background)"
        ariaLabel={`${title} logos`}
        className="bg-background pointer-events-none overflow-hidden rounded-2xl px-0.5 py-2 md:pointer-events-auto"
      />
    </div>
  )
}
