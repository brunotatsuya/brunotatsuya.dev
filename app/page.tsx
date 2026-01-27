import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold">My App</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="mb-4 text-3xl font-bold">Welcome!</h2>
        <p className="text-muted-foreground mb-4">
          Click the theme toggle in the header to switch between light, dark,
          and system themes.
        </p>
        <p className="font-sans">This should be in Inter (font-sans)</p>
        <p className="font-serif">This should be in Amethysta (font-serif)</p>
        <p className="font-mono">This should be in Fira Code (font-mono)</p>
        <hr className="my-4" />
        <p className="font-test-sans">
          Test: Inter via custom utility (font-test-sans)
        </p>
        <p className="font-test-serif">
          Test: Amethysta via custom utility (font-test-serif)
        </p>
        <p className="font-test-mono">
          Test: Fira Code via custom utility (font-test-mono)
        </p>
      </main>
    </div>
  )
}
