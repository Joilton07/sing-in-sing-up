const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const authConfig = require('../../config/auth')

module.exports = async (req, res, next) => {
  // validação do formato do token

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Não autorizado' })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Não autorizado' })
  }

  // Verificando o token

  try {
    const { id } = await promisify(jwt.verify)(
      token,
      authConfig.secret
    )

    req.user = { id }

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Sessão inválida', description: error.name })
  }
}
