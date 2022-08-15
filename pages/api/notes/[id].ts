import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../prisma/client'
import { Note } from '../../../model'

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string
    if (id) {
      const { title, content } = req.body
      await db.note.update({
        where: { id: parseInt(id) },
        data: { title, content },
      })
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch(error) {
    res.status(500).json({ error })
  }
}

const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string
    if (id) {
      await db.note.delete({
        where: { id: parseInt(id) },
      })
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch(error) {
    res.status(500).json({ error })
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch(req.method) {
    case 'PUT':
      return PUT(req, res)
    case 'DELETE':
      return DELETE(req, res)
    default:
      res.status(404).json({ message: "Not found" });
  }
}
