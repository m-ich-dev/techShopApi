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

// Ограничение: servers формируются из APP_PORT.
// Если приложение окажется за reverse-proxy/докером с другим внешним портом,
// эту строку нужно поправить или вынести base URL в отдельную env-переменную.
const servers = [{ url: `http://localhost:${APP_PORT}/api/v1` }];

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