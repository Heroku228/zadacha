import readline from 'readline'
import { ProductKey, PRODUCTS } from './const.js'
import { ProductService } from './product.service.js'

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

for (const [key, price] of Object.entries(PRODUCTS)) {
	console.log(`${key} : ${price}`)
}

const productService = new ProductService()

function askForProducts() {
	rl.question('Введите продукты через пробел (например: A B C A B)\n', answer => {
		const productInput = answer
			.trim()
			.toUpperCase()
			.split(/\s+/) as ProductKey[]

		const trimmed = answer.trim().toUpperCase()

		if (trimmed === 'EXIT') {
			console.log('Выход из программы.')
			rl.close()
			process.exit(0)
		}

		const invalid = productService.invalidProducts(productInput)

		if (invalid.length > 0) {
			console.error(`[ERROR 404] Найдены недопустимые продукты: ${invalid}`)
			return
		}

		console.log('Выбранные продукты -> ', productInput)

		const totalSum = productService.totalSum(productInput)
		console.log('total sum: ', totalSum)
		const result = productService.applyDiscounts(productInput, totalSum)

		result.appliedDiscounts.length === 0
			? console.log('Скидка для такого набора товаров отсутствует')
			: console.log('Скидка: ', result.appliedDiscounts)


		console.log('Результат: ', result.finalSum)

		askForProducts()
	})
}

askForProducts()
