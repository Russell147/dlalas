import { Phone } from "lucide-react";

export default function HeroSection() {
  const phone = process.env.NEXT_PUBLIC_STORE_PHONE ?? "";
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center bg-brand-dark bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(6,40,20,0.65), rgba(6,40,20,0.65)), url('/hero-bg.jpg'), linear-gradient(135deg,#15803d,#16a34a)",
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 pt-16">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
          Everything You Need, All in One Place
        </h1>
        <p className="mt-6 max-w-xl text-lg text-green-50">
          Quality groceries and household essentials from your local store, with home delivery available.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#products" className="rounded-xl bg-accent px-8 py-4 text-center font-bold text-slate-900 shadow-lg transition-colors hover:bg-accent-dark">
            Shop Now
          </a>
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone className="h-5 w-5" aria-hidden /> Call the store
          </a>
        </div>
      </div>
    </section>
  );
}
