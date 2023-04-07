import React, { useEffect, useState } from 'react';
import Auth from './screens/Auth';
import style from './style';
import User from './models/User';
import BottomNav, { NavButtonProps } from './components/NavBar';
import NavButton from './components/NavBar'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Dashboard from './screens/Dashboard';


const { container } = style;
function App() {

  const [user, setUser] = useState<{ user: User, access: string, refresh: string } | undefined>(undefined)
  const [navBarButtons, setNavBarButtons] = useState<NavButtonProps[]>([])

  useEffect(() => {
    const auth = async (): Promise<void> => {
      // Attemp to authenticate and refresh tokens

      // If success set user

      // Other wise set playe as undefined
    }

  }, [])

  useEffect(() => {

    const results: NavButtonProps[] = [];
    if (!user)
      return setNavBarButtons([])

    if (user.user.role === 'admin')
      results.push({ label: "Dashboard", icon: <AcUnitIcon /> })

    results.push({ label: "Pokedex", icon: <AcUnitIcon /> })

    return setNavBarButtons(results)

  }, [user])


  return (
    <div style={container}>
      {!user ?
        <Auth setUser={setUser} />
        :
        <>
          <Dashboard />
          <BottomNav buttons={navBarButtons} />
        </>
      }

    </div>

  );
}

export default App;
