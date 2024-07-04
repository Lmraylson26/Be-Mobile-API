import type { HttpContext } from '@adonisjs/core/http'
import Sale from '#models/sale'
import { DateTime } from 'luxon'

export default class SalesController {
  async store({ request, response }: HttpContext) {
    const { clientId, products } = request.only(['clientId', 'products'])
    
    for (const product of products) {
      await sale.related('products').attach({
        [product.id]: {
          quantity: product.quantity,
          unit_price: product.unit_price,
        },
      })
    }
    
    sale.totalPrice = await Database.from('product_sales')
    .where('sale_id', sale.id)
    .sum('quantity * unit_price as totalPrice')
    await sale.save()
    
    const sale = await Sale.create({ clientId, saleDate: DateTime.now() })
    return response.created(sale)
  }
}
