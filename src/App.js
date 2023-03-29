import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import LoginScreen from './pages/LoginScreen'
import ItemForm from './pages/ItemForm'
import Orders from './pages/Orders'
import CategoryForm from './pages/CategoryForm'
import NotFound from './pages/NotFound'
import OrderForm from './pages/OrderForm'
import { createContext,useState } from 'react'
import ClientForm from './pages/ClientForm'
import Items from './pages/Items'
export const AuthContext = createContext({})
export default function App() {
  const [user,setuser] = useState({});
  console.log(user.email);
  return (
    <div>
      <AuthContext.Provider value={{user,setuser}}>
      <BrowserRouter>
      
      {user.loggedIn&&<Routes>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/add-item" element={<ItemForm/>}/>
      <Route path="/items" element={<Items/>}/>
      <Route path="/orders" element={<Orders/>}/>
      <Route path="/add-category" element={<CategoryForm/>}/>
      <Route path="/add-client" element={<ClientForm/>}/>
      <Route path="/add-order" element={<OrderForm/>}/></Routes>}
      <Routes>
      <Route path="/" element={<LoginScreen/>}/>
      {!user.loggedIn&&<Route path='*' element={<NotFound/>}/>}
      </Routes>
      </BrowserRouter>
      </AuthContext.Provider>
    </div>
  )
}
