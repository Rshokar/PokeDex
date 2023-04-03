import React, { useState, Dispatch } from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import RegisterForm from '../../components/Forms/RegisterForm';
import style from './style';
import HalfCard from '../../components/Cards/Card';
import { set } from 'react-hook-form';
import User from '../../models/User';

type Props = {
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}


const Auth = ({ setUser }: Props) => {

    const [login, setLogin] = useState<boolean>(true);

    const { container, title } = style;

    return (
        <>
            <HalfCard>
                <div style={container}>
                    {
                        login ?
                            <>
                                <span style={title}>Login</span>
                                <LoginForm setLogin={() => setLogin(false)} authenticate={setUser} />
                            </>
                            :
                            <>
                                <span style={title}>Register</span>
                                <RegisterForm setLogin={() => setLogin(true)} authenticate={setUser} />
                            </>
                    }
                </div>
            </HalfCard>
        </>
    )
}

export default Auth
