import React, { useState } from 'react';
import Login from '../../components/LoginForm';
import Register from '../../components/RegisterForm';
import container from './style';
import HalfCard from '../../components/HalfCard';


type Props = {

}


const Auth = ({ }: Props) => {

    const [login, setLogin] = useState<boolean>(true);



    return (
        <>
            {
                login ?
                    <span>Login</span>
                    :
                    <span>Register</span>
            }

            <HalfCard>
                {
                    login ?
                        <Login />
                        :
                        <Register />
                }
            </HalfCard>
        </>
    )
}

export default Auth
