import React, { useEffect, useState } from 'react';
import Auth from './screens/Auth';
import style from './style';
import User from './models/User';


const { container } = style;
function App() {

  const [user, setUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    const auth = async (): Promise<void> => {

    }

  }, [])

  return (
    <div style={container}>
      <Auth />
    </div>

  );
}

export default App;
