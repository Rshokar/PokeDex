import React from 'react'
import style from './style'

type Props = {
    id: string
}

const Image = ({ id }: Props) => {

    return (
        <div>
            <img src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/${id}.png`} />
        </div>
    )
}

export default Image;