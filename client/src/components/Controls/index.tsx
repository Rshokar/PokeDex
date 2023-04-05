import React from 'react'
import style from './style'
import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type Props = {
    back: Function
}

const Controls = ({ back }: Props) => {

    const { wrapper } = style

    return (
        <div style={wrapper}>
            <IconButton onClick={(e) => back()}>
                <ArrowBackIcon />
            </IconButton>
        </div>
    )
}

export default Controls