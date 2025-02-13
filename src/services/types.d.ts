export type LiteralValues<T> = {
    [K in keyof T]: T[K] extends string | number | boolean ? T[K] : never;
}[keyof T];