import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.get('/test', async (req, res) => {
  const allUsers = await prisma.user.findMany({
    include: { items: true, lists: true },
  })
  res.json(allUsers)
})

export default {
  path: '/api',
  handler: app
}