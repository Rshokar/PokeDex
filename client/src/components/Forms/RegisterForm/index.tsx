import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import style from '../style'

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
};

type Props = {
    setLogin: Function
}

const RegisterForm = ({ setLogin }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();

    const { container, inputs, inputContainer, button, error } = style

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        try {
            // Submit form data to API or perform other actions here
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const password = watch('password')


    console.log(password)

    return (
        <form style={container} onSubmit={handleSubmit(onSubmit)}>
            <div style={inputContainer}>
                <input style={inputs} {...register("email", { required: true })} placeholder='Email' />
                {errors.email && <span style={error}>This field is required</span>}
            </div>

            <div style={inputContainer}>
                <input style={inputs} {...register('password', { required: true, minLength: 6 })} placeholder='Password' />
                {errors.password && (
                    <span style={error}>
                        {errors.password.type === 'required'
                            ? 'This field is required'
                            : 'Password must be at least 6 characters'}
                    </span>
                )}
            </div>


            <div style={inputContainer}>
                <input style={inputs} {...register('confirmPassword', {
                    required: true,
                    validate: (value) => value === password
                })}
                    placeholder='Confirm Password'
                />
                {errors.confirmPassword && (
                    <span style={error}>
                        {errors.confirmPassword.type === 'required'
                            ? 'This field is required'
                            : 'Passwords do not match'}
                    </span>
                )}
            </div>

            <div style={inputContainer}>
                <select style={inputs} {...register("role", { required: true })} >
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                {errors.role && <span style={error}>This field is required</span>}
            </div>

            <button style={button} type="submit" disabled={isLoading}>
                Register
            </button>

            <span onClick={e => { e.preventDefault(); setLogin() }}>Already have an account?</span>

        </form>
    );
};

export default RegisterForm;
