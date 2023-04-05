import React, { useEffect, useState } from 'react'
import style from './style'
import HalfCard from '../../components/Cards/HalfCard'
import Pokemon from '../../models/Pokemon'
import { PokemonController } from '../../controllers/PokemonController'
import Images from '../../components/Images'
import Button from '../../components/Forms/Button'


const Dashboard = () => {

    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(9);

    useEffect(() => {
        async function run(): Promise<any> {
            const pk: Pokemon[] = await PokemonController.getPokedex(page, limit);
            setPokemon([...pokemon, ...pk]);
        }
        run()
    }, [page, limit])

    return (
        <HalfCard >
            <Images pokemon={pokemon} />
            <Button style={{ width: '100%' }} onClick={(e) => {
                e.preventDefault();
                setPage(page + 1)
            }}>
                Load More
            </Button>
        </HalfCard>
    )
}


export default Dashboard;
