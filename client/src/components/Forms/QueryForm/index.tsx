import React from 'react'
import style from '../style'
import Input from '../Inputs'
import { useForm } from 'react-hook-form'


type QueryFormInputs = {
    name: string,
    types: string[]
}

type Props = {
    setQuery: Function
}

const { container } = style;

const QueryForm = ({ setQuery }: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm<QueryFormInputs>();

    const onSubmit = (data: QueryFormInputs) => {
        setQuery(data);
    }

    return (
        <form style={container} onSubmit={handleSubmit(onSubmit)}>
            <Input
                placeholder={"Pokemmon Name"}
                register={register("name", { required: true })}
                error={errors.name && "This field is required"}
            >
            </Input>
        </form>
    )
}

export default QueryForm