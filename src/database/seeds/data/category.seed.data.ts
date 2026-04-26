import type { TInsertCategory } from "@/boot/database/schemas/category.schema.js";
import slugify from "@/boot/utils/slugify.js";


const categoryTitles = ['Смартфоны', 'Наушники', 'Планшеты', 'Часы'];

export const categorySeedData: TInsertCategory[] = categoryTitles.map(c => ({ title: c, slug: slugify(c) }));