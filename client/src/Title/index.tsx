import React from 'react'
import style from './style'
import Pokemon from '../models/Pokemon'


type Props = {
    pK: Pokemon
}

const Title: React.FC<Props> = ({ pK }: Props) => {

    const { wrapper } = style
    console.log(pK);

    return (

        <div style={wrapper}>

            <div>
                {pK.name.english}
            </div>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                {pK.type.map((type, index) => <span key={index}>{type + " "}</span>)}
            </div>
            <div>
                {pK.id}
            </div>
        </div >
    )
}

export default Title