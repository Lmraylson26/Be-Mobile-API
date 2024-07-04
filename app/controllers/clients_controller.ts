import type { HttpContext } from '@adonisjs/core/http'
import Client from '#models/client'
import Sale from '#models/sale'
import { DateTime } from 'luxon'

export default class ClientsController {
  async index({ response }: HttpContext) {
    const clients = await Client.query().orderBy('id')

    return response.status(200).json({
      data: clients,
    })
  }

  async show({ params, request, response }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    // const { month, year } = request.qs()

    // let salesQuery = Sale.query().where('clientId', params.id).orderBy('saleDate', 'desc')

    // if (month && year) {
    //   const startDate = DateTime.fromObject({ year, month, day: 1 })
    //   const endDate = startDate.plus({ months: 1 })
    //   salesQuery = salesQuery.whereBetween('saleDate', [startDate.toISO(), endDate.toISO()])
    // }

    // const sales = await salesQuery
    // client.sales = sales

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
