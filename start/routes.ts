/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ProductsController = () => import('#controllers/products_controller')
const UsersController = () => import('#controllers/users_controller')
const ClientsController = () => import('../app/controllers/clients_controller.js')

router.post('signup', [UsersController, 'signup'])
router.post('login', [UsersController, 'login'])

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [ClientsController, 'index'])

        router.post('/', [ClientsController, 'store'])
        router.put('/:id', [ClientsController, 'update'])
        router.delete('/:id', [ClientsController, 'delete'])
      })
      .prefix('clients')

    router
      .group(() => {
        router.get('/', [ProductsController, 'index'])

        router.post('/', [ProductsController, 'store'])
        router.put('/:id', [ProductsController, 'update'])
        router.delete('/:id', [ProductsController, 'delete'])
      })
      .prefix('products')
  })
  .use(middleware.auth())
