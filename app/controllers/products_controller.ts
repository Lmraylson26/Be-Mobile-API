import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class ProductsController {
  async index({ response }: HttpContext) {
    const products = await Product.query()
      .where('isDeleted', false)
      .select('name', 'price', 'description')
      .orderBy('name')

    return response.status(200).json({
      data: products,
    })
  }

  async show({ params, response }: HttpContext) {
    const { name, price, description, isDeleted } = await Product.findOrFail(params.id)

    const formattedProduct = {
      name,
      price,
      description,
      isDeleted,
    }

    return response.status(200).json({
      data: formattedProduct,
    })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'price', 'description'])
    const product = await Product.create(data)

    return response.status(201).json({
      product,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    const data = request.only(['name', 'price', 'description'])

    product.merge(data)
    await product.save()

    return response.status(200).json({
      product,
    })
  }

  async delete({ params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    product.isDeleted = true
    await product.save()

    return response.status(204).json({
      message: 'Product deleted',
      product,
    })
  }
}
