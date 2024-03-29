import express, { NextFunction } from 'express'
import upload from 'express-fileupload'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, getFirstRecordFromUser, uploadToS3, IUserRequest, IUploadRequest } from './utils'

dotenv.config()

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(upload())

// Auth
app.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password,
        membership: 'standard',
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
  } catch (err) {
    res.status(500).json({ errors: ['Could not register', err.toString()] })
  }
})
app.post('/login', async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ errors: ['Could not log in'] })
  }
})
app.get('/me', authMiddleware, async (req: IUserRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        profile: true,
      },
    })
    res.status(200).json({
      email: user?.email,
      profile: user?.profile,
    })
  } catch (err) {
    res.status(500).json({ errors: ['Could not find user profile'] })
  }
})
app.put('/me', authMiddleware, async (req: IUserRequest, res, next: NextFunction) => {
  try {
    const profile = await prisma.profile.update({
      where: {
        userId: req.user.id,
      },
      data: {
        theme: req.body?.theme,
      }
    })
    res.status(200).json({
      profile
    })
  } catch (err) {
    next(err)
  }
})
app.get('/clear/user', authMiddleware, async (req: IUserRequest, res) => {
  try {
    await prisma.profile.delete({
      where: {
        userId: req.user.id
      }
    })
    await prisma.user.delete({
      where: {
        id: req.user.id
      }
    })
    res.status(200).json({ deleted: true })
  } catch (err: any) {
    res.status(500).json({ errors: ['Could not delete lists', err.toString()] })
  }
})

// File Upload
app.post('/upload', authMiddleware, async (req: IUploadRequest, res) => {
  try {
    const photoUrls = await uploadToS3(req)  
    res.status(200).json(photoUrls)
  } catch (err: any) {
    res.status(500).json({ errors: [err.toString(), 'Could not upload photo'] })
  }
})

// Photos
app.get('/photos', authMiddleware, async (req: IUserRequest, res) => {
  try {
    const photos = await prisma.photo.findMany({
      skip: Number(req.query.limit) * (Number(req.query.page) - 1),
      take: Number(req.query.limit),
      where: {
        userId: req.user.id,
      }
    })

    const count = await prisma.photo.count({
      where: {
        userId: req.user.id,
      }
    })

    res.status(200).json({ photos, count })
  } catch (err) {
    res.status(500).json({ errors: ['Could not get photos'] })
  }
})
app.post('/photos', authMiddleware, async (req: IUserRequest, res) => {
  try {
    const photo = await prisma.photo.create({
      data: {
        ...req.body,
        user: {
          connect: {
            id: req.user.id,
          },
        },
        ...req.body.list?.id ? {
          list: {
            connect: {
              id: req.body.list?.id,
            },
          }
        } : {},
        ...req.body.item?.id ? {
          item: {
            connect: {
              id: req.body.item?.id,
            },
          }
        } : {},
      },
    })
  
    res.status(200).json(photo)
  } catch (err: any) {
    res.status(500).json({ errors: [err.toString(), 'Could not upload photo'] })
  }
})
app.get('/photos/:id', authMiddleware, async (req: IUserRequest, res) => {
  try {
    const photo = await getFirstRecordFromUser(req, prisma.photo)
    if (photo) {
      res.status(200).json(photo)
    } else {
      throw new Error('Could not find photo')
    }
  } catch (err) {
    res.status(500).json({ errors: ['Could not get photo'] })
  }
})
app.put('/photos/:id', authMiddleware, async (req: IUserRequest, res) => {
  try {
    const photo = await getFirstRecordFromUser(req, prisma.photo)
    if (photo) {
      const updatedPhoto = await prisma.photo.update({
        where: {
          id: req.params.id,
        },
        data: {
          ...req.body,
        },
      })
      res.status(200).json(updatedPhoto)
    } else {
      throw new Error('Could not find photo to update')
    }
  } catch (err) {
    res.status(500).json({ errors: ['Could not update photo'] })
  }
})
app.delete('/photos/:id', authMiddleware, async (req: IUserRequest, res) => {
  try {
    const photo = await getFirstRecordFromUser(req, prisma.photo)
    if (photo) {
      await prisma.photo.delete({
        where: {
          id: req.params.id,
        },
      })
      res.status(200).json({ deleted: true })
    } else {
      throw new Error('Could not find photo to delete')
    }
  } catch (err) {
    res.status(500).json({ errors: ['Could not delete photo'] })
  }
})

