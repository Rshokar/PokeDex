import React, { useEffect, useState } from 'react';
import Auth from './screens/Auth';
import style from './style';
import User from './models/User';
import BottomNav, { NavButtonProps } from './components/NavBar';
import BookIcon from '@mui/icons-material/Book';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import Dashboard from './screens/Dashboard';
import AuthController from './controllers/AuthController';


const { container } = style;
function App() {

  const [user, setUser] = useState<User | undefined>(undefined)
  const [navBarButtons, setNavBarButtons] = useState<NavButtonProps[]>([])

  useEffect(() => {
    const auth = async (): Promise<void> => {
      // Attemp to authenticate and refresh tokens

      // If success set user

      // Other wise set playe as undefined
    }

  }, [])

  const logout = async () => {
    const res = await AuthController.logOut()
    setUser(undefined)
  }

  useEffect(() => {
    console.log("USER", user)

    const results: NavButtonProps[] = [];
    if (!user)
      return setNavBarButtons([])

    if (user.role === 'admin')
      results.push({ label: "Dashboard", icon: <DashboardIcon /> })

    results.push({ label: "Pokedex", icon: <BookIcon /> })
    results.push({ label: "Log out", icon: <LogoutIcon />, onClick: () => logout() })
    return setNavBarButtons(results)

  }, [user])

  console.log("USER", user)



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
