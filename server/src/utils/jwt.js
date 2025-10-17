import jwt from 'jsonwebtoken'

const { JWT_SECRET = 'dev_secret', JWT_EXPIRES_IN = '15m', JWT_REFRESH_EXPIRES_IN = '7d' } = process.env

export function signAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function signRefreshToken(payload) {
  return jwt.sign({ ...payload, typ: 'refresh' }, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN })
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET)
}
