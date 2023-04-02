import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Inputs';
import Button from '../Button';
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

const RegisterForm = ({ setLogin }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();

    const { container, button } = style

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
    const email = watch('email')


    console.log("PASSWORD: ", password)
    console.log("EMAIL: ", email)
    console.log("EMAIL ERROR: ", errors.email?.type)

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
                error={errors.confirmPassword?.type === 'required' ? 'This field is required' : 'Passwords do not match'}
            />

            <div style={inputContainer}>
                <select style={inputs} {...register("role", { required: true })} >
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                {errors.role && <span style={error}>This field is required</span>}
            </div>

            <Button type="submit" disabled={isLoading} >
                Register
            </Button>

            <span onClick={e => { e.preventDefault(); setLogin() }}>Already have an account?</span>

        </form>
    );
};

export default RegisterForm;
