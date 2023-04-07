import React from 'react'
import CheckBox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import style from './style'
type Props = {
    types: string[]
    updateTypes: Function,
}

const TypeSelectorForm = ({ types, updateTypes }: Props) => {

    const { wrapper } = style

    return <div style={wrapper}>
        {types.map((type, index) => <FormControlLabel
            key={index}
            control={<CheckBox onChange={() => updateTypes(type)} />}
            label={type}
        />)}
    </div>
}

export default TypeSelectorForm