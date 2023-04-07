import { ButtonProps } from './resource'
import style from './resource'


const Button = (props: ButtonProps) => {

    return (
        <button {...props} style={{ ...style.container, ...props.style }} type="submit">
            {props.children}
        </button>
    )
}

export default Button