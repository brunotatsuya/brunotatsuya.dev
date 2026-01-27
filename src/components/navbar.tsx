import Image from 'next/image'
import Link from 'next/link'

import { Menu } from 'lucide-react'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/favicon.png"
            alt="brunotatsuya.dev"
            width={22}
            height={22}
            className="rounded-sm"
            priority
          />
          <span className="text-base font-semibold tracking-wide">
            brunotatsuya.dev
          </span>
        </Link>
        <nav className="hidden items-center gap-2 text-base md:flex">
          <ThemeToggle />
          <Button asChild variant="ghost" size="default">
            <Link href="#about">About</Link>
          </Button>
          <Button asChild variant="ghost" size="default">
            <Link href="#contact">Contact</Link>
          </Button>
          <Button asChild size="default">
            <Link href="/resume.pdf" download>
              Resume
            </Link>
          </Button>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="icon" className="rounded-full">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <Link href="#about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#contact">Contact</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="font-semibold text-primary">
                <Link href="/resume.pdf" download>
                  Resume
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
