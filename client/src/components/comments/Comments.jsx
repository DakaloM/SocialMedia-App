import React, { useContext, useState } from 'react'
import "./comments.scss";
import {AuthContext} from "../../context/AuthContext";
import moment from "moment";
import { makeRequest } from '../../axios';
import {useMutation,useQueryClient, useQuery} from 'react-query'

const Comments = ({postId}) => {

    const { currentUser } = useContext(AuthContext);
    const [desc, setDesc] = useState("");

    const { isLoading, error, data } = useQuery(['comments'], () =>
        makeRequest.get(`/comments?postId=${postId}`).then((res) => {
        return res.data;
        })
        
    )

    const queryClient = useQueryClient()
    // Mutations
    const mutation = useMutation((newComment) => {
        return makeRequest.post("comments", newComment)
    }, 
    {
        onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
        },
    })

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({desc, postId});
        setDesc("");
        
    }

  return (
    <div className='comments'>
        <div className="write">
            <img src={currentUser.profilePic} alt="" />
            <input type="text" placeholder='Write your comment' 
                onChange={e => setDesc(e.target.value)}
                value = {desc}
            />
            <button onClick={handleClick}>Send</button>
        </div>
        {isLoading? "Loading":  data.map((comment) => (
            <div className="comment">
                <img src={comment.profilePic} alt="" />
                <div className="info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className='date'>{moment(comment.createdAt).fromNow()}</span>
            </div>
        ))}
    </div>
  )
}

export default Comments