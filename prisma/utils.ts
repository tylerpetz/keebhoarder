import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import AWS from 'aws-sdk'
import { FileArray, UploadedFile } from 'express-fileupload'

export interface IUserRequest extends Request {
  user?: any
}

export interface IUploadRequest extends Request {
  user?: any
  files?: FileArray | undefined | null;
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

export const uploadToS3 = async (req: IUploadRequest): Promise<string[]> => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_ACESSS_SECRET,
    region: 'us-east-2'
  })

  const uploadedImages = []
  if (req.files !== undefined) {
    for (const key in req.files) {
      const file = req.files[key] as UploadedFile
      const uploadedImage = await s3.upload({
        Bucket: 'keebhoarder-user-images',
        Key: file?.name,
        Body: file?.data,
        ACL: 'public-read',
        ContentType: 'image/jpeg'
      }).promise()
      uploadedImages.push(uploadedImage.Location)
    }
  }

  return uploadedImages
}