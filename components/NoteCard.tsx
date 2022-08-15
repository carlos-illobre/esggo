import { useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  Delete,
  AddAlert,
  Label,
} from '@mui/icons-material';
import NoteDialog from './NoteDialog'
import IconButton from './IconButton'
import { Note } from '../model'
import { noteService } from '../services'

type Props = {
  note: Note,
  onCloseDialog: () => Promise<void>,
}

const NoteCard = ({ note, onCloseDialog }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [processing, setProcessing] = useState(false)
  
  const handleClick = () => {
    setDialogOpen(true)
  }

  const handleCloseDialog = async () => {
    setDialogOpen(false)
    onCloseDialog()
  }

  const handleDelete = async () => {
    if (note.id && !processing) {
      setProcessing(true)
      await noteService.delete(note.id)
      setProcessing(false)
    }
  }

  return (
    <Card
        sx={{
          maxWidth: 345,
          opacity: dialogOpen ? 0 : 1, 
          "&:hover": {
            boxShadow: 3
          },
          "&:hover .show-on-hover": {
            opacity: 1,
            transition: "opacity 0.5s",
          },
          "& .show-on-hover": {
            opacity: 0,
          }
        }}
    >
      <NoteDialog note={note} open={dialogOpen} onClose={handleCloseDialog} />
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant="body1">{note.title}</Typography>
          <Typography variant="body2" color="text.secondary">{note.content}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="show-on-hover">
        <IconButton>
          <AddAlert fontSize="inherit" />
        </IconButton>
        <IconButton>
          <Label fontSize="inherit" />
        </IconButton>
        { processing && <CircularProgress size={24} /> }
        <div style={{flex: '1 0 0'}} />
        <IconButton onClick={handleDelete}>
          <Delete fontSize="inherit" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default NoteCard
