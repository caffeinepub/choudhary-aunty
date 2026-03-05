/**
 * Local product data — pre-computed from SEED_PRODUCTS so all 50 products
 * are available client-side when the backend hasn't replicated them yet.
 *
 * The backend only seeds Bihar (10 products). This file provides all 50
 * products and 5 makers as frontend-typed objects so queries can fall back
 * to this data when the backend returns an empty result for a state.
 */

import type { Maker, Product } from "../backend.d";
import { SEED_MAKERS, SEED_PRODUCTS, type Season } from "./seedData";

// Extended product type with season (frontend-only field)
export type LocalProduct = Product & { season?: Season };

// Maker index → canonical backend-style ID mapping
// (matches the IDs in main.mo preSeededMakers: 1=Anju, 2=Babita, 3=Sarla, 4=Preetkaur, 5=Geeta)
const MAKER_ID_BY_INDEX: Record<number, bigint> = {
  0: 1n, // Anju Choudhary — Bihar
  1: 2n, // Babita Tai — Haryana
  2: 3n, // Sarla Maasi — Uttar Pradesh
  3: 4n, // Preetkaur Aunty — Punjab
  4: 5n, // Geeta Devi — Uttarakhand
};

// Pre-built Makers list (matches backend preSeededMakers IDs)
export const LOCAL_MAKERS: Maker[] = SEED_MAKERS.map((m, idx) => ({
  ...m,
  id: MAKER_ID_BY_INDEX[idx] ?? BigInt(idx + 1),
}));

// Pre-built Products list — IDs 1–50 matching backend preSeededProducts order
export const LOCAL_PRODUCTS: LocalProduct[] = SEED_PRODUCTS.map((p, idx) => ({
  id: BigInt(idx + 1),
  makerId: MAKER_ID_BY_INDEX[p.makerIndex] ?? BigInt(p.makerIndex + 1),
  name: p.name,
  description: p.description,
  ingredients: p.ingredients,
  preparationMethod: p.preparationMethod,
  usp: p.usp,
  mrp: p.mrp,
  sellingPrice: p.sellingPrice,
  minBatchKg: p.minBatchKg,
  category: p.category,
  state: p.state,
  season: p.season,
  imageUrl: p.imageUrl,
  isAvailable: p.isAvailable,
}));

/** Return all local products for a given state */
export function getLocalProductsByState(state: string): LocalProduct[] {
  return LOCAL_PRODUCTS.filter((p) => p.state === state);
}

/** Return a local product by id */
export function getLocalProductById(id: bigint): LocalProduct | undefined {
  return LOCAL_PRODUCTS.find((p) => p.id === id);
}

/** Return all local makers for a given state */
export function getLocalMakersByState(state: string): Maker[] {
  return LOCAL_MAKERS.filter((m) => m.state === state);
}

/** State → product count map */
export const LOCAL_STATE_COUNTS: Array<{ state: string; count: bigint }> = [
  "Bihar",
  "Haryana",
  "Punjab",
  "Uttar Pradesh",
  "Uttarakhand",
].map((state) => ({
  state,
  count: BigInt(LOCAL_PRODUCTS.filter((p) => p.state === state).length),
}));
