

import { Link } from "react-router"
import axios from "axios"
import {useNavigate} from "react-router"


const Navbar = ({setUser, user}) => { 
  const navigate = useNavigate()

    

    const handleLogout = async () =>{
      await axios.post("http://localhost:5000/api/auth/logout")
      setUser(null)
      navigate("/home")
    }


  return (
     <nav className="bg-gray-800 p-4 text-white flex justify-between">
       <Link to="/home" className=" bg-gray-800 p-4 text-white">
         PERN Auth
       </Link>
       <div>
         {user ? (
          <button onClick={handleLogout}
           className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
         ): (
           <>
           <Link to={"/login"} className="mx-2">
            Login
           </Link>
           <Link to={"/register"} className="mx-2">
            Register
           </Link>
           </>
         )}
       </div>
     </nav>
  )
}

export default Navbar