// Items
app.get('/items', authMiddleware, async (req: IUserRequest, res) => {
  try {
    const items = await prisma.item.findMany({
      skip: Number(req.query.limit) * (Number(req.query.page) - 1),
      take: Number(req.query.limit),
      where: {
        userId: req.user.id,
      },
      include: {
        list: true
      },
      orderBy: [{
        [`${req.query.field}`]: req.query.type 
      }],
    })
    const count = await prisma.item.count({
      where: {
        userId: req.user.id,
      }
    })

    res.status(200).json({ items, count })
  } catch (err) {
    res.status(500).json({ errors: ['Could not get items'] })
  }
})
app.post('/items', authMiddleware, async (req: IUserRequest, res, next: NextFunction) => {
  try {
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

    res.status(200).json(item)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})
app.get('/items/:id', authMiddleware, async (req: IUserRequest, res) => {
  try {
    const item = await getFirstRecordFromUser(req, prisma.item, {
      include: {
        list: true
      }
    })
    if (item) {
      res.status(200).json(item)
    } else {
      throw new Error('Could not find item')
    }
    
  } catch (err: any) {
    res.status(500).json({ errors: ['Could not find item', err] })
  }
})
app.put('/items/:id', authMiddleware, async (req: IUserRequest, res) => {
  try {
    delete req.body.list
    const item = await getFirstRecordFromUser(req, prisma.item)
    if (item) {
      const updatedItem = await prisma.item.update({
        where: {
          id: req.params.id,
        },
        data: {
          ...req.body,
        },
        include: {
          list: true
        }
      })
      res.status(200).json(updatedItem)
    } else {
      throw new Error('Could not find item to update')
    }
  } catch (err) {
    res.status(500).json({ errors: ['Could not update item'] })
  }
})
app.delete('/items/:id', authMiddleware, async (req: IUserRequest, res) => {
  try {
    const item = await getFirstRecordFromUser(req, prisma.item)
    if (item) {
      await prisma.item.delete({
        where: {
          id: req.params.id,
        },
      })
      res.status(200).json({ deleted: true })
    } else {
      throw new Error('Could not find item to delete')
    }
  } catch (err: any) {
    res.status(500).json({ errors: ['Could not delete item'] })
  }
})
app.get('/clear/items', authMiddleware, async (req: IUserRequest, res) => {
  try {
    await prisma.item.deleteMany({
      where: {
        userId: req.user.id
      },
    })
    res.status(200).json({ deleted: true })
  } catch (err: any) {
    res.status(500).json({ errors: ['Could not delete items'] })
  }
})

// Lists
app.get('/lists', authMiddleware, async (req: IUserRequest, res) => {
  try {
    const lists = await prisma.list.findMany({
      skip: Number(req.query.limit) * (Number(req.query.page) - 1),
      take: Number(req.query.limit),
      where: {
        userId: req.user.id,
      },
      include: {
        items: true,
      },
      orderBy: [{
        [`${req.query.field}`]: req.query.type 
      }],
    })
    const count = await prisma.list.count({
      where: {
        userId: req.user.id,
      }
    })

    res.status(200).json({ lists, count })
  } catch (err) {
    res.status(500).json({ errors: ['Could not get lists'] })
  }
})
app.get('/listnames', authMiddleware, async (req: IUserRequest, res) => {
  try {
    const lists = await prisma.list.findMany({
      where: {
        userId: req.user.id,
      },
    })
    const count = await prisma.list.count({
      where: {
        userId: req.user.id,
      }
    })

    res.status(200).json({ lists, count })
  } catch (err) {
    res.status(500).json({ errors: ['Could not get lists'] })
  }
})
app.post('/lists', authMiddleware, async (req: IUserRequest, res) => {
  try {
    const list = await prisma.list.create({
      data: {
        ...req.body,
        user: {
          connect: {
            id: req.user.id
          },
        },
      },
    })

    res.status(200).json(list)
  } catch (err: any) {
    res.status(500).json({ errors: ['Could not create list', err.message] })
  }
})
app.get('/lists/:id', authMiddleware, async (req: IUserRequest, res) => {
  try {
    const list = await getFirstRecordFromUser(req, prisma.list, {
      include: {
        items: true
      }
    })
    if (list) {
      res.status(200).json(list)
    } else {
      throw new Error('Could not find list')
    }
  } catch (err) {
    res.status(500).json({ errors: ['Could not get list'] })
  }
})
app.put('/lists/:id', authMiddleware, async (req: IUserRequest, res) => {
  try {
    const list = await getFirstRecordFromUser(req, prisma.list)
    if (list) {
      const updatedList = await prisma.list.update({
        where: {
          id: req.params.id,
        },
        data: {
          ...req.body,
        },
        include: {
          items: true
        }
      })
      res.status(200).json(updatedList)
    } else {
      throw new Error('Could not find list to update')
    }
  } catch (err: any) {
    res.status(500).json({ errors: ['Could not update list', err] })
  }
})
app.delete('/lists/:id', authMiddleware, async (req: IUserRequest, res) => {
  try {
    const list = await getFirstRecordFromUser(req, prisma.list)
    if (list) {
      await prisma.list.delete({
        where: {
          id: req.params.id,
        },
      })
      res.status(200).json({ deleted: true })
    } else {
      throw new Error('Could not find list to delete')
    }
  } catch (err) {
    res.status(500).json({ errors: ['Could not delete list'] })
  }
})
app.get('/clear/lists', authMiddleware, async (req: IUserRequest, res) => {
  try {
    await prisma.list.deleteMany({
      where: {
        userId: req.user.id
      }
    })
    res.status(200).json({ deleted: true })
  } catch (err: any) {
    res.status(500).json({ errors: ['Could not delete lists', err.toString()] })
  }
})

process.on('SIGINT', shutdown);

async function shutdown() {
  await prisma.$disconnect()
  process.exit(0)
}

export default {
  path: '/api',
  handler: app,
}
