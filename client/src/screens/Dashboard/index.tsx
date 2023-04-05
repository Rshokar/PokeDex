import React, { useEffect, useState } from 'react'
import style from './style'
import HalfCard from '../../components/Cards/HalfCard'
import Pokemon from '../../models/Pokemon'
import { PokemonController } from '../../controllers/PokemonController'
import Images from '../../components/Images'
import Button from '../../components/Forms/Button'
import PokemonStats from '../../components/PokemonStats'
import PK from '../../components/Pokemon'


const Dashboard = () => {

    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [pk, setPK] = useState<Pokemon | undefined>();
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(9);

    console.log("Pokemon", pk)

    useEffect(() => {
        async function run(): Promise<any> {
            const pk: Pokemon[] = await PokemonController.getPokedex(page, limit);
            setPokemon([...pokemon, ...pk]);
        }
        run()
    }, [page, limit])

    return (
        <>
            {pk && <PK pk={pk} />}
            <HalfCard >
                {pk ? <PokemonStats pK={pk} /> :
                    <>
                        <Images pokemon={pokemon} setPK={setPK} />
                        <Button style={{ width: '100%' }} onClick={(e) => {
                            e.preventDefault();
                            setPage(page + 1)
                        }}>
                            Load More
                        </Button>
                    </>

                }
            </HalfCard>
        </>
    )
}


export default Dashboard;
