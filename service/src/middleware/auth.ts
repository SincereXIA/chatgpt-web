import { isNotEmptyString } from '../utils/is'
import { getUserRepository } from '../data/user'

async function check_token(token) {
  let username = ''
  let password = ''
  try {
    const base64 = token
    // decode base64
    const decoded = Buffer.from(base64, 'base64').toString('utf-8')
    // get username and password
    username = decoded.split(':')[0]
    password = decoded.split(':')[1]
    if (!username || !password)
      throw new Error('Error: 无访问权限 | No access rights')
  }
  catch (error) {
    throw new Error('Error: 无访问权限 | No access rights')
  }
  // check username and password
  const repo = await getUserRepository()
  const user = await repo.findOne({ where: { name: username } })
  if (!user || user.password !== password)
    throw new Error('Error: 无访问权限 | No access rights')
}

const user_auth = async (req, res, next) => {
  // get base64 from bearer
  const Authorization = req.header('Authorization')
  try {
    const base64 = Authorization.replace('Bearer ', '')
    // decode base64
    check_token(base64)
  }
  catch (error) {
    res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
  }
  next()
}

const auth = async (req, res, next) => {
  const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY
  if (isNotEmptyString(AUTH_SECRET_KEY)) {
    try {
      const Authorization = req.header('Authorization')
      if (!Authorization || Authorization.replace('Bearer ', '').trim() !== AUTH_SECRET_KEY.trim())
        throw new Error('Error: 无访问权限 | No access rights')
      next()
    }
    catch (error) {
      res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
    }
  }
  else {
    next()
  }
}

export { auth, check_token, user_auth }
