import React, { useState } from 'react'
import style from '../style'
import Input from '../Inputs'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import Query from '../../../models/Query'
import TypeSelectorForm from '../TypeSelectorForm'


type Props = {
    setQuery: React.Dispatch<React.SetStateAction<Query | undefined>>,
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

const { container } = style;

const QueryForm = ({ setQuery, setShowForm }: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm<Query>();
    const [types, setTypes] = useState<string[]>([])

    const onSubmit = (q: Query) => {

        console.log("FORM RESULTS:", q);

        setQuery({
            name: q.name,
            values: types
        })
        setShowForm(false)
    }

    const TYPES = [
        'Grass', 'Poison', 'Fire', 'Flying',
        'Water', 'Bug', 'Normal', 'Electric',
        'Ground', 'Fairy', 'Fighting', 'Psychic',
        'Rock', 'Steel', 'Ice', 'Ghost',
        'Dragon', 'Dark'
    ]

    const updateTypes = (t: string) => {
        console.log("TYPE: ", t)
        if (types.includes(t))
            return setTypes([...types.filter(anotherWordForType => anotherWordForType !== t)])
        types.push(t)
        return setTypes([...types])
    }

    console.log(types)

    return (
        <form style={container} onSubmit={handleSubmit(onSubmit)}>
            <Input
                placeholder={"Pokemmon Name"}
                register={register("name")}
                error={errors.name && "This field is required"}
            >
            </Input>
            <TypeSelectorForm
                types={TYPES}
                updateTypes={updateTypes}
            />
            <Button >
                Submit
            </Button>
        </form>
    )
}

export default QueryForm