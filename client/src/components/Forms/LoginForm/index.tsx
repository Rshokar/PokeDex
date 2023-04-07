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
    setLogin: React.Dispatch<React.SetStateAction<boolean>>
    authenticate: (email: string, password: string) => Promise<void>
    formError: string
}

export const LoginForm = ({ setLogin, authenticate, formError }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormInputs>();

    const onSubmit = (data: LoginFormInputs) => {
        console.log("FORM DATA: ", data)
        return authenticate(data.email, data.password)
    };

    const { container } = style;

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

            <Button type="submit">
                Login
            </Button>

            <span style={{ padding: '10px' }} onClick={e => { e.preventDefault(); setLogin(false) }}>Dont have an account?</span>
        </form>
    );
};


export default LoginForm;