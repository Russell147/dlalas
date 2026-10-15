"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, MessageCircle, X } from "lucide-react";
import { AppwriteConfigurationError, submitRequest, whatsappLink } from "@/lib/appwrite";
import type { CustomerRequest } from "@/types";

const empty: CustomerRequest = { customerName: "", phoneNumber: "", selectedProduct: "", message: "" };
const input =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30";

export default function RequestForm({ selectedProduct }: { selectedProduct: string }) {
  const [form, setForm] = useState<CustomerRequest>(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Prefill from catalog click
  useEffect(() => {
    if (!selectedProduct) return;
    setForm((f) => ({
      ...f,
      selectedProduct,
      message: f.message ? f.message : `I would like to order: ${selectedProduct}`,
    }));
  }, [selectedProduct]);

  const update = (k: keyof CustomerRequest) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await submitRequest(form);
      setSuccess(true);
      setForm(empty);
    } catch (error) {
      if (error instanceof AppwriteConfigurationError) {
        setError(error.message);
      } else {
        console.error("Failed to submit order request:", error);
        setError("We could not send your request. Check your connection and try again, or send it on WhatsApp.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="request" className="bg-white py-20">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="text-3xl font-bold text-slate-900">Send an order request</h2>
        <p className="mt-2 text-slate-600">Tell us what you need and we will contact you to confirm your order.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="customerName" className="mb-1 block font-medium">Full name</label>
            <input id="customerName" required value={form.customerName} onChange={update("customerName")} className={input} autoComplete="name" />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="mb-1 block font-medium">Phone or WhatsApp number</label>
            <input id="phoneNumber" type="tel" required value={form.phoneNumber} onChange={update("phoneNumber")} className={input} autoComplete="tel" />
          </div>
          <div>
            <label htmlFor="selectedProduct" className="mb-1 block font-medium">Selected item (optional)</label>
            <input id="selectedProduct" value={form.selectedProduct} onChange={update("selectedProduct")} className={input} />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block font-medium">Your order</label>
            <textarea
              id="message" required rows={5} value={form.message} onChange={update("message")} className={input}
              placeholder="e.g. 2 loaves of bread, 1 bottle of milk and 2kg of rice"
            />
          </div>

          {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit" disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 font-bold text-slate-900 transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin" aria-hidden />}
              {loading ? "Sending request" : "Send request"}
            </button>
            <a
              href={whatsappLink(form)} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-brand px-6 py-4 font-semibold text-brand-dark transition-colors hover:bg-brand-light"
            >
              <MessageCircle className="h-5 w-5" aria-hidden /> Send on WhatsApp
            </a>
          </div>
        </form>
      </div>

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="success-title">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
            <button onClick={() => setSuccess(false)} aria-label="Close" className="absolute right-4 top-4 text-slate-400 hover:text-slate-700">
              <X className="h-5 w-5" />
            </button>
            <CheckCircle2 className="mx-auto h-14 w-14 text-brand" aria-hidden />
            <h3 id="success-title" className="mt-4 text-xl font-bold">Request sent</h3>
            <p className="mt-2 text-slate-600">Thank you. We will contact you shortly to confirm your order.</p>
            <button onClick={() => setSuccess(false)} className="mt-6 w-full rounded-xl bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-dark">
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
