import React, { useState } from 'react'
import Pokemon from '../../models/Pokemon'
import Image from './Image'


type Props = {
    pokemon: Pokemon[],
    setPK: Function
}

const Images = ({ pokemon, setPK }: Props) => {
    const [i] = useState<number>(0) // I dont remember what this does, i lifted it from my last assignment
    return <>
        {
            Array.from({ length: pokemon.length }, (_, index) => index + 1)
                .map((page, index) => {
                    let strIndex;
                    let final = "";
                    if ((i + index) < pokemon.length) {
                        strIndex = "" + pokemon[i + index].id;
                        final = ""
                        for (let j = 0; j < 3 - strIndex.length; j++) {
                            final += "0"
                        }
                        final += strIndex
                    }

                    return <Image key={index} id={final} name={pokemon[i + index].name.english} onClick={() => {
                        setPK(pokemon[i + index])
                    }
                    } />
                })

        }
    </>

}

export default Images