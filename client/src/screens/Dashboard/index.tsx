import React, { useEffect, useState } from 'react'
import { Fab } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import style from './style'
import HalfCard from '../../components/Cards/HalfCard'
import Pokemon from '../../models/Pokemon'
import { PokemonController } from '../../controllers/PokemonController'
import Images from '../../components/Images'
import Button from '../../components/Forms/Button'
import PokemonStats from '../../components/PokemonStats'
import PK from '../../components/Pokemon'
import QueryForm from '../../components/Forms/QueryForm';
import Card from '../../components/Cards/Card';
import Overlay from '../../components/Overlay';
import Query from '../../models/Query';


const Dashboard = () => {

    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [query, setQuery] = useState<Query>();
    const [pk, setPK] = useState<Pokemon | undefined>();
    const [showQuery, setShowQuery] = useState<boolean>();
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(9);

    const { floatingButton, floatingQueryForm } = style

    useEffect(() => {
        async function run(): Promise<any> {
            const pk: Pokemon[] = await PokemonController.getPokedex(page, limit);
            setPokemon([...pokemon, ...pk]);
        }
        run()
    }, [page, limit])

    return (
        <>
            {pk && <PK pk={pk} setPk={setPK} />}
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
            <Fab style={floatingButton} onClick={() => setShowQuery(true)}>
                <SearchIcon />
            </Fab>
            {
                showQuery &&
                <Overlay>
                    <Card style={floatingQueryForm}>
                        <QueryForm setQuery={setQuery} />
                    </Card>
                </Overlay>
            }

        </>
    )
}


export default Dashboard;
