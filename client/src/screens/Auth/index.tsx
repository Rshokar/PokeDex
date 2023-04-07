import React, { useState, Dispatch } from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import RegisterForm from '../../components/Forms/RegisterForm';
import style from './style';
import HalfCard from '../../components/Cards/Card';
import { set } from 'react-hook-form';
import User from '../../models/User';
import AuthController from '../../controllers/AuthController';

type Props = {
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}


const Auth = ({ setUser }: Props) => {

    const [login, setLogin] = useState<boolean>(true);
    const [formError, setFormError] = useState<string>("");

    const { container, title } = style;

    const auth = async (email: string, password: string): Promise<void> => {
        console.log("AUTH PARAMS: ", email, password)
        const authed = await AuthController.login(email, password)

        // if (!authed)
        //     return setFormError("")

        // return setUser(authed.data)
    }

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
                                <RegisterForm setLogin={() => setLogin(true)} authenticate={setUser} formError={formError} />
                            </>
                    }
                </div>
            </HalfCard>
        </>
    )
}

export default Auth
