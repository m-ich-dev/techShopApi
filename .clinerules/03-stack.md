# Стек проекта

Основной стек:

- TypeScript
- Node.js
- Express v5
- PostgreSQL
- Kysely
- pg

Используемые библиотеки:

- zod — валидация в Request-классах
- jose — работа с JWT
- argon2 — хэширование паролей (см. `src/boot/utils/argon2.ts`)
- slug — генерация slug (используется внутри миксинов, не напрямую)
- helmet, cors, cookie-parser, dotenv
- express-rate-limit

Логирование:

- Pino / Pino-http (см. `src/boot/loggers`)

Тестирование:

- Vitest

Пакетный менеджер:

- npm

Перед использованием любой библиотеки не из этого списка — уточни у пользователя, не добавляй новые зависимости самостоятельно (см. критичные запреты `00-critical-and-priority.md`).
