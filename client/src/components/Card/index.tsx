import React from 'react'
import style from './style'

type Props = {
    children: React.ReactNode
}

const { container } = style;

function HalfCard({ children }: Props) {
    return (
        <div style={container}>
            {children}
        </div>
    )
}

export default HalfCard