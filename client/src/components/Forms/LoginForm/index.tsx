import exp from 'constants';
import { useForm } from 'react-hook-form';
import style from '../style';
import '../style.css';

type LoginFormInputs = {
    email: string;
    password: string;
};

type Props = {
    setLogin: Function
}

export const LoginForm = ({ setLogin }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormInputs>();

    const onSubmit = (data: LoginFormInputs) => {
        console.log(data);
    };

    const { container, inputs, button, inputContainer, error } = style;

    return (
        <form style={container} onSubmit={handleSubmit(onSubmit)}>
            <div style={inputContainer}>
                <input style={inputs} {...register('email', { required: true })} placeholder='Email' />
                {errors.email && <span style={error}>This field is required</span>}
            </div>

            <div style={inputContainer}>
                <input style={inputs} {...register('password', { required: true })} placeholder='Password' />
                {errors.password && <span style={error}>This field is required</span>}
            </div>

            <br />

            <button style={button} type="submit">Log In</button>

            <span onClick={e => { e.preventDefault(); setLogin() }}>Dont have an account?</span>
        </form>
    );
};


export default LoginForm;