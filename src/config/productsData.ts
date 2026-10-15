import { Wheat, Milk, Egg, Package, GlassWater, SprayCan } from "lucide-react";
import type { Category, Product } from "@/types";

export const categories: ("All" | Category)[] = ["All", "Bakery", "Dairy", "Pantry", "Beverages", "Household", "Electronics"];

export const products: Product[] = [
  { id: "bread", name: "Bread", measure: "White loaf", category: "Bakery", price: 1.5, icon: Wheat, image: "/products/bread.jpg" },
  { id: "milk", name: "Milk", measure: "1 litre", category: "Dairy", price: 1.8, icon: Milk, image: "/products/milk.jpg" },
  { id: "eggs", name: "Eggs", measure: "12 pack", category: "Dairy", price: 3.0, icon: Egg },
  { id: "rice", name: "Rice", measure: "2kg", category: "Pantry", price: 4.5, icon: Package, image: "/products/rice.jpg" },
  { id: "cooking-oil", name: "Cooking Oil", measure: "2 litre bottle", category: "Pantry", icon: Package, image: "/products/cooking-oil.jpg" },
  { id: "soft-drink", name: "Soft Drink", measure: "500ml", category: "Beverages", price: 1.0, icon: GlassWater },
  { id: "washing-powder", name: "Washing Powder", measure: "1kg", category: "Household", price: 3.5, icon: SprayCan, image: "/products/omo.jpg" },
  { id: "potato-chips", name: "Potato Chips", category: "Pantry", icon: Package, image: "/products/lays.jpg" },
  { id: "peanuts", name: "Peanuts", category: "Pantry", icon: Package, image: "/products/peanuts.jpg" },
  { id: "soap", name: "Soap", category: "Household", icon: Package, image: "/products/soap.jpg" },
  { id: "speakers", name: "Speakers", category: "Electronics", icon: Package, image: "/products/speakers.jpg" },
];
