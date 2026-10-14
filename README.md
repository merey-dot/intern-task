# Мини-прайс-бот (тестовое задание SaleScout)

Мини-версия прайс-бота для Kaspi.kz: по списку товаров и цен конкурентов рассчитывает новую цену так, чтобы продавец был дешевле конкурента, но не выходил за свои границы `minPrice` и `maxPrice`.

В проекте три части:

- функция расчёта цены `calculatePrice` (`src/pricing.ts`);
- HTTP API на Express: `POST /reprice`;
- веб-страница на React (Vite) с таблицей «было / стало».

## Требования

- Node.js 20
- npm

## Установка

```bash
npm install
```

## Запуск сервера

```bash
npx tsx src/server.ts
```

Сервер стартует на `http://localhost:3000`.

## Запуск фронтенда

```bash
cd web
npm install
npm run dev
```

Страница откроется по адресу, который выведет Vite (обычно `http://localhost:5173`). Сервер при этом должен быть запущен.

## Тесты

```bash
npm test
```

Тесты написаны на [vitest](https://vitest.dev/) и лежат в `src/pricing.test.ts`.

## Правила расчёта цены

1. Учитываются только конкуренты с `inStock: true`, остальные игнорируются.
2. Если таких конкурентов нет, `newPrice = maxPrice`, причина `NO_COMPETITORS`.
3. Иначе берётся минимальная цена среди них (`best`), кандидат считается как `floor(best - step)`.
4. Кандидат ограничивается диапазоном:
   - меньше `minPrice`: `newPrice = minPrice`, причина `AT_MIN`;
   - больше `maxPrice`: `newPrice = maxPrice`, причина `AT_MAX`;
   - иначе `newPrice = кандидат`, причина `UNDERCUT` (границы включительно).
5. Текущая цена `myPrice` на расчёт не влияет, она только возвращается как `oldPrice`.

## API

### `POST /reprice`

Заголовок: `Content-Type: application/json`.

Тело запроса: массив товаров (`Product[]`), формат см. в `src/types.ts`.

Ответы:

- `200`: массив результатов (`PriceResult[]`) в том же порядке, что и товары в запросе;
- `400`: тело запроса не является массивом.

Пример запроса:

```bash
curl -X POST http://localhost:3000/reprice \
  -H "Content-Type: application/json" \
  -d @data/products.json
```

Пример ответа (фрагмент):

```json
[
  { "sku": "IPH15-128-BLK", "oldPrice": 389990, "newPrice": 384980, "reason": "UNDERCUT" },
  { "sku": "SAM-A55-256", "oldPrice": 189000, "newPrice": 180000, "reason": "AT_MIN" }
]
```

Пример ответа `400` на тело, которое не является массивом:

```json
{ "error": "Body must be an array" }
```

## Структура проекта

```
src/
  pricing.ts        функция calculatePrice (чистая, без I/O)
  pricing.test.ts   тесты на calculatePrice
  types.ts          типы Product, Competitor, PriceResult
  server.ts         Express-сервер, эндпоинт POST /reprice
web/                React-приложение (Vite)
data/
  products.json     пример входных данных
  expected.json     ожидаемый результат для примера
```
