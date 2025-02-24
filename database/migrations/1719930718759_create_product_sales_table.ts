import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'product_sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
      table.integer('sale_id').unsigned().references('id').inTable('sales').onDelete('CASCADE')
      table.unique(['product_id', 'sale_id'])
      table.integer('quantity').unsigned().notNullable()
      table.decimal('unit_price').notNullable()
      table.decimal('total_price').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
