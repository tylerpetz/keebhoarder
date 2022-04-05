import express, { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
dotenv.config()

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

interface IUserRequest extends Request {
  user?: any
}

const authMiddleware = (
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
const getFirstRecordFromUser = (req: IUserRequest, model: any) =>
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
  })

// Auth
app.post('/register', async (req, res) => {
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(req.body.password, salt)

  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password,
      ...(req.body.name
        ? {
            profile: {
              create: {
                name: req.body.name,
              },
            },
          }
        : {}),
    },
  })

  const token = jwt.sign(
    { id: user.id, role_id: 0 },
    process.env.TOKEN_SECRET || ''
  )

  res.status(200).header('auth-token', token).send({ token })
})
app.post('/login', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  })

  if (user) {
    const validPass = await bcrypt.compare(
      req.body.password,
      user.password || ''
    )
    if (!validPass) {
      return res.status(401).send('No user with these credentials exists.')
    }
    let payload = { id: user.id, role_id: 0 }
    const token = jwt.sign(payload, process.env.TOKEN_SECRET || '')

    return res.status(200).header('auth-token', token).send({ token })
  } else {
    return res.status(401).send('No user with these credentials exists.')
  }
})
app.get('/me', authMiddleware, async (req: IUserRequest, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      profile: true,
    },
  })
  return res.json({
    email: user?.email,
    profile: user?.profile,
  })
})

// Items
app.get('/items', authMiddleware, async (req: IUserRequest, res) => {
  const items = await prisma.item.findMany({
    where: {
      userId: req.user.id,
    },
  })

  res.json(items)
})
app.post('/items', authMiddleware, async (req: IUserRequest, res) => {
  const item = await prisma.item.create({
    data: {
      ...req.body,
      user: {
        connect: {
          id: req.user.id,
        },
      },
    },
  })

  res.json(item)
})
app.get('/items/:id', authMiddleware, async (req: IUserRequest, res) => {
  const item = await getFirstRecordFromUser(req, prisma.item)
  res.json(item)
})
app.put('/items/:id', authMiddleware, async (req: IUserRequest, res) => {
  const item = await getFirstRecordFromUser(req, prisma.item)
  if (item) {
    const updatedItem = await prisma.item.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...req.body,
      },
    })
    res.json(updatedItem)
  }
})
app.delete('/items/:id', authMiddleware, async (req: IUserRequest, res) => {
  const item = await getFirstRecordFromUser(req, prisma.item)
  if (item) {
    await prisma.item.delete({
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json({ deleted: true })
  }
})

// Lists
app.get('/lists', authMiddleware, async (req: IUserRequest, res) => {
  const lists = await prisma.list.findMany({
    where: {
      userId: req.user.id,
    },
  })

  res.json(lists)
})
app.post('/lists', authMiddleware, async (req: IUserRequest, res) => {
  const list = await prisma.list.create({
    data: {
      ...req.body,
      user: {
        connect: {
          id: req.user.id,
        },
      },
    },
  })

  res.json(list)
})
app.get('/lists/:id', authMiddleware, async (req: IUserRequest, res) => {
  const list = await getFirstRecordFromUser(req, prisma.list)
  if (list) {
    res.json(list)
  }
})
app.put('/lists/:id', authMiddleware, async (req: IUserRequest, res) => {
  const list = await getFirstRecordFromUser(req, prisma.list)
  if (list) {
    const updatedList = await prisma.list.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...req.body,
      },
    })
    res.json(updatedList)
  }
})
app.delete('/lists/:id', authMiddleware, async (req: IUserRequest, res) => {
  const list = await getFirstRecordFromUser(req, prisma.list)
  if (list) {
    await prisma.list.delete({
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json({ deleted: true })
  }
})

export default {
  path: '/api',
  handler: app,
}
