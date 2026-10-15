import Image from "next/image";
import { Clock, Phone } from "lucide-react";

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_STORE_PHONE ?? "";
  return (
    <footer className="bg-brand-dark text-green-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 text-lg font-bold text-white">
            <Image src="/dlalas-logo.png" alt="" width={64} height={64} className="h-12 w-12 rounded-xl object-contain" />
            Dlalas General Dealer
          </p>
          <p className="mt-2 text-sm">Your local store for groceries and household essentials.</p>
        </div>
        <div>
          <p className="flex items-center gap-2 font-semibold text-white"><Clock className="h-5 w-5" aria-hidden /> Operating hours</p>
          <p className="mt-2 text-sm">Mon to Sat: 7:00 am to 7:00 pm</p>
          <p className="text-sm">Sunday: 8:00 am to 1:00 pm</p>
        </div>
        <div>
          <p className="flex items-center gap-2 font-semibold text-white"><Phone className="h-5 w-5" aria-hidden /> Contact</p>
          <p className="mt-2 text-sm">{phone}</p>
        </div>
      </div>
      <p className="border-t border-white/20 py-4 text-center text-xs">
        &copy; {new Date().getFullYear()} Dlalas General Dealer
      </p>
    </footer>
  );
}
