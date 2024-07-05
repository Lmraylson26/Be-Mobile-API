import Sale from '#models/sale'
import Product from '#models/product'
import ProductSale from '#models/product_sales'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class SalesController {
  async store({ request, response }: HttpContext) {
    const { clientId, products } = request.only(['clientId', 'products'])

    const sale = new Sale()
    sale.clientId = clientId
    sale.saleDate = DateTime.now()
    await sale.save()

    for (const productData of products) {
      const product = await Product.findOrFail(productData.productId)
      const totalPrice = product.price * productData.quantity

      await ProductSale.create({
        productId: product.id,
        saleId: sale.id,
        quantity: productData.quantity,
        unitPrice: product.price,
        totalPrice: totalPrice,
      })
    }

    return response.status(200).json({
      sale,
    })
  }
}
