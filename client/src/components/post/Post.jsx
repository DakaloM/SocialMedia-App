import React, { useContext, useState } from 'react';
import "./post.scss";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'; 
import { Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Comments from '../comments/Comments';
import moment from "moment";
import {useMutation,useQueryClient, useQuery} from 'react-query'
import { AuthContext } from '../../context/AuthContext';
import { makeRequest } from '../../axios';

const Post = ({post}) => {

  const [commentOpen, setCommentOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
    

  const { isLoading, error, data } = useQuery(['likes', post.id], () =>
      makeRequest.get(`/likes?postId=${post.id}`).then((res) => {
      return res.data;
      })       
  )
  const queryClient = useQueryClient()
    // Mutations
    const mutation = useMutation((liked) => {
        if(liked) return makeRequest.delete(`likes?postId=${post.id}`)
        return makeRequest.post("likes", {postId: post.id})
    }, 
    {
        onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
        },
    });

    

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id))
  }


  //Temporary 
  return (
    <div className='post'>
      <div className="container">
        <div className="user">
          <div className="userInfo">
              <img src={"/uploads/"+post.profilePic} alt="" />
              <div className="details">
                <Link to={`/profile/${post.userId}`} style={{textDecoration: "none", color: "inherit"}}>
                  <span className='name'>{post.name}</span>
                  
                </Link>
                <span className='date'>{moment(post.createdAt).fromNow()}</span>
              </div>
          </div>
          <MoreVertOutlinedIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./uploads/" + post.img || post.img} alt="" />
        </div>  
        <div className="info">
          <div className="item">
            {data && data.includes(currentUser.id)?<FavoriteIcon onClick={handleLike} style={{color: "red"}}/>
            :<FavoriteBorderIcon onClick={handleLike}/>}
            {data && data.length} likes
          </div> 
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
           <TextsmsOutlinedIcon />
             
          </div>
          <div className="item"> 
            <ShareOutlinedIcon />
             share
          </div>
           
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div> 
  )
}

export default Post