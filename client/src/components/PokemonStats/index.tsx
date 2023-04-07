import React from 'react'
import style from './style'
import Pokemon from '../../models/Pokemon';
import { LinearProgress } from '@mui/material';
import { wrap } from 'module';

const { wrapper } = style;
type Props = {
    pK: Pokemon
}

const PokemonStats = ({ pK }: Props) => {

    const { wrapper, statWrapper, bar } = style

    return (
        <div style={wrapper}>
            <div style={statWrapper}>
                <span>Attack: {pK.base.Attack}</span>
                <LinearProgress style={bar} value={pK.base.Attack} color='info' variant='determinate' />
            </div>
            <div style={statWrapper}>
                <span>Defence: {pK.base.Defense}</span>
                <LinearProgress style={bar} color='secondary' value={pK.base.Defense} variant='determinate' />
            </div>
            <div style={statWrapper}>
                <span>Speed: {pK.base.Speed}</span>
                <LinearProgress style={bar} color='error' value={pK.base.Speed} variant='determinate' />
            </div>
            <div style={statWrapper}>
                <span>HP: {pK.base.HP}</span>
                <LinearProgress style={bar} value={pK.base.HP} color='success' variant='determinate' />
            </div>
            <div style={statWrapper}>
                <span>S Attack: {pK.base["Speed Attack"]}</span>
                <LinearProgress style={bar} value={pK.base["Speed Attack"]} color='warning' variant='determinate' />
            </div>
            <div style={statWrapper}>
                <span>S Defence: {pK.base["Speed Attack"]}</span>
                <LinearProgress style={bar} value={pK.base["Speed Defense"]} color="inherit" variant='determinate' />
            </div>
        </div>
    )
}

export default PokemonStats