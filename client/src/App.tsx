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
import Stats from './screens/Stats';


const { container } = style;
function App() {

  const [user, setUser] = useState<User | undefined>(undefined)
  const [navBarButtons, setNavBarButtons] = useState<NavButtonProps[]>([])
  const [page, setPage] = useState<string>('pokedex');


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
      results.push({ label: "Dashboard", icon: <DashboardIcon />, onClick: () => setPage("dashboard") })

    results.push({ label: "Pokedex", icon: <BookIcon />, onClick: () => setPage("pokedex") })
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
          {
            page === 'pokedex' ? <Dashboard /> : <Stats />

          }
          <BottomNav buttons={navBarButtons} />
        </>
      }

    </div>

  );
}

export default App;
