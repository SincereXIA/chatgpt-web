import { isNotEmptyString } from '../utils/is'

const user_auth = async (req, res, next) => {
  // get base64 from bearer
  const Authorization = req.header('Authorization')
  let username = ''
  let password = ''
  try {
    const base64 = Authorization.replace('Bearer ', '')
    // decode base64
    const decoded = Buffer.from(base64, 'base64').toString('utf-8')
    // get username and password
    username = decoded.split(':')[0]
    password = decoded.split(':')[1]
    if (!username || !password)
      throw new Error('Error: 无访问权限 | No access rights')
  }
  catch (error) {
    res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
  }
  // check username and password
  if (username !== 'root' || password !== '981007')
    throw new Error('Error: 无访问权限 | No access rights')

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

export { auth, user_auth }
