# TechShop API

API для techShop. TypeScript + Node.js + Express v5 + PostgreSQL + Kysely.

## API Documentation

### Публичный Swagger

Доступен по адресу: https://demapi.michdev.netcraze.link/api/v1/docs

Содержит только store- и auth-эндпоинты (products, cart, orders, bookmarks, login/register/refresh/logout/me). Admin-API туда намеренно не выкладывается.

### Полная документация (включая admin)

Для просмотра admin-контрактов сгенерируйте полный OpenAPI-документ локально:

```bash
npm run docs:generate
```

Результат сохраняется в `docs/openapi-full.json`. Откройте его в любом OpenAPI-viewer'е:

- [Swagger Editor](https://editor.swagger.io/)
- [Redocly](https://redocly.com/redoc)

Файл `docs/openapi-full.json` коммитится в репозиторий, чтобы команда могла пересматривать изменения контрактов в PR.