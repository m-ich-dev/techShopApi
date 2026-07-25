// Централизованная точка сборки: регистрирует все роуты в обоих registry.
// publicRegistry — store + auth (публичный Swagger).
// fullRegistry — все роуты, включая admin (локальная полная документация).
import { publicRegistry, fullRegistry } from "./openapi-registry.js";
import { registerAuthPaths } from "./paths/auth.paths.js";
import { registerProductPaths } from "./paths/product.paths.js";
import { registerCartPaths } from "./paths/cart.paths.js";
import { registerOrderPaths } from "./paths/order.paths.js";
import { registerBookmarkPaths } from "./paths/bookmark.paths.js";
import { registerCategoryPaths } from "./paths/category.paths.js";


export function registerAllPaths(): void {
    // auth — публичный модуль, регистрируется в обоих registry.
    registerAuthPaths(publicRegistry);
    registerAuthPaths(fullRegistry);

    // products/catalog — публичный модуль, регистрируется в обоих registry.
    registerProductPaths(publicRegistry);
    registerProductPaths(fullRegistry);

    // cart — публичный модуль (требует аутентификации), регистрируется в обоих registry.
    registerCartPaths(publicRegistry);
    registerCartPaths(fullRegistry);

    // orders — публичный модуль (требует аутентификации), регистрируется в обоих registry.
    registerOrderPaths(publicRegistry);
    registerOrderPaths(fullRegistry);

    // bookmarks — публичный модуль (требует аутентификации), регистрируется в обоих registry.
    registerBookmarkPaths(publicRegistry);
    registerBookmarkPaths(fullRegistry);

    // categories — публичный модуль, регистрируется в обоих registry.
    registerCategoryPaths(publicRegistry);
    registerCategoryPaths(fullRegistry);

    // Остальные admin-модули будут добавлены здесь на следующих шагах.
}
