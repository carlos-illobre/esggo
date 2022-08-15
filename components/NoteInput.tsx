import { useState } from 'react'
import { Grid, TextField } from '@mui/material'
import NoteDialog from '../components/NoteDialog'
import { createNote } from '../model'

type Props = {
  onCloseDialog: () => Promise<void>,
}

const NoteInput = ({ onCloseDialog }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [note, setNote] = useState(createNote())
  
  const handleTakeNote = () => {
    setNote(createNote())
    setDialogOpen(true)
  }

  const handleCloseDialog = async () => {
    setDialogOpen(false)
    await onCloseDialog()
  }

  return (
    <Grid item xs={12} sx={{ visibility: dialogOpen ? "hidden" : "visible" }}>
      <NoteDialog note={note} open={dialogOpen} onClose={handleCloseDialog} />
      <TextField
        disabled
        variant="outlined"
        fullWidth
        label="Take a note..."
        onClick={handleTakeNote}>
      </TextField>
    </Grid>
  )
}

export default NoteInput
