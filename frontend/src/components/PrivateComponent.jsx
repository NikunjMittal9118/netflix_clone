import { Outlet, useNavigate } from "react-router-dom"

const PrivateComponent = () => {
  const navigate = useNavigate()
  const user = true
  if(user){
    return <Outlet />
  }
  else{
    navigate('/register')
  }
}

export default PrivateComponent