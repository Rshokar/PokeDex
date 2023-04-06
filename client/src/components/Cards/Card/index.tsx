import React from 'react'
import style from './style'

type Props = {
    children: React.ReactNode,
    style?: React.CSSProperties
}

const { container } = style;

function HalfCard({ children, style }: Props) {
    return (
        <div style={{ ...container, ...style }}>
            {children}
        </div>
    )
}

export default HalfCard