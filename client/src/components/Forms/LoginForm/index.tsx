import exp from 'constants';
import { useForm } from 'react-hook-form';
import style from '../style';
import '../style.css';
import Input from '../Inputs';
import Button from '../Button';
import User from '../../../models/User';


type LoginFormInputs = {
    email: string;
    password: string;
};

type Props = {
    setLogin: Function
    authenticate: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const LoginForm = ({ setLogin, authenticate }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormInputs>();

    const onSubmit = (data: LoginFormInputs) => {
        authenticate(new User(0, 'rav@demo.com', 'user'))
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