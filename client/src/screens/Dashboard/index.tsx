import React, { useEffect, useState } from 'react'
import style from './style'
import HalfCard from '../../components/Cards/HalfCard'
import Pokemon from '../../models/Pokemon'
import { PokemonController } from '../../controllers/PokemonController'


const Dashboard = () => {

    const [pokemon, setPokemon] = useState<Pokemon[]>([]);

    useEffect(() => {
        async function run(): Promise<any> {
            const pk = await PokemonController.getPokedex();
            console.log(pk)
        }

        run()
    }, [])
    const { container } = style;
    return (
        <HalfCard >
            <span>HELLO HELLO JMELLO</span>
        </HalfCard>
    )
}


export default Dashboard;
