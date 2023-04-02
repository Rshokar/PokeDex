import exp from 'constants';
import { useForm } from 'react-hook-form';
import style from '../style';
import '../style.css';
import Input from '../Inputs';
import Button from '../Button';


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
        setLogin(true)
    };

    const { container, inputs, button, inputContainer, error } = style;

    return (
        <form style={container} onSubmit={handleSubmit(onSubmit)}>
            <Input
                placeholder={'Email'}
                register={register('email', { required: true })}
                error={errors.email && "This field is required"}
            />

            <Input
                placeholder={'Confirm Password'}
                type={'password'}
                register={register("password", { required: true })}
                error={errors.password && 'This field is required'}
            />

            <Button type="submit" >
                Login
            </Button>

            <span onClick={e => { e.preventDefault(); setLogin() }}>Dont have an account?</span>
        </form>
    );
};


export default LoginForm;