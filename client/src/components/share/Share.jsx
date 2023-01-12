import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import "./share.scss";
import img from "../../assets/img.png";
import map from "../../assets/map.png";
import friend from "../../assets/friend.png";
import {useMutation,useQueryClient, } from 'react-query'
import { makeRequest } from '../../axios';

const Share = () => {
    const { currentUser } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        }catch (e) {
            console.log(e)
        }
    }

    // Access the client
    const queryClient = useQueryClient()
    // Mutations
    const mutation = useMutation((newPost) => {
        return makeRequest.post("/posts", newPost)
    }, 
    {
        onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
        },
    })

    const handleClick = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if(file) imgUrl = await upload();
        mutation.mutate({desc, img: imgUrl});
        setDesc("");
        setFile(null)
    }
  return (
    <div className='share'>
        <div className="container">
            <div className="top">
                <div className="inputWrapper">
                    <img src={"/uploads/"+currentUser.profilePic} alt="" />
                    <input type="text" name='desc' placeholder={`Whats on your Mind ${currentUser.name}?`}  
                    onChange={e => setDesc(e.target.value)}
                    value={desc}
                    />

                </div> 
                <div className="imgContainer">
                    {file && (
                        <img className='file' src={URL.createObjectURL(file)} alt />
                    )}
                </div>
            </div>
            <div className="bottom">
                <div className="actions">
                    <input type="file" id='file' style ={{display: "none"}} 
                    onChange={e => setFile(e.target.files[0])}/>
                    <label htmlFor="file">
                        <div className="item">
                            <img src={img}alt="" />
                            <span>Add Image</span>
                        </div>
                    </label>
                    <div className="item">
                        <img src={map}alt="" />
                        <span>Add Place</span>
                    </div>
                    <div className="item">
                        <img src={friend}alt="" />
                        <span>Tag Friends</span>
                    </div>
                </div>
                <button onClick={handleClick}>Share</button>
            </div>
        </div>
    </div>
  )
}

export default Share