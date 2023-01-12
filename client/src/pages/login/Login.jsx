import React, { useContext, useState } from 'react'
import "./login.scss"
import {Link, useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'

const Login = () => {

  const API_URL = "http://localhost:8800/api/"
  const { login } = useContext(AuthContext);
  const [err, setErr] = useState(null)
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/")

     } catch(e){
      setErr(e.response.data)
     }
  }
  return (
    <div className='login'>
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
          </p>
          <span>Don't have an account?</span>
          <Link to="/register">
          <button>Register</button>
          </Link>
        </div>

        <div className="right">
          <h1>Login</h1>
          <form action="">
            <input type="text" placeholder='Username' required name='username' onChange={handleChange}/>
            <input type="password" placeholder='password'  name="password" required onChange={handleChange}/>
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login