'use client';

import Link from 'next/link';
import { Logo } from './ui/logo';
import { useState } from 'react';
import { LuCompass, LuMenu, LuPlus, LuUser, LuX } from 'react-icons/lu';
import { Button } from './ui/button';

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 group w-28">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/discover">Explore Events</Link>
          <Link href="/create">Create Event</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild>
            <Link href="/signup">
              <LuUser /> Sign in
            </Link>
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <LuX className="w-5 h-5" />
          ) : (
            <LuMenu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="p-4 flex flex-col gap-2">
            <Link
              href="/discover"
              className="px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Discover
            </Link>
            <Link
              href="/create"
              className="px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Create Event
            </Link>

            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground text-center"
            >
              Sign in
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
