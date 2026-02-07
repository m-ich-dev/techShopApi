export function strToCamel(str: string): string {
    if (!str.includes('_')) {
        return str;
    }
    return str.toLowerCase().replace(/_+$/g, '').replace(/_+([a-z])/gi, (_, char) => char.toUpperCase());
}

export function strToSnake(str: string): string {
    return str.replace(/[A-Z]/g, (letter, index) =>
        index === 0 ? letter.toLowerCase() : `_${letter.toLowerCase()}`
    );
}

//???? Типизация
export function toCamelSnake(obj: object, flag: 'snake' | 'camel'): object {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => toCamelSnake(item, flag));
    }
    if (obj instanceof Date) {
        return obj;
    }

    const convertFn = flag === 'camel' ? strToCamel : strToSnake;

    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [
        convertFn(key),
        typeof value === 'object' && value !== null ? toCamelSnake(value, flag) : value]));


}