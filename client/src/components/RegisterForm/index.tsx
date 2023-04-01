import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
};

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Email
                <input {...register("email", { required: true })} />
                {errors.email && <span>This field is required</span>}
            </label>

            <label>
                Password
                <input {...register('password', { required: true, minLength: 6 })} />
                {errors.password && (
                    <span>
                        {errors.password.type === 'required'
                            ? 'This field is required'
                            : 'Password must be at least 6 characters'}
                    </span>
                )}
            </label>

            <label>
                Confirm Password
                <input {...register('confirmPassword', {
                    required: true,
                    validate: (value) => value === password
                })}
                />
                {errors.confirmPassword && (
                    <span>
                        {errors.confirmPassword.type === 'required'
                            ? 'This field is required'
                            : 'Passwords do not match'}
                    </span>
                )}
            </label>

            <label>
                Role
                <select {...register("role", { required: true })} >
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                {errors.role && <span>This field is required</span>}
            </label>

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Register'}
            </button>
        </form>
    );
};

export default RegisterForm;
