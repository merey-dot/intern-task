import type { Product, PriceResult } from "./types";

/**
 * Чистая функция: рассчитывает новую цену для одного товара.
 * Правила — см. README, раздел «Правила расчёта цены».
 * Не меняйте сигнатуру и путь к файлу: решение проверяется автотестами.
 */
export function calculatePrice(product: Product): PriceResult {
  // TODO: реализовать
  const available = product.competitors.filter(p => p.inStock)
  if (available.length === 0) {
    return { sku: product.sku, oldPrice: product.myPrice, newPrice: product.maxPrice, reason: "NO_COMPETITORS" }
  }
  const prices = available.map(p => p.price)
  const best = Math.min(...prices)
  const candidate = Math.floor(best - product.step)
  if (candidate < product.minPrice) {
    return { sku: product.sku, oldPrice: product.myPrice, newPrice: product.minPrice, reason: "AT_MIN" }
  }
  else if (candidate > product.maxPrice) {
    return { sku: product.sku, oldPrice: product.myPrice, newPrice: product.maxPrice, reason: "AT_MAX" }
  }
  else {
    return { sku: product.sku, oldPrice: product.myPrice, newPrice: candidate, reason: "UNDERCUT" }
  }
  throw new Error("Not implemented");
} 
