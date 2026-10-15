import type { LucideIcon } from "lucide-react";

export type Category = "Bakery" | "Dairy" | "Pantry" | "Beverages" | "Household" | "Electronics";

export interface Product {
  id: string;
  name: string;
  measure?: string;
  category: Category;
  price?: number;
  icon: LucideIcon;
  image?: string; // optional photo path in /public, overrides the icon
}

export interface CustomerRequest {
  customerName: string;
  phoneNumber: string;
  selectedProduct: string;
  message: string;
}
