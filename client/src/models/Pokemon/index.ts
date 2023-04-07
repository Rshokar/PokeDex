
interface PokemonBase {
    HP: number
    Attack: number
    Defense: number
    Speed: number
    "Speed Attack": number
    "Speed Defense": number
}

interface PokemonName {
    english: string
    japanese: string
    chinese: string
    french: string
}

class Pokemon {
    base: PokemonBase
    name: PokemonName
    id: number
    type: string[]

    constructor(bs: PokemonBase, id: number, name: PokemonName, type: string[]) {
        this.base = bs
        this.id = id
        this.name = name
        this.type = type
    }
}

export default Pokemon
