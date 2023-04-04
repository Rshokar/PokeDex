import axios, { AxiosResponse } from 'axios'
import Pokemon from '../models/Pokemon'

export class PokemonController {

    static async getPokedex(): Promise<Pokemon[]> {
        try {
            const response: AxiosResponse<Pokemon[]> = await axios.get('http://localhost:5000/pokemons');
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

}
