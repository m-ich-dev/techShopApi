import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { fullRegistry, publicRegistry, openApiBaseInfo, PUBLIC_DESCRIPTION } from "./openapi-registry.js";
import { registerAllPaths } from "./register-paths.js";

// Регистрация всех роутов выполняется один раз при первом импорте модуля.
registerAllPaths();

// Тип документа выводим из сигнатуры генератора, чтобы не зависеть
// от пути экспорта OpenAPIObject в транзитивной зависимости openapi3-ts.
type OpenApiDocument = ReturnType<OpenApiGeneratorV3["generateDocument"]>;

// Описания тегов задаются при генерации (registerTag недоступен в v9.0.0).
const TAG_DEFINITIONS = [
    { name: "store", description: "Storefront API" },
    { name: "auth", description: "Authentication" },
    { name: "admin", description: "Admin API" },
];

function build(registry: typeof publicRegistry, description: string): OpenApiDocument {
    const generator = new OpenApiGeneratorV3(registry.definitions);
    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            title: openApiBaseInfo.title,
            version: openApiBaseInfo.version,
            description,
        },
        servers: openApiBaseInfo.servers,
        tags: TAG_DEFINITIONS,
    });
}

// Публичный документ: store + auth. Отдаётся на GET /api/v1/docs.
export function generatePublicDocument(): OpenApiDocument {
    return build(publicRegistry, PUBLIC_DESCRIPTION);
}

// Полный документ: все роуты, включая admin.
// Генерируется локально через npm run docs:generate, не публикуется на сервере.
export function generateFullDocument(): OpenApiDocument {
    return build(fullRegistry, openApiBaseInfo.description);
}