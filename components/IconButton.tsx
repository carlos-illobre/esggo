import { ReactNode } from 'react'
import {
  IconButton,
  Tooltip,
} from '@mui/material'

type Props = {
  tooltip: string,
  children: ReactNode,
  onClick?: () => Promise<void>,
}

export default ({ children, onClick, tooltip }: Props) => {
  return (
    <Tooltip title={tooltip} placement="top">
      <IconButton aria-label="add alert" size="small" onClick={onClick}>
        {children}
      </IconButton>
    </Tooltip>
  )
}

