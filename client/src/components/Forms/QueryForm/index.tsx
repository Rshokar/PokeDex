import React from 'react'
import style from '../style'
import Input from '../Inputs'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import Query from '../../../models/Query'


type Props = {
    setQuery: Function
}

const { container } = style;

const QueryForm = ({ setQuery }: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm<Query>();

    const onSubmit = (data: Query) => {
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

            <Button >
                Submit
            </Button>
        </form>
    )
}

export default QueryForm