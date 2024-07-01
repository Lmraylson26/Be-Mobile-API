import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'

export default class UsersController {
  async siginup({ request, response }: HttpContext) {
    const body = request.body()
    const user = await User.create(body)

    response.status(201).json({
      message: 'User created successfully',
      data: user,
    })
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.query().where('email', email).firstOrFail()
    if (!(await hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    }

    const token = await auth.use('api').generate(user)
    return response.json({ token })
  }
}
