import React from 'react'
import style from './style'
import Pokemon from '../../models/Pokemon';

const { wrapper } = style;
type Props = {
    pK: Pokemon
}

const PokemonStats = ({ pK }: Props) => {

    console.log("POKEMON STATS:", pK)

    return (
        <div>PokemonStats</div>
    )
}

export default PokemonStats