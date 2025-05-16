import { ProductKey } from './const.js'

interface DiscountRule {
	id: string
	priority: number
	match: (products: ProductKey[]) => ProductKey[] | null
	calculate: (sum: number, matchedProducts: ProductKey[]) => number
}

const isGroupDiscountValid = (products: ProductKey[]) => {
	return !products.some(p => ['A', 'C'].includes(p))
}

export const discountRules: DiscountRule[] = [
	{
		id: 'AandB',
		priority: 1,
		match: products => {
			if (products.includes('A') && products.includes('B')) return ['A', 'B']
			return null
		},
		calculate: sum => sum * 0.1,
	},
	{
		id: 'DandE',
		priority: 2,
		match: products => {
			if (products.includes('D') && products.includes('E')) return ['D', 'E']
			return null
		},
		calculate: sum => sum * 0.06,
	},
	{
		id: 'EandFandG',
		priority: 3,
		match: products => {
			if (products.includes('E') && products.includes('F') && products.includes('G')) return ['E', 'F', 'G']
			return null
		},
		calculate: sum => sum * 0.03,
	},
	{
		id: 'AandSomeFromKLM',
		priority: 4,
		match: products => {
			if (!products.includes('A')) return null
			const second = products.find(p => ['K', 'L', 'M'].includes(p))
			if (second) return ['A', second]
			return null
		},
		calculate: sum => sum * 0.05,
	},
	{
		id: 'GROUP_3',
		priority: 12,
		match: products => {
			const unique = [...new Set(products)]
			if (unique.length >= 3 && isGroupDiscountValid(unique)) return unique.slice(0, 3)
			return null
		},
		calculate: sum => sum * 0.05,
	},
	{
		id: 'GROUP_4',
		priority: 11,
		match: products => {
			const unique = [...new Set(products)]
			if (unique.length >= 4 && isGroupDiscountValid(unique)) return unique.slice(0, 4)
			return null
		},
		calculate: sum => sum * 0.1,
	},
	{
		id: 'GROUP_5',
		priority: 10,
		match: products => {
			const unique = [...new Set(products)]
			if (unique.length >= 5 && isGroupDiscountValid(unique)) return unique.slice(0, 5)
			return null
		},
		calculate: sum => sum * 0.2,
	},
]
