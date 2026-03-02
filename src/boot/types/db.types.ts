type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type Requestable<T, P extends keyof T> = Prettify<Omit<T, P> & {
    [K in P]?: T[K]
}>