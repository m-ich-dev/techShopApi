export const ROLES = {
    'root': 0,
    'admin': 1,
    'user': 2,
    'guest': 99,
} as const;

export type TRoles = typeof ROLES[keyof typeof ROLES];