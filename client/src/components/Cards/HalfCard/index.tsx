import React from 'react'
import style from './style'

type Props = {
    children: React.ReactNode
}

const HalfCard = ({ children }: Props) => {

    const { wrapper } = style

    return (
        <div style={wrapper}>{children}</div>
    )
}

export default HalfCard