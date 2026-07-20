# Nuxtie API

**Живой стенд:** https://demapi.michdev.netcraze.link

**Swagger:** https://demapi.michdev.netcraze.link/api/v1/docs

**Фронтенд (Nuxt):** https://demnuxt.michdev.netcraze.link

> Не содержит реальных пользовательских данных.

## Стек

- **Runtime:** Node.js + TypeScript
- **Framework:** Express v5
- **База данных:** PostgreSQL + [Kysely](https://kysely.dev/) (типобезопасный query builder, без ORM)
- **Валидация:** Zod
- **Документация API:** OpenAPI 3.0, автогенерируется из Zod-схем ([@asteasolutions/zod-to-openapi](https://github.com/asteasolutions/zod-to-openapi)), отдаётся через Swagger UI
- **Аутентификация:** [Jose](https://github.com/panva/jose) (JWT) — access-токен в заголовке `Authorization`, refresh-токен в `httpOnly` cookie
- **Хэширование паролей:** Argon2
- **Логирование:** Pino / Pino-http
- **Тесты:** Vitest
- **Линтинг:** ESLint + typescript-eslint

## Архитектура

Слоистая архитектура (**Layer First**): `Repository → Service → Controller`.

- **Repository** — единственный слой, знающий о БД. Отвечает только за запросы через Kysely.
- **Service** — бизнес-логика, паттерн **Transaction Script**: каждый публичный метод сервиса — законченная бизнес-операция.
- **Controller** — только HTTP: парсинг запроса, вызов сервиса, формирование ответа.
- **Domain** — отдельный слой для сущностей со сложными инвариантами (например, `OrderCheckoutDomain` — атомарное списание остатков с защитой от race condition, all-or-nothing транзакция). Для простых CRUD-сущностей (category, brand, attribute) domain-слой не заводится.

Выбор в пользу **Transaction Script + анемичная модель**, а не Domain-Driven Design. В DDD первичны бизнес-правила, вокруг которых строится модель. Здесь же, как почти всегда в TypeScript/Node.js-проектах поверх реляционной БД, первичны данные: объекты приходят из query builder уже "плоскими", без встроенного поведения, и оборачивать их в доменные объекты только ради переноса из одной "коробки" в другую было бы искусственным усложнением без практической пользы. Domain-слой заводится точечно — там, где бизнес-логика действительно сложна (оформление заказа), а не по умолчанию для всех сущностей.

### Data Access — Repository Pattern

Общий абстрактный `Repository<Table>` с базовыми операциями (`get`, `first`, `paginate`, `insert`, `update`, `delete`), включая поддержку транзакций Kysely на всех методах.

Переиспользуемое поведение подмешивается через **миксины**:

- `SoftDeletable` — мягкое удаление, единая реализация для всех сущностей, которые в нём нуждаются
- `Sluggable` — генерация уникального slug с автоматическим разрешением коллизий

### Валидация и сериализация

- **Вход:** каждый эндпоинт валидируется через Zod-схему (`Request`-классы), контроллеры не содержат ручной валидации.
- **Выход:** каждый ответ проходит через `Resource`-класс (вам может быть это знакомо из Laravel Resource) — контролируемая трансформация внутренних данных в публичный контракт API, не завязанная на структуру БД.

### Dependency Injection

Простой DI через **Composition Root** — контейнеры (`repositories.container.ts`, `services.container.ts`, `controllers.container.ts`), без DI-фреймворка. Зависимости собираются явно в одном месте при старте приложения.

### Версионирование API

Все маршруты — под `/api/v1`, разделены на `store` (публичный каталог + user-scoped ресурсы) и `admin` (защищено ролью).

## Аутентификация и авторизация

- JWT через Jose: короткоживущий access-токен в заголовке `Authorization: Bearer`, долгоживущий refresh-токен в `httpOnly` cookie.
- Роли пользователей — `roleMiddleware` для admin-маршрутов.
- Rate limiting на аутентификационных эндпоинтах (`express-rate-limit`).

## API-документация — два документа, разная видимость

Публичный Swagger (`/api/v1/docs`) и полный внутренний документ (генерируется локально) — **разные документы**: один для демонстрации, другой для разработки:

- **Публичный** — только `store` (каталог, корзина, заказы, закладки) и `auth`. Доступен всегда на живом стенде, можно зарегистрироваться и попробовать эндпоинты вживую.
- **Полный, dev-версия** (`npm run docs:generate` → `docs/openapi-full.json`) — включает `admin` CRUD. Генерируется и просматривается только локально, не публикуется на сервере: admin-контракты защищены `roleMiddleware` на уровне выполнения запроса.

Оба документа генерируются **из одних и тех же Zod-схем**, которые уже используются для валидации запросов — не отдельный, независимо поддерживаемый YAML/JSON-файл. Соответствие ответов заявленным в документации схемам частично проверяется на этапе компиляции через `satisfies z.ZodType<...>`.

Открыть полный документ: сгенерировать локально и импортировать в [Swagger Editor](https://editor.swagger.io/) или [Redocly](https://redocly.com/redoc).

## Функциональность

- **Каталог** — товары с вариантами (цвет/объём и т.п.), фильтрация по бренду/категории/цене/произвольным атрибутам, пагинация
- **Корзина** — идемпотентное добавление (upsert по количеству), обновление, удаление
- **Закладки** — идемпотентный toggle
- **Заказы** — оформление из корзины одной транзакцией: атомарное списание остатков (защита от race condition через `UPDATE ... WHERE stock >= quantity`), snapshot цены/названия на момент заказа, all-or-nothing при недостатке товара
- **Admin CRUD** — бренды, категории, атрибуты, товары, варианты, статусы заказов
- **Master-create товара** — создание товара со всеми вариантами и атрибутами одной транзакцией, с защитой от дублей по slug

## Инфраструктура

- **Контейнеризация:** Docker, multi-stage build (`node:24-alpine`) — сборка (`npm run build`, TypeScript → `dist/`) отдельно от рантайм-образа (только prod-зависимости, `npm ci --omit=dev`).
- **Деплой:** `compose.yml` с профилями (сервис `api` — `root`/`api`/`demapi`) — сначала прогоняются миграции, затем поднимается сам сервис. Подключается к уже существующим внешним Docker-сетям (`www`, `pg_network`) — API не поднимает БД сам, интегрируется в существующую инфраструктуру хоста.
- **CI/CD:** GitHub Actions, self-hosted runner на Raspberry Pi. Триггер — push в `main`. Пайплайн: сборка `.env` из GitHub Secrets → `docker compose build` → прогон миграций → `docker compose up -d`.
- **Reverse proxy:** Nginx + Certbot/Let's Encrypt, домен через Keenetic DDNS.
- **Git-flow:** feature-ветки → squash-merge в `dev` → периодический merge в `main` (деплой триггерится только с `main`).

## Локальный запуск

```bash
npm install
cp .env.example .env    # заполнить переменные окружения (см. ниже)
npm run migrate         # применить миграции
npm run seed             # заполнить справочники (категории, бренды, статусы и т.п.)
npm run dev              # dev-режим с watch (tsx)
```

Продакшен-сборка: `npm run build && npm run start`, либо `npm run preview` для локальной проверки прод-сборки.

Swagger локально: `http://localhost:3030/api/v1/docs`

### Переменные окружения

```env
APP_NAME=APP
APP_PORT=3030
APP_JWT_ACCESS_SECRET_KEY=secret-key
APP_PUBLIC_URL=https://public.url

APP_DB_HOST=127.0.0.1
APP_DB_PORT=3306
APP_DB_USER=user
APP_DB_NAME=db
APP_DB_PASSWORD=pass

APP_DB_MAX_CONS=10
APP_DB_MIN_CONS=2

APP_ALLOWED_ORIGINS=https://my.frontend.example

MIN_LOG_LEVEL=info
```

Полный актуальный список — в `.env.example`.

### Полезные команды

| Команда                    | Назначение                                     |
| -------------------------- | ---------------------------------------------- |
| `npm run dev`              | dev-сервер с hot reload                        |
| `npm run build`            | сборка TypeScript в `dist/`                    |
| `npm run migrate`          | применить миграции                             |
| `npm run migrate:rollback` | откатить все миграции                          |
| `npm run migrate:make`     | создать новую миграцию                         |
| `npm run seed`             | прогнать все сиды                              |
| `npm run test`             | тесты в watch-режиме                           |
| `npm run test:run`         | тесты один раз (для CI)                        |
| `npm run docs:generate`    | сгенерировать полный OpenAPI-документ локально |

## AI

Планирование: **claude** или **chatGPT**
Исполнение: **cline** + **GLM 5.2**

## Связанные проекты

- **Фронтенд** (Nuxt): https://demnuxt.michdev.netcraze.link — витрина, использует этот API как единственный источник данных о товарах/заказах.

## Дисклеймер

Проект тренажёр. Не предназначен для реальных платежей — `paymentMethod` фиксируется как выбор пользователя, без интеграции с платёжным шлюзом.
