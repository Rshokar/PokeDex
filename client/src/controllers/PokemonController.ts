import axios from 'axios'
import Pokemon from '../models/Pokemon'

export class PokemonController {


    static async getPokedex(): Promise<any> {

        axios.get<Pokemon[]>('http://localhost:5000/pokemons')
            .then(response => {
                const todos = response.data;
                console.log(todos);
            })
            .catch(error => {
                console.error(error);
            });
    }

}

