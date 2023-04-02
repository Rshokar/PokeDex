import React from 'react'
import { InputProps } from './resource'
import styles from "./resource"


const { input_error, wrapper, inputs } = styles

const Input = ({ register, placeholder, error }: InputProps) => {

    console.log(error);

    return (
        <div style={wrapper}>
            <input style={inputs} {...register} placeholder={placeholder} />
            {error && (
                <span style={input_error}>
                    {error}
                </span>
            )}
        </div>
    )
}
export default Input