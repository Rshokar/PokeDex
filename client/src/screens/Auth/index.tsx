import React, { useState, Dispatch } from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import RegisterForm from '../../components/Forms/RegisterForm';
import style from './style';
import HalfCard from '../../components/Card';
import { set } from 'react-hook-form';

type Props = {

}


const Auth = ({ }: Props) => {

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
                                <LoginForm setLogin={() => setLogin(false)} />
                            </>
                            :
                            <>
                                <span style={title}>Register</span>
                                <RegisterForm setLogin={() => setLogin(true)} />
                            </>
                    }
                </div>
            </HalfCard>
        </>
    )
}

export default Auth
