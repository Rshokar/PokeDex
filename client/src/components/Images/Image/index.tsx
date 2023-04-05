import React from 'react'
import style from './style'

type Props = {
    id: string,
    name: string,
}

const Image = ({ id, name }: Props) => {

    const { wrapper } = style
    return (
        <div style={wrapper}>
            <img src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/${id}.png`} />
            <span>{name}</span>
        </div>
    )
}

export default Image;