import React from 'react'
import "./rightbar.scss";
import pic from "../../images/1.jpeg";

const Rightbar = () => {
  return (
    <div className='rightbar'>
      <div className="container">
        <div className="item">
            <span>Suggestions for you</span>
            <div className="user">
                <div className="userInfo">
                  <img src={pic} alt="" />
                  <span>Jane Doe</span>
                </div>

                <div className="buttons">
                  <button>Follow</button>
                  <button>Dismiss</button>
                </div>
            </div>
            <div className="user">
                <div className="userInfo">
                  <img src={pic} alt="" />
                  <span>Jane Doe</span>
                </div>

                <div className="buttons">
                  <button>Follow</button>
                  <button>Dismiss</button>
                </div>
            </div>
        </div>

        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
              <div className="userInfo">
                <img src={pic} alt="" />
                <p>
                    <span>Jane Doe</span>
                    changed thier cover picture 
                </p>
              </div>
              <span>1 min ago</span>
          </div>
          <div className="user">
              <div className="userInfo">
                <img src={pic} alt="" />
                <p>
                    <span>Jane Doe</span>
                    changed thier cover picture 
                </p>
              </div>
              <span>1 min ago</span>
          </div>
          <div className="user">
              <div className="userInfo">
                <img src={pic} alt="" />
                <p>
                    <span>Jane Doe</span>
                    changed thier cover picture 
                </p>
              </div>
              <span>1 min ago</span>
          </div>
          <div className="user">
              <div className="userInfo">
                <img src={pic} alt="" />
                <p>
                    <span>Jane Doe</span>
                    changed thier cover picture 
                </p>
              </div>
              <span>1 min ago</span>
          </div>
        </div>

        <div className="item">
          <span>Online Friends</span>
          <div className="user">
              <div className="userInfo">
                <img src={pic} alt="" />
                <div className='online' />
                <span>Jane Doe</span>

              </div>
              
          </div>
          <div className="user">
              <div className="userInfo">
                <img src={pic} alt="" />
                <div className='online' />
                <span>Jane Doe</span>

              </div>
              
          </div>
          <div className="user">
              <div className="userInfo">
                <img src={pic} alt="" />
                <div className='online' />
                <span>Jane Doe</span>

              </div>
              
          </div>
          <div className="user">
              <div className="userInfo">
                <img src={pic} alt="" />
                <div className='online' />
                <span>Jane Doe</span>

              </div>
              
          </div>
          <div className="user">
              <div className="userInfo">
                <img src={pic} alt="" />
                <div className='online' />
                <span>Jane Doe</span>

              </div>
              
          </div>
          <div className="user">
              <div className="userInfo">
                <img src={pic} alt="" />
                <div className='online' />
                <span>Jane Doe</span>

              </div>
              
          </div>
          <div className="user">
              <div className="userInfo">
                <img src={pic} alt="" />
                <div className='online' />
                <span>Jane Doe</span>

              </div>
              
          </div>
          <div className="user">
              <div className="userInfo">
                <img src={pic} alt="" />
                <div className='online' />
                <span>Jane Doe</span>

              </div>
              
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rightbar