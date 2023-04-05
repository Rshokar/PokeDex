import React, { useState } from 'react'
import Pokemon from '../../models/Pokemon'
import Image from './Image'


type Props = {
    pokemon: Pokemon[]
}

const Images = ({ pokemon }: Props) => {
    const [i, setI] = useState<number>(0) // I dont remember what this does, i lifted it from my last assignment
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
                    return <Image id={final} name={pokemon[i + index].name.english} />
                })

        }
    </>

}

export default Images