import {React, useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./register.scss";
import axios from "axios"

const Register = () => {

  const API_URL = "http://localhost:8800/api/"
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  })

  const [err, setErr] = useState(null)
  
  const handleChange = (e) => {
     setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleClick = async (e) => {
    e.preventDefault();

    try {

      await axios.post(`${API_URL}auth/register`, inputs)
      navigate("/login");

    } catch(e) {
      setErr(e.response.data)
    }
     
  } 

  console.log(err)
  return (
    <div className='register'>
      <div className="card">
      <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
          </p>
          <span>Don't have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>

        <div className="right">
          <h1>Register</h1>
          <form action="">
            <input type="text" placeholder='Username' name='username' required onChange={handleChange}/>
            <input type="email" placeholder='email' name='email' required onChange={handleChange}/>
            <input type="text" placeholder='Name' name='name' required onChange={handleChange}/>
            <input type="password" placeholder='password' required name='password' onChange={handleChange}/>

            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
      
    </div>
  )
}

export default Register