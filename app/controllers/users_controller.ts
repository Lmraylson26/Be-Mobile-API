import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async signup({ request, response }: HttpContext) {
    const body = request.body()
    const user = await User.create(body)

    return response.status(201).json({
      message: 'User created successfully',
      data: user,
    })
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.all()

    const user = await User.verifyCredentials(email, password)
    const validate = await auth.use('jwt').generate(user)

    return response.status(200).json({
      validate,
    })
  }
}
