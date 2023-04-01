import exp from 'constants';
import { useForm } from 'react-hook-form';

type LoginFormInputs = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormInputs>();

    const onSubmit = (data: LoginFormInputs) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email:</label>
            <input {...register('email', { required: true })} />
            {errors.email && <span>This field is required</span>}

            <label>Password:</label>
            <input {...register('password', { required: true })} />
            {errors.password && <span>This field is required</span>}

            <button type="submit">Log In</button>
        </form>
    );
};


export default LoginForm;