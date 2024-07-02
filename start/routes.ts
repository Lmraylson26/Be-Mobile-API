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
      })
      .prefix('clients')
  })
  .use(middleware.auth())
