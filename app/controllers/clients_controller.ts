import type { HttpContext } from '@adonisjs/core/http'
import Client from '#models/client'

export default class ClientsController {
  async index({ response }: HttpContext) {
    const clients = await Client.query()
      .preload('user', (userQuery) => {
        userQuery.select('name')
      })
      .orderBy('id')

    const formattedClients = clients.map((client) => ({
      clientName: client.name,
      clientCpf: client.cpf,
      vendor: client.user.name,
    }))

    return response.status(200).json({
      data: formattedClients,
    })
  }

  async show({ params, response }: HttpContext) {
    const client = await Client.query()
      .where('id', params.id)
      .preload('sales', (saleQuery) => {
        saleQuery.orderBy('sale_date', 'desc').preload('products', (productQuery) => {
          productQuery.pivotColumns(['quantity', 'unit_price', 'total_price'])
        })
      })
      .preload('user', (userQuery) => {
        userQuery.select('name')
      })
      .firstOrFail()

    const formattedSales = client.sales.map((sale) => {
      let totalPrice = 0
      const formattedProducts = sale.products.map((product) => {
        const totalPricePerProduct =
          product.$extras.pivot_quantity * product.$extras.pivot_unit_price
        totalPrice += totalPricePerProduct
        return {
          productName: product.name,
          quantity: product.$extras.pivot_quantity,
          unitPrice: product.$extras.pivot_unit_price,
          totalPricePerProduct: totalPricePerProduct.toFixed(2),
        }
      })

      return {
        saleId: sale.id,
        saleDate: sale.saleDate,
        products: formattedProducts,
        totalPrice: totalPrice.toFixed(2),
      }
    })

    const formattedClient = {
      clientName: client.name,
      clientCpf: client.cpf,
      vendor: client.user.name,
      sales: formattedSales,
    }

    return response.status(200).json({
      data: formattedClient,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    const data = request.only(['name', 'cpf', 'userId'])

    client.merge(data)
    await client.save()

    return response.status(200).json({
      client,
    })
  }

  async delete({ params, response }: HttpContext) {
    const client = await Client.findOrFail(params.id)

    await client.delete()

    return response.status(204).json({
      message: 'Client deleted',
    })
  }
}
