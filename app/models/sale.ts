import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Client from '#models/client'
import Product from '#models/product'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare clientId: number

  @column()
  declare totalPrice: number

  @column.dateTime()
  declare saleDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @manyToMany(() => Product, {
    pivotTable: 'product_sales',
    pivotColumns: ['quantity', 'unit_price', 'total_price'],
  })
  declare products: ManyToMany<typeof Product>
}
