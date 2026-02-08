'use client'

import Link from 'next/link'
import { Trans } from 'react-i18next'
import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-border/60 bg-muted/60 text-muted-foreground border-t">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-8 py-4 text-xs md:px-12 lg:px-16">
        <p className="text-muted-foreground text-left text-xs">
          <Trans
            i18nKey="footer.credit"
            components={{ name: <span className="text-primary" /> }}
          />
        </p>
        <div className="flex items-center justify-end gap-4">
          <Link
            href="https://github.com/brunotatsuya/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Github className="size-4" />
          </Link>
          <Link
            href="http://linkedin.com/in/bruno-tatsuya"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Linkedin className="size-4" />
          </Link>
          <Link
            href="mailto:brunomasunaga@gmail.com"
            aria-label="Email"
            className="text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Mail className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
