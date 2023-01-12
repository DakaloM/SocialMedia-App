import React, { useContext, useState } from 'react'
import "./profile.scss";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from "../../components/posts/Posts"
import {useMutation,useQueryClient, useQuery} from 'react-query'
import { useLocation, useParams } from 'react-router-dom';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/AuthContext';
import Update from '../../components/update/Update';

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState();
  const { currentUser } = useContext(AuthContext);
  
  const userId = parseInt(useLocation().pathname.split('/')[2]);
  const { isLoading, error, data } = useQuery(['user'], () =>
      makeRequest.get(`users/find/${userId}`).then((res) => {
      return res.data;
      })       
  )
  const { data: relationshipData } = useQuery(['relationship'], () =>
      makeRequest.get(`relationships?followingUserId=${userId}`).then((res) => {
      return res.data;
      })       
  )

  const queryClient = useQueryClient()
  // Mutations
  const mutation = useMutation((following) => {
      if(following) return makeRequest.delete(`relationships?userId=${userId}`)
      return makeRequest.post(`relationships`, {userId})
  }, 
  {
      onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["relationship"]);
      },
  });

  

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id))
  }
  return (
    
    <div className='profile'>
      {isLoading ? "Loading" : <>
      
      <div className="images">
        <img src={data? "/uploads/"+data.coverPic: ""} alt="" className='cover' />
        <img src={data? "/uploads/"+data.profilePic: ""} alt="" className='profilePic'/>
      </div>

      <div className="profileContainer">
        <div className="userrInfo">
          <div className="left">
            <a href="https://facebook.com">
              <FacebookOutlinedIcon fontSize='large' />
            </a>
            <a href="https://facebook.com">
              <InstagramIcon fontSize='large' />
            </a>
            <a href="https://facebook.com">
              <TwitterIcon fontSize='large' />
            </a>
            <a href="https://facebook.com">
              <LinkedInIcon fontSize='large' />
            </a>
            <a href="https://facebook.com">
              <PinterestIcon fontSize='large' />
            </a>
            
          </div>
          <div className="center">
            <span>{data? data.name: " "}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data? data.city: " "}</span>
              </div>
              <div className="item">
                <LanguageIcon /> 
                <span>{data? data.website: " "}</span>
              </div>
              
            </div>
            {currentUser.id === userId ? (<button onClick={(e) => setOpenUpdate(true)}>Update</button>) 
              
              :
              (<button onClick={handleFollow}>
                {relationshipData && relationshipData.includes(currentUser.id) ? `Following`
                : `Follow`
                }
              </button>
              
              ) 
            }
              
        
            
          </div>
          <div className="right">
            <MailOutlineIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts userId={userId}/>
        {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
      </div>
      </>
  }
      
    </div> 
  
  )
}

export default Profile