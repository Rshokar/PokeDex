import React, { useState } from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import RegisterForm from '../../components/Forms/RegisterForm';
import style from './style';
import HalfCard from '../../components/Cards/Card';
import User from '../../models/User';
import AuthController from '../../controllers/AuthController';

type Props = {
    setUser: React.Dispatch<React.SetStateAction<{
        user: User;
        access: string;
        refresh: string;
    } | undefined>>
}


const Auth = ({ setUser }: Props) => {

    const [login, setLogin] = useState<boolean>(true);
    const [formError, setFormError] = useState<string>("");

    const { container, title } = style;

    const register = async (email: string, password: string, role: string): Promise<void> => {

        console.log("REG PARAMS: ", email, password, role)


        const response = await AuthController.registration(email, password, role)

        if (response.status !== 201) {
            const json = await response.json()
            return setFormError(json.message)
        }

        setLogin(true)

    }

    const auth = async (email: string, password: string): Promise<void> => {
        const response = await AuthController.login(email, password)

        console.log("RESPONSE: ", response)

        const authToken = response.headers.get('auth-token') || "";
        const refreshToken = response.headers.get('refresh-token') || "";

        console.log("LOGIN RESULT: ", response)
        console.log('auth-token:', authToken);
        console.log('refresh-token:', refreshToken);

        const json = await response.json()

        if (response.status !== 200)
            return setFormError(json.message)


        return setUser({ user: json.user, refresh: refreshToken, access: authToken })
    }

    console.log(formError)

    return (
        <>
            <HalfCard>
                <div style={container}>
                    {
                        login ?
                            <>
                                <span style={title}>Login</span>
                                <LoginForm setLogin={setLogin} authenticate={auth} formError={formError} />
                            </>
                            :
                            <>
                                <span style={title}>Register</span>
                                <RegisterForm setLogin={() => setLogin(true)} reg={register} formError={formError} />
                            </>
                    }
                </div>
            </HalfCard>
        </>
    )
}

export default Auth
