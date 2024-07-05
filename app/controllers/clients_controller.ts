import type { HttpContext } from '@adonisjs/core/http'
import Client from '#models/client'

export default class ClientsController {
  async index({ response }: HttpContext) {
    const clients = await Client.query().orderBy('id')

    return response.status(200).json({
      data: clients,
    })
  }

  async show({ params, response }: HttpContext) {
    const client = await Client.query()
      .where('id', params.id)
      .preload('sales', (saleQuery) => {
        saleQuery.orderBy('sale_date', 'desc')
      })
      .firstOrFail()

    return response.status(200).json({
      client,
    })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'cpf', 'userId'])
    const client = await Client.create(data)

    return response.status(201).json({
      client,
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
