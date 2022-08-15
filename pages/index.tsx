import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { Grid, Container } from '@mui/material'
import NoteCard from '../components/NoteCard'
import NoteInput from '../components/NoteInput'
import { Note } from '../model'
import { noteService } from '../services'

const Home: NextPage = () => {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    noteService.list().then(setNotes)
  })
  
  const handleCloseDialog = async () => {
    setNotes(await noteService.list())
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} />
        <NoteInput onCloseDialog={handleCloseDialog} />
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {notes.map(note => (
              <Grid item sm={3} xs={6} key={note.id}>
                <NoteCard note={note} onCloseDialog={handleCloseDialog} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
