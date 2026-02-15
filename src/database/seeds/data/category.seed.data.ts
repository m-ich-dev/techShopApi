import slugify from "../../../boot/utils/slugify";
import { TInsertCategory } from "../../../records/category.record";

const categoryTitles = ['Смартфоны', 'Наушники', 'Планшеты', 'Часы'];

export const categorySeedData: TInsertCategory[] = categoryTitles.map(c => ({ title: c, slug: slugify(c) }));