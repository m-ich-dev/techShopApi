import { TInsertCategory } from "../../../boot/database/schemas/category.schema";
import slugify from "../../../boot/utils/slugify";

const categoryTitles = ['Смартфоны', 'Наушники', 'Планшеты', 'Часы'];

export const categorySeedData: TInsertCategory[] = categoryTitles.map(c => ({ title: c, slug: slugify(c) }));