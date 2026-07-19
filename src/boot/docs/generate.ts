import { mkdir, writeFile } from "fs/promises";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
// side-effect: расширяет zod прототипом .openapi() до импорта любых схем приложения
import "@/boot/docs/openapi-registry.js";
// Реестр путей сейчас пустой — реальная регистрация роутов выполняется
// на следующем шаге (документирование по модулям). Пока генератор отдаёт
// валидный "пустой" документ с инфой о проекте.
import { generateFullDocument } from "./openapi-generator.js";
import logger from "@/boot/loggers/logger.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../../../docs/openapi-full.json");

async function main(): Promise<void> {
    const document = generateFullDocument();

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, JSON.stringify(document, null, 2), "utf8");

    logger.info({ path: OUTPUT_PATH }, "OpenAPI full document generated");
}

main().catch((error) => {
    logger.error({ err: error }, "Failed to generate OpenAPI document");
    process.exitCode = 1;
});