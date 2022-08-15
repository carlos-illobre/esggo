import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../prisma/client'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const note = await db.note.create({ data: req.body })
    res.status(201).json(note)
  } catch(error) {
    res.status(500).json({ error })
  }
}

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const notes = await db.note.findMany({
      orderBy: [{ id: 'asc' }],
    })
    res.status(200).json(notes)
  } catch(error) {
    res.status(500).json({ error })
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch(req.method) {
    case 'POST':
      return POST(req, res)
    case 'GET':
      return GET(req, res)
    default:
      res.status(404).json({ message: "Not found" });
  }
}
