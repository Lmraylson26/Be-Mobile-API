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

router.post('/signup', [UsersController, 'signup'])
router.post('/login', [UsersController, 'login'])

router.get('/clients', [ClientsController, 'index'])

router
  .get('/', async ({ auth }) => {
    auth.getUserOrFail()
    return {
      hello: 'world',
    }
  })
  .use(middleware.auth())
