
import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import { useState ,useEffect} from "react"
import Navbar from "./components/navbar"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import NotFound from "./components/NotFound"
import axios from "axios"


axios.defaults.withCredentials = true

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(()=>{
    const fetchUser = async () =>{
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me")
        setUser(res.data)
      }  catch (err){
        setUser(null)
      } finally{
        setLoading(false)
      }
    }
    fetchUser()
},[])

    if(loading) {
      return <div> Loading</div>
    }


  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace/>}/>
        <Route path="/home" element={<Home user={user}/>}/>

        <Route path="/login" element={user ? <Navigate to="/home" replace/> : <Login setUser={setUser} />}/>

        <Route path="/register" element={user ? <Navigate to="/home" replace/> : <Register setUser={setUser}/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
