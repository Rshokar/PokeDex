import React, { useEffect, useState } from 'react'
import style from './style'
import HalfCard from '../../components/Cards/HalfCard'
import Pokemon from '../../models/Pokemon'
import { PokemonController } from '../../controllers/PokemonController'
import Images from '../../components/Images'
import Button from '../../components/Forms/Button'


const Dashboard = () => {

    const [pokemon, setPokemon] = useState<Pokemon[]>([]);

    useEffect(() => {
        async function run(): Promise<any> {
            const pk: Pokemon[] = await PokemonController.getPokedex();
            setPokemon(pk);
        }
        run()
    }, [])

    return (
        <HalfCard >
            <Images pokemon={pokemon} />
            <Button style={{ width: '100%' }}>
                Load More
            </Button>
        </HalfCard>
    )
}


export default Dashboard;
