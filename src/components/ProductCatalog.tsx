"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { categories, products } from "@/config/productsData";

interface Props {
  onRequestItem: (label: string) => void;
}

export default function ProductCatalog({ onRequestItem }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          p.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [query, category]
  );

  return (
    <section id="products" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-3xl font-bold text-slate-900">Our Products</h2>
      <p className="mt-2 text-slate-600">Pick an item to add it to your order request.</p>

      <div className="relative mt-8">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
          aria-label="Search products"
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2" role="tablist">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={category === c}
            onClick={() => setCategory(c)}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              category === c ? "bg-accent text-slate-900" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-brand"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 rounded-2xl bg-white p-8 text-center text-slate-600">
          No products match your search. Clear the search or choose another category, or describe what you need in the request form.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const Icon = p.icon;
            const label = p.measure ? `${p.name} (${p.measure})` : p.name;
            return (
              <article key={p.id} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                <div className="relative flex h-40 items-center justify-center bg-brand-light text-brand-dark">
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                  ) : (
                    <Icon className="h-16 w-16" strokeWidth={1.5} aria-hidden />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="w-fit rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold text-slate-800">{p.category}</span>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">{p.name}</h3>
                  {p.measure && <p className="text-sm text-slate-500">{p.measure}</p>}
                  <p className="mt-3 text-2xl font-bold text-brand-dark">
                    {p.price == null ? "Ask for price" : `$${p.price.toFixed(2)}`}
                  </p>
                  <button
                    onClick={() => onRequestItem(label)}
                    className="mt-5 rounded-xl bg-brand px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    Request item
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
