import React, { useContext } from 'react'
import "./navbar.scss";
import pic from "../../images/1.jpeg";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Link } from 'react-router-dom';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import { DarkModeContext } from '../../context/darkModeContext';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { darkScrollbar } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext)
  return (
    <div className='navbar'>
      <div className="left">
        <Link to="/" style={{textDecoration: "none"}}>
          <span>SocialClub</span>  
        </Link>
        <HomeOutlinedIcon />
        {darkMode? (
          <LightModeOutlinedIcon 
              style={{cursor: "pointer"}}
              onClick={toggle}
          />
        ) : (
          <DarkModeOutlinedIcon
          style={{cursor: "pointer"}}
           onClick={toggle}/>
        
        )}
        
        <GridViewOutlinedIcon />
        <div className='search'>
            <SearchOutlinedIcon />
            <input type="text"  placeholder='Search'/>
        </div>
      </div>
      <div className="right">
        <PersonOutlined />
        <MailOutlineOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link to={`/profile/${currentUser.id}`} style={{textDecoration: "none"}}>
        <div className="user">
          <img src={"/uploads/"+currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
        </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar