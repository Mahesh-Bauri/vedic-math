"use client";

import Link from "next/link";
import { BookOpen, Trophy } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-xl font-bold">वे</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">Vedic Math</span>
            <span className="text-xs text-muted-foreground">Practice Portal</span>
          </div>
        </Link>
        
        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Learn</span>
          </Link>
          <Link
            href="/practice"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Trophy className="h-4 w-4" />
            <span>Practice</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
