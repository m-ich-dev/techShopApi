import z from "zod";


export const REQUEST_RULES = {
    title: (min = 2) => z.string(REQUEST_ERRORS.invalidString).min(min, REQUEST_ERRORS.tooShort).trim(),
    deletedAt: () => z.date(REQUEST_ERRORS.invalidDate).nullish(),
    number: () => z.coerce.number().refine(v => !Number.isNaN(v), REQUEST_ERRORS.invalidNumber),
    toPrice: () => z.coerce.number(REQUEST_ERRORS.invalidNumber)
        .multipleOf(2, REQUEST_ERRORS.invalidPrecision)
        .nonnegative(REQUEST_ERRORS.negativeNotAllowed)
} as const;


export const REQUEST_ERRORS = {
    invalidString: 'The value must be a string',
    invalidNumber: 'The value must be a number',
    invalidDate: 'The value must be a date',

    tooShort: 'The value is too short',
    tooLarge: 'The value is too large',
    negativeNotAllowed: 'The value must be a positive number',
    invalidPrecision: 'The number precision has been exceeded',
    invalidReference: 'The referenced record was not found',

} as const;