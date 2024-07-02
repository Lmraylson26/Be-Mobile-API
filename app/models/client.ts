import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Adress from '#models/adress'
import Phone from '#models/phone'
import Sale from '#models/sale'

export default class Client extends BaseModel {
  static table = 'clients'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Adress)
  declare adresses: HasMany<typeof Adress>

  @hasMany(() => Phone)
  declare phones: HasMany<typeof Phone>

  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>
}
