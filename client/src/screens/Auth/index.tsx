import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import container from './style';


type Props = {

}


const Auth = ({ }: Props) => {

    const [login, setLogin] = useState<boolean>(true);



    return (
        <div style={container.container}>
            <Login />
            <Register />
        </div>
    )
}

export default Auth
