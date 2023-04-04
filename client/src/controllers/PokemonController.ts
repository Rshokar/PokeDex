import axios, { AxiosResponse } from 'axios'
import Pokemon from '../models/Pokemon'

export class PokemonController {

    static async getPokedex(page: number = 0, limit: number = 12): Promise<Pokemon[]> {
        try {
            const response: AxiosResponse<Pokemon[]> = await axios.get('http://localhost:5000/pokemons?page=' + page + '&limit=' + limit);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

}
