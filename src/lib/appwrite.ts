import { Client, Databases, ID } from "appwrite";
import type { CustomerRequest } from "@/types";

export class AppwriteConfigurationError extends Error {
  constructor(variable: string) {
    super(
      `Missing ${variable}. Copy .env.local.example to .env.local, enter your Appwrite settings, and restart the dev server.`
    );
    this.name = "AppwriteConfigurationError";
  }
}

function requiredSetting(value: string | undefined, variable: string) {
  if (!value) {
    throw new AppwriteConfigurationError(variable);
  }
  return value;
}

export async function submitRequest(data: CustomerRequest) {
  const client = new Client()
    .setEndpoint(requiredSetting(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT, "NEXT_PUBLIC_APPWRITE_ENDPOINT"))
    .setProject(requiredSetting(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID, "NEXT_PUBLIC_APPWRITE_PROJECT_ID"));
  const databases = new Databases(client);

  return databases.createDocument(
    requiredSetting(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, "NEXT_PUBLIC_APPWRITE_DATABASE_ID"),
    requiredSetting(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID, "NEXT_PUBLIC_APPWRITE_COLLECTION_ID"),
    ID.unique(),
    data
  );
}

export function whatsappLink(data: Partial<CustomerRequest>) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const text = [
    "Hello Dlalas General Dealer, I would like to place an order.",
    data.customerName && `Name: ${data.customerName}`,
    data.selectedProduct && `Item: ${data.selectedProduct}`,
    data.message && `Order: ${data.message}`,
  ].filter(Boolean).join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
