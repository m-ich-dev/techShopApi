import { TInsertAttribute } from "../../../boot/database/schemas/attribute.schema.js";
import slugify from "../../../boot/utils/slugify.js";

const attrs = [
    // --- ОБЩИЕ АТРИБУТЫ ---
    { title: 'Дата выхода', filterType: '' },
    { title: 'Назначение', filterType: 'checkbox' },
    { title: 'Цвет', filterType: 'checkbox' },
    { title: 'Пыле-, влаго-, ударопрочность', filterType: 'checkbox' },
    { title: 'Материал корпуса', filterType: 'checkbox' },
    { title: 'Вес', filterType: 'range' },

    // --- ГАБАРИТЫ ---
    { title: 'Длина', filterType: 'range' },
    { title: 'Ширина', filterType: 'range' },
    { title: 'Толщина', filterType: 'range' },
    { title: 'Размер корпуса/ремешка', filterType: 'checkbox' }, // Для часов

    // --- ПАМЯТЬ ---
    { title: 'Память', filterType: 'range' },
    { title: 'Оперативная память', filterType: 'checkbox' },
    { title: 'Поддержка карт памяти', filterType: 'checkbox' },
    { title: 'Максимальная емкость карты памяти', filterType: '' },

    // --- ЭКРАН ---
    { title: 'Экран', filterType: 'checkbox' },
    { title: 'Размер экрана', filterType: 'range' },
    { title: 'Разрешение экрана', filterType: '' },
    { title: 'Частота обновления экрана', filterType: 'checkbox' },
    { title: 'Технология экрана', filterType: 'checkbox' },
    { title: 'Количество цветов экрана', filterType: '' },
    { title: 'Разрешающая способность экрана', filterType: '' },
    { title: 'Соотношение сторон', filterType: '' },
    { title: 'Форма экрана', filterType: 'checkbox' }, // Для часов (круглый/квадратный)

    // --- КАМЕРЫ ---
    { title: 'Количество модулей камеры', filterType: 'checkbox' },
    { title: 'Модули камер', filterType: '' },
    { title: 'Цифровой зум', filterType: '' },
    { title: 'Диафрагма основной камеры', filterType: '' },
    { title: 'Макс. количество кадров в секунду', filterType: '' },
    { title: 'Фронтальная камера', filterType: '' },
    { title: 'Расположение фронтальной камеры', filterType: '' },
    { title: 'Диафрагма фронтальной камеры', filterType: '' },
    { title: 'Макс. разрешение видео фронтальной камеры', filterType: '' },
    { title: 'Количество точек матрицы основной камеры', filterType: '' },
    { title: 'Характеристики блока камер', filterType: '' },
    { title: 'Максимальное разрешение видео', filterType: '' },

    // --- СВЯЗЬ И ИНТЕРФЕЙСЫ ---
    { title: 'Bluetooth', filterType: 'checkbox' },
    { title: 'Аудиокодеки Bluetooth', filterType: 'checkbox' },
    { title: 'Аудиовыход', filterType: 'checkbox' },
    { title: 'Wi-Fi', filterType: 'checkbox' },
    { title: 'NFC', filterType: 'checkbox' }, // Для оплаты часами/телефонами
    { title: 'Навигация', filterType: 'checkbox' }, // GPS, ГЛОНАСС и т.д.
    { title: 'Разъём подключения', filterType: 'checkbox' },
    { title: 'Количество физических SIM-карт', filterType: 'checkbox' },
    { title: 'Формат SIM-карты', filterType: 'checkbox' },
    { title: 'Поддержка eSIM', filterType: 'checkbox' }, // Для часов и новых смартфонов

    // --- ПИТАНИЕ ---
    { title: 'Тип аккумулятора', filterType: '' },
    { title: 'Емкость аккумулятора', filterType: 'range' },
    { title: 'Конструкция аккумулятора', filterType: '' },
    { title: 'Мощность зарядки', filterType: 'range' },
    { title: 'Беспроводная зарядка', filterType: 'checkbox' },
    { title: 'Время работы', filterType: 'range' },
    { title: 'Время работы с зарядным кейсом', filterType: 'range' },

    // --- ЖЕЛЕЗО И ОС ---
    { title: 'Процессор', filterType: 'checkbox' },
    { title: 'Платформа', filterType: '' },
    { title: 'Тактовая частота процессора', filterType: '' },
    { title: 'Количество ядер', filterType: 'checkbox' },
    { title: 'Микроархитектура ЦПУ', filterType: '' },
    { title: 'Разрядность процессора', filterType: '' },
    { title: 'Техпроцесс', filterType: '' },
    { title: 'Графический ускоритель', filterType: '' },
    { title: 'Операционная система', filterType: 'checkbox' },
    { title: 'Версия ОС на момент выход', filterType: 'checkbox' },
    { title: 'Оболочка', filterType: 'checkbox' },

    // --- КОРПУС И ДАТЧИКИ ---
    { title: 'Материал граней', filterType: '' },
    { title: 'Материал задней крышки', filterType: '' },
    { title: 'Расположение сканера отпечатка пальца', filterType: 'checkbox' },
    { title: 'Датчики', filterType: 'checkbox' }, // Акселерометр, Гироскоп и т.д.
    { title: 'Функции мониторинга', filterType: 'checkbox' }, // Пульс, Кислород, Сон (для часов)

    // --- СПЕЦИФИКАЦИИ НАУШНИКОВ ---
    { title: 'Тип наушников', filterType: 'checkbox' },
    { title: 'Тип крепления', filterType: 'checkbox' },
    { title: 'Активное шумоподавление (ANC)', filterType: 'checkbox' },
    { title: 'Микрофон', filterType: 'checkbox' },
    { title: 'Нижняя граница частотного диапазона', filterType: 'range' },
    { title: 'Верхняя граница частотного диапазона', filterType: 'range' },
    { title: 'Импеданс', filterType: 'range' },
    { title: 'Тип беспроводного интерфейса', filterType: 'checkbox' },
];

export const attributeSeedData: TInsertAttribute[] = attrs.map(a =>
    ({ title: a.title, filterType: a.filterType, slug: slugify(a.title) }));