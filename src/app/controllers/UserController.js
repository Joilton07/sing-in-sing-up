const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../../config/auth')

const User = require('../models/user')

class UserController {
  async createUser (req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'E-mail já existente' })
    }

    const user = await User.create(req.body)

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      phones: user.phones,
      lastLogin: user.lastLogin,
      token: user.token
    })
  }

  async login (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ error: 'Usuário e/ou senha inválidos' })
    }

    const passwordCorrect = await bcrypt.compare(password, user.password)

    if (!passwordCorrect) {
      return res.status(401).json({ error: 'Usuário e/ou senha inválidos' })
    }

    const { id, name, userEmail = email, phones, lastLogin, createdAt, updatedAt, token } = user

    return res.status(201).json({
      id,
      name,
      userEmail,
      phones,
      lastLogin,
      createdAt,
      updatedAt,
      token: jwt.sign({ id, token }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })
  }

  async showUser (req, res) {
    const { id } = req.params

    const user = await User.findById(id)

    const { name, email, phones, lastLogin, createdAt, updatedAt, token } = user

    return res.status(201).json({
      id: user.id,
      name,
      email,
      phones,
      lastLogin,
      createdAt,
      updatedAt,
      token: jwt.sign({ id, token }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })
  }
}

module.exports = UserController
