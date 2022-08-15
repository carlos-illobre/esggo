import { ReactNode } from 'react'
import {
  IconButton,
  Tooltip,
} from '@mui/material'

type Props = {
  children: ReactNode,
  onClick?: () => Promise<void>
}

export default ({ children, onClick }: Props) => {
  return (
    <Tooltip title="Add Alert" placement="top">
      <IconButton aria-label="add alert" size="small" onClick={onClick}>
        {children}
      </IconButton>
    </Tooltip>
  )
}

