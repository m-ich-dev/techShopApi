import { z } from "zod";
import { extendZodWithOpenApi, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createRequire } from "module";

// ESM-интероп: package.json читается через require, т.к. resolveJsonModule
// не включён в tsconfig, а JSON-импорт нарушил бы verbatimModuleSyntax.
const require = createRequire(import.meta.url);
const pkg = require("../../../package.json") as { name: string; version: string; description: string };

// Расширяем прототип zod методом .openapi().
// Выполняется один раз при первом импорте этого модуля.
// Чтобы гарантировать применение ДО загрузки любой zod-схемы приложения,
// этот модуль подключается side-effect-импортом первой строкой в src/index.ts.
extendZodWithOpenApi(z);

const APP_PORT = process.env.APP_PORT ?? "3030";

// Базовый внешний URL приложения.
// В production указывает на публичный домен (например, https://public.url),
// в development не задаётся — тогда servers строятся от localhost:APP_PORT.
// По паттерну окружения, используемому в logger.config.ts/response.formatter.ts.
const APP_PUBLIC_URL = process.env.APP_PUBLIC_URL;

const isDevelopment = process.env.NODE_ENV === "development";

const baseUrl = isDevelopment || !APP_PUBLIC_URL
    ? `http://localhost:${APP_PORT}`
    : APP_PUBLIC_URL;

const servers = [{ url: `${baseUrl}/api/v1` }];

export const openApiBaseInfo = {
    title: pkg.name,
    version: pkg.version,
    description: pkg.description,
    servers,
};

// Публичный документ: только store + auth.
export const publicRegistry = new OpenAPIRegistry();

// Полный документ: все роуты, включая admin.
export const fullRegistry = new OpenAPIRegistry();

export const PUBLIC_DESCRIPTION = `Store- и auth-эндпоинты доступны для тестирования — зарегистрируйтесь через /auth/register и попробуйте cart/orders/bookmarks от своего аккаунта. Admin-API не публикуется здесь намеренно (внутренние ручки, защищены ролью) — полный список маршрутов включая admin смотрите в репозитории или сгенерируйте полную документацию локально (см. README).`;