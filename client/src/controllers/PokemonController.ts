
import Pokemon from '../models/Pokemon'
import Query from '../models/Query';
import AuthController from './AuthController';

export class PokemonController {

    static async getPokedex(page: number = 0, limit: number = 12, query?: Query): Promise<Pokemon[]> {
        try {
            let res: Response | undefined = undefined;
            if (!query) {
                res = await fetch(`http://localhost:5000/pokemons?page=${page}&limit=${limit}`,
                    {
                        method: "GET",
                        headers: AuthController.getAuthHeader()
                    })
            } else {
                res = await fetch(`
                    http://localhost:5000/pokemons?page=${page}&limit=${limit}&name=${query?.name}&type=${query?.values.join("&type=")}`,
                    {
                        method: "GET",
                        headers: AuthController.getAuthHeader()
                    })
            }


            const data = await res.json();
            console.log("POKEMON DATA", data)
            return data.map((pokemon: any) => new Pokemon(pokemon.base, pokemon.id, pokemon.name, pokemon.type));
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
