import {
  useState,
  useEffect,
  SyntheticEvent,
  ChangeEvent,
} from 'react'
import {
  Tooltip,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from '@mui/material'
import {
  Delete,
  AddAlert,
  Label,
} from '@mui/icons-material'
import IconButton from './IconButton'
import { Note } from '../model'
import { noteService } from '../services'

type Props = {
  open: boolean,
  note: Note,
  onClose: () => Promise<void>,
}

const NoteDialog = ({ open, onClose, note}: Props) => {
  const [processing, setProcessing] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const validateForm = (): boolean => (!!title || !!content) && (title != note.title || content != note.content)

  const handleClose = async (): Promise<void> => {
    if (!processing && validateForm()) {
      setProcessing(true)
      await noteService.save({ id: note.id, title, content })
      setProcessing(false)
    } 
    onClose()
  }

  const handleDelete = async () => {
    if (note.id && !processing) {
      setProcessing(true)
      await noteService.delete(note.id)
      setProcessing(false)
    }
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogContent>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="standard"
          fullWidth
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          value={title}
          disabled={processing}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          fullWidth
          variant="outlined"
          multiline
          onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
          value={content}
          disabled={processing}
        />
      { processing && <CircularProgress size={24} /> }
      </DialogContent>
      <DialogActions>
        <IconButton>
          <AddAlert fontSize="inherit" />
        </IconButton>
        <IconButton>
          <Label fontSize="inherit" />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <Delete fontSize="inherit" />
        </IconButton>
        <div style={{flex: '1 0 0'}} />
        <Button size="small" variant="outlined" onClick={handleClose} disabled={processing}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default NoteDialog
