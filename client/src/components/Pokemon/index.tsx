import React from 'react'
import style from './style'
import Pokemon from '../../models/Pokemon'

type Props = {
    pk: Pokemon
}

const PK = ({ pk }: Props) => {

    console.log("PK:", pk)

    const { wrapper } = style

    return (
        <div style={wrapper}>Pokemon</div>
    )
}

export default PK