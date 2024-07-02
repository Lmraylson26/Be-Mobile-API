import type { HttpContext } from '@adonisjs/core/http'
import Client from '#models/client'

export default class ClientsController {
  async index({ response }: HttpContext) {
    const clients = await Client.all()
    response.status(200).json({
      data: clients,
    })
  }

  async show({ params, response }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    await client.load('sales', (salesQuery) => {
      salesQuery.orderBy('created_at', 'desc')
    })
    response.json(client)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'cpf', 'address', 'phone'])
    const client = await Client.create(data)
    response.status(201).json(client)
  }

  async update({ params, request, response }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    const data = request.only(['name', 'cpf', 'address', 'phone'])
    client.merge(data)
    await client.save()
    response.json(client)
  }

  async destroy({ params, response }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    await client.delete()
    response.status(204)
  }
}
