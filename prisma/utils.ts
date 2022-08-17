import express, { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'


export interface IUserRequest extends Request {
  user?: any
}

export const authMiddleware = (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization
  if (!token)
    return res.status(401).send('Access Denied / Unauthorized request')

  try {
    token = token.split(' ')[1]

    if (token === 'null' || !token)
      return res.status(401).send('Unauthorized request')

    const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET || '')
    if (!verifiedUser) return res.status(401).send('Unauthorized request')

    req.user = verifiedUser
    next()
  } catch (error) {
    res.status(400).send('Invalid Token')
  }
}

export const getFirstRecordFromUser = (req: IUserRequest, model: any, args: any = {}) =>
  model.findFirst({
    where: {
      AND: {
        userId: {
          equals: req.user.id,
        },
        id: {
          equals: req.params.id,
        },
      },
    },
    ...args
  })