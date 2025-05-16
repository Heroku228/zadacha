export const PRODUCTS = {
	A: 745,
	B: 312,
	C: 980,
	D: 154,
	E: 601,
	F: 438,
	G: 823,
	H: 207,
	I: 399,
	J: 650,
	K: 512,
	L: 278,
	M: 902,
} as const


export type ProductKey = keyof typeof PRODUCTS
export const VALID_KEYS = Object.keys(PRODUCTS) as ProductKey[]

