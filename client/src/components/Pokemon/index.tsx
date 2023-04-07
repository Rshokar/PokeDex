import React, { useEffect, useState } from 'react'
import style from './style'
import Pokemon from '../../models/Pokemon'
import Controls from '../Controls'
import Title from '../../Title'

type Props = {
    pk: Pokemon,
    setPk: Function
}

const PK = ({ pk, setPk }: Props) => {

    let [id, setId] = useState<string>(pk.id + "")
    useEffect(() => {
        while (id.length < 3) {
            id = "0" + id
        }

        setId(id);
    }, [pk])

    const { wrapper, image } = style

    return (
        <div style={wrapper}>
            <Controls back={() => { setPk(undefined) }} />
            <Title pK={pk} />
            <img style={image} src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/${id}.png`} />
        </div>
    )
}

export default PK