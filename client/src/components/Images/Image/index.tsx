import React from 'react'
import style from './style'

type Props = {
    id: string,
    name: string,
    onClick?: Function
}

const Image = ({ id, name, onClick }: Props) => {

    const { wrapper } = style

    if (onClick) {
        return (
            <div style={wrapper} onClick={(e) => onClick()}>
                <img src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/${id}.png`} />
                <span>{name}</span>
            </div>
        )
    }
    return (
        <div style={wrapper}>
            <img src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/${id}.png`} />
            <span>{name}</span>
        </div>
    )
}

export default Image;