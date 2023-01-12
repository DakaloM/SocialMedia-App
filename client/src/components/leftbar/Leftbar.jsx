import React, { useContext } from 'react'
import "./leftbar.scss";
import pic from "../../images/1.jpeg";
import watch from "../../assets/5.png";
import friend from "../../assets/1.png";
import calendar from "../../assets/6.png";
import game from "../../assets/7.png";
import gallery from "../../assets/8.png";
import video from "../../assets/9.png";
import message from "../../assets/10.png";
import group from "../../assets/2.png";
import playVideo from "../../assets/4.png";
import home from "../../assets/3.png";
import eat from "../../assets/11.png";
import tv from "../../assets/12.png";
import bottle from "../../assets/13.png";
import { AuthContext } from '../../context/AuthContext';
import { Link } from '@mui/material';
const Leftbar = () => {

  const { currentUser } = useContext(AuthContext);
  return (
    <div className='leftbar'>
      <div className="container">
        <div className="menu">
          <Link to={`/profile/${currentUser.id}`} style={{textDecoration: "none"}}>
            <div className="user">
              <img src={"/uploads/"+currentUser.profilePic} alt="" />
              <span>{currentUser.username}</span>
            </div>
          </Link>

          <div className="item">
            <img src={friend} alt="" />
            <span>Friend</span>
          </div>
          <div className="item">
            <img src={group} alt="" />
            <span>Group</span>
          </div>
          <div className="item">
            <img src={home} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={playVideo} alt="" />
            <span>Memories</span>
          </div>

        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>

          <div className="item">
            <img src={bottle} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={game} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={video} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={message} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>

          <div className="item">
            <img src={eat} alt="" />
            <span>Fundraise Events</span>
          </div>
          <div className="item">
            <img src={tv} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={home} alt="" />
            <span>Courses</span>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Leftbar