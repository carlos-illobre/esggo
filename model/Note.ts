type Note = {
  id?: number,
  title: string,
  content: string,
}

export type { Note }
export const createNote = (id?: number, title: string = '', content: string = ''): Note => ({ id, title, content })
