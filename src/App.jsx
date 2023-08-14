import { RouterProvider,createBrowserRouter} from 'react-router-dom';
import './App.css'
import { Home, Register,About,Service,Login,OwnerPet,Case,Admin } from '@page'
import { useToken } from './utils'

function App() {

  const {token, saveToken, clearToken, user, saveUser, role, saveRole} = useToken('')

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Home setToken={saveToken} setRole={saveRole} setUser={saveUser} user={user} saveToken={saveToken} clearToken={clearToken} />,
    },
    {
      path:"/register",
      element:<Register />
    },
    {
      path:"/login",
      element:<Login setToken={saveToken} setRole={saveRole} setUser={saveUser} user={user} />
    },
    {
      path:"/aboutus",
      element:<About saveToken={saveToken} clearToken={clearToken} user={user} />
    },
    {
      path:"/service",
      element:<Service saveToken={saveToken} clearToken={clearToken} user={user} />
    },
    {
      path:"/owner",
      element:<OwnerPet saveToken={saveToken} clearToken={clearToken} user={user} />
    },
    {
      path:"/case",
      element:<Case saveToken={saveToken} clearToken={clearToken} user={user} />
    },
    {
      path:"/admin",
      element:<Admin setToken={saveToken} saveToken={saveToken} setRole={saveRole} setUser={saveUser} user={user}/>
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
