import { Note } from '../model'

export const noteService = {
  save: async ({ id, title, content }: Note) => {
    try {
      await fetch(`/api/notes/${id || ''}`, {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ title, content })
      })
    } catch(error) {
      console.error(error)
    }
  },
  delete: async (id: number) => {
    try {
      await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
      })
    } catch(error) {
      console.error(error)
    }
  },
  list: async () => {
    try {
      const response = await fetch(`/api/notes`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
      })
      return response.json()
    } catch(error) {
      console.error(error)
    }
  }
}

