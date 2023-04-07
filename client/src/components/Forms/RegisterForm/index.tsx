import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Inputs';
import Button from '../Button';
import style from '../style'
import User from '../../../models/User';

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
};

type Props = {
    setLogin: Function
    reg: (email: string, password: string, role: string) => Promise<void>
    formError: string
}

const inputs: React.CSSProperties = {
    fontSize: "15px",
    width: "100%",
    height: "40px",
    paddingLeft: "20px",
    border: "0px",
    color: "#2A75BB",
    backgroundColor: "#E8EEF2",
    margin: "10px",
}

const inputContainer: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    maxWidth: "400px",
    border: "0px",
    textAlign: "left",
}

const error: React.CSSProperties = {
    color: "red",
    fontSize: "12px",
    margin: "0px",
    padding: "0px",
}

const RegisterForm = ({ setLogin, reg, formError }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();

    const { container, button } = style

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        reg(data.email, data.password, data.role)
        setIsLoading(false);
    };

    const password = watch('password')

    let confirmPasswordError = undefined
    if (errors.confirmPassword) {
        confirmPasswordError = errors.confirmPassword?.type === 'required' ? 'This field is required' : 'Passwords do not match'
    }

    return (
        <form style={container} onSubmit={handleSubmit(onSubmit)}>
            <Input
                placeholder={'Email'}
                type={'email'}
                register={register("email", { required: true })}
                error={errors.email ? "This field is required" : undefined}
            />

            <Input
                placeholder={'Password'}
                type='password'
                register={register("password", { required: true, minLength: 6 })}
                error={errors.email ? "This field is required" : undefined}
            />


            <Input
                placeholder={'Confirm Password'}
                type={'password'}
                register={register("confirmPassword", { required: true })}
                error={confirmPasswordError}
            />

            <div style={inputContainer}>
                <select style={inputs} {...register("role", { required: true })} >
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                {errors.role && <span style={error}>This field is required</span>}
            </div>

            {formError && <span style={error} >{formError}</span>}

            <Button type="submit" disabled={isLoading} >
                Register
            </Button>

            <span style={{ padding: '10px' }} onClick={e => { e.preventDefault(); setLogin() }}>Already have an account?</span>

        </form>
    );
};

export default RegisterForm;
