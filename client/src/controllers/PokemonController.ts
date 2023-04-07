import axios, { AxiosResponse } from 'axios'
import Pokemon from '../models/Pokemon'
import Query from '../models/Query';

export class PokemonController {

    static async getPokedex(page: number = 0, limit: number = 12, query?: Query): Promise<Pokemon[]> {
        try {

            if (!query)
                return (await axios.get('http://localhost:5000/pokemons?page=' + page + '&limit=' + limit)).data

            const { name, values } = query;

            return (await axios.get(`http://localhost:5000/pokemons?page=${page}&limit=${limit}&name=${name}&type=${query.values.join("&type=")}`)).data

        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
