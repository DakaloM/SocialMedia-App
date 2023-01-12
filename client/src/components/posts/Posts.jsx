import React from 'react'
import Post from '../post/Post'; 
import "./posts.scss";
import { useQuery } from 'react-query'
import { makeRequest } from '../../axios';

const Posts = ({userId}) => {

  const isUserId = userId? true : false

  const { isLoading, error, data } = useQuery(['posts'], () =>

      isUserId? (
        makeRequest.get(`/posts?userId=${userId}`).then((res) => {
          return res.data;
          })
      ) : (
        makeRequest.get(`/posts`).then((res) => {
          return res.data;
          })
      )
      
   )
   

  return (
    <div className='posts'>
      
        {error
        ? "Something Went Wrong" 
        :isLoading
        ? "Loading..." 
        : data.map((post) => (
          <Post key={post.id} post={post}/>
        ))} 
    </div>
  )
}

export default Posts