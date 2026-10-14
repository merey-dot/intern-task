import { describe, it, expect } from "vitest";
import { calculatePrice } from "./pricing";

describe("calculatePrice", () => {
    it("снижает цену на step ниже лучшего конкурента", () => {
        const product = {
            sku: "TEST-1",
            name: "Тестовый товар",
            myPrice: 400000,
            minPrice: 370000,
            maxPrice: 420000,
            step: 10,
            competitors: [
                { seller: "A", price: 384990, inStock: true },
            ],
        };


        const result = calculatePrice(product);
        expect(result.newPrice).toBe(384980)
        expect(result.reason).toBe("UNDERCUT")
        // здесь ваша проверка
    });
    it("Не отпускается ниже minPrice", () => {
        const product = {
            sku: "TEST-1",
            name: "Тестовый товар",
            myPrice: 400000,
            minPrice: 180000,
            maxPrice: 210000,
            step: 100,
            competitors: [
                { seller: "A", price: 175000, inStock: true },
            ],
        };


        const result = calculatePrice(product);
        expect(result.newPrice).toBe(180000)
        expect(result.reason).toBe("AT_MIN")
        // здесь ваша проверка
    });
    it("не поднимается выше maxPrice", () => {
        const product = {
            sku: "TEST-1",
            name: "Тестовый товар",
            myPrice: 400000,
            minPrice: 100000,
            maxPrice: 125000,
            step: 1,
            competitors: [
                { seller: "A", price: 150000, inStock: true },
            ],
        };


        const result = calculatePrice(product);
        expect(result.newPrice).toBe(125000)
        expect(result.reason).toBe("AT_MAX")
        // здесь ваша проверка
    });
    it("округляет вниз до целого", () => {
        const product = {
            sku: "TEST-1",
            name: "Тестовый товар",
            myPrice: 400000,
            minPrice: 330000,
            maxPrice: 380000,
            step: 0.5,
            competitors: [
                { seller: "A", price: 349999.9, inStock: true },
            ],
        };


        const result = calculatePrice(product);
        expect(result.newPrice).toBe(349999)
        expect(result.reason).toBe("UNDERCUT")
        // здесь ваша проверка
    });
    it("округляет вниз до целого", () => {
        const product = {
            sku: "TEST-1",
            name: "Тестовый товар",
            myPrice: 400000,
            minPrice: 80000,
            maxPrice: 99990,
            step: 50,
            competitors: [
                { seller: "A", price: 349, inStock: false },
            ],
        };


        const result = calculatePrice(product);
        expect(result.newPrice).toBe(99990)
        expect(result.reason).toBe("NO_COMPETITORS")
        // здесь ваша проверка
    });

});