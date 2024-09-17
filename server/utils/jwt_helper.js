import jwt from "jsonwebtoken"
import createHttpError from "http-errors"
import client from "./init_redis.js"


function signAccessToken(userId) {
  const payload = {}

  const options = {
    expiresIn: "10s",
    issuer: "tmrs.com",
    audience: userId
  }

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options)
  return accessToken
}


async function signRefreshToken(userId) {
  const payload = {}

  const options = {
    expiresIn: "1m",
    issuer: "tmrs.com",
    audience: userId
  }

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options)
  
  const TTL = {
    EX: 1800000,
  }

  try {
    await client.set(userId, refreshToken, TTL)
    return refreshToken
  } catch (error) {
    console.log(error.message)
    throw createHttpError.InternalServerError()
  }

}


function verifyAccessToken(req, res, next) {
  if (!req.headers['authorization']) {
    return next(createHttpError.Unauthorized())
  }

  const authHeader = req.headers['authorization']
  const token = authHeader.split(" ")[1];                       // assumes the format `Bearer <token>`

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name ==="JsonWebTokenError") {
        return next(createHttpError.Unauthorized())
      } else {
        return next(createHttpError.Unauthorized(err.message))
      }
    }

    req.payload = payload
    next()
  })
}


async function verifyRefreshToken(refreshToken) {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    const userId = decoded.aud;                     // The aud field is often used to store the audience of the token (usually the user ID)

    console.log(userId)

    try {
      const latestRefToken= await client.get(userId)

      if (refreshToken === latestRefToken) {
        return userId;
      }

      throw createHttpError.Unauthorized()
    
    } catch (error) {
      if (error.message === 'Unauthorized') {
        throw createHttpError.Unauthorized()
      } else {
        throw createHttpError.InternalServerError()
      }
    }


  } catch (error) {
    if (error.message === 'Unauthorized') {
      throw createHttpError.Unauthorized()
    } else {
      throw createHttpError.InternalServerError()
    }
  }
}

export {
  signAccessToken, 
  verifyAccessToken, 
  signRefreshToken, 
  verifyRefreshToken
}