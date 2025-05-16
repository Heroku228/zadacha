import { PRODUCTS, VALID_KEYS, type ProductKey } from './const.js'
import { discountRules } from './discount.js'

export type DiscountType = {
	finalSum: number
	appliedDiscounts: { id: string; discount: number }[]
}

export class ProductService {
	invalidProducts(productInput: string[]) {
		return productInput
			.filter(p => !VALID_KEYS.includes(p as ProductKey))
	}

	totalSum(products: ProductKey[]) {
		return products.reduce((sum, key) => sum + PRODUCTS[key], 0)
	}

	applyDiscounts(
		products: ProductKey[],
		totalSum: number
	): DiscountType {
		const remainingProducts = [...products]
		const appliedDiscounts: { id: string; discount: number }[] = []
		const { countDuplicate } = this.findDuplicatePairs(remainingProducts)
		let finalSum = totalSum

		const sortedRules = [...discountRules].sort((a, b) => a.priority - b.priority)

		for (const rule of sortedRules) {
			const matched = rule.match(remainingProducts)

			if (matched) {
				const discount = Math.floor(rule.calculate(finalSum, matched))

				// Применяем скидку столько раз - сколько имеется дубликатов
				finalSum -= (discount * countDuplicate)

				appliedDiscounts.push({ id: rule.id, discount: (discount * countDuplicate) })

				for (const p of matched) {
					const index = remainingProducts.indexOf(p)
					if (index !== -1) remainingProducts.splice(index, 1)
				}
			}
		}

		return { finalSum, appliedDiscounts }
	}

	private findDuplicatePairs(products: ProductKey[]) {
		const counts = new Map<string, number>()

		for (const p of products) {
			counts.set(p, (counts.get(p) || 0) + 1)
		}

		const pairs: string[] = []
		let countDuplicate = 0

		for (const [product, count] of counts) {
			countDuplicate = count
			const pairsCount = Math.floor(count / 2)
			for (let i = 0; i < pairsCount; i++) {
				pairs.push(product)
			}
		}

		return { pairs, countDuplicate }
	}
}

