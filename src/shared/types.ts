export type Lang = "en" | "uk";

export type MakeRequired<T, K extends keyof T> = Omit<T, K> &
	Required<Pick<T, K>>;
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
	Partial<Pick<T, K>>;
// make all properties of T optional except for those in K
export type OnlyRequire<T, K extends keyof T> = Partial<Omit<T, K>> &
	Required<Pick<T, K>>;
export type ToString<T> = T extends readonly (infer U)[] ? U : T;
