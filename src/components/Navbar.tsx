"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Products" },
  { href: "#request", label: "Request" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/40 bg-white/60 shadow-sm backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#home" className="flex items-center gap-2 font-bold text-slate-900">
          <Image src="/dlalas-logo.png" alt="Dlalas General Dealer logo" width={52} height={52} className="h-12 w-12 rounded-xl object-contain shadow-md ring-2 ring-white" />
          Dlalas General Dealer
        </a>

        <ul className="hidden gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="font-medium text-slate-600 transition-colors hover:text-brand">{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#request"
            className="hidden rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark md:inline-flex"
          >
            Sign In
          </a>

          <button
            className="rounded-lg p-2 text-slate-700 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-white/40 bg-white/75 px-4 py-2 backdrop-blur-lg md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-lg font-medium text-slate-700">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#request"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl bg-brand px-4 py-3 text-center text-base font-semibold text-white"
            >
              Sign In
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
