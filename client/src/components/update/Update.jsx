import React from 'react'
import { makeRequest } from '../../axios';
import "./update.scss";
import {useMutation,useQueryClient, } from 'react-query';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import img from "../../assets/img.png";

const Update = ({setOpenUpdate, user}) => {
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);


    const [text, setText] = useState({
        name: "",
        city: "",
        website: "",
    })
    const upload = async (file) => {
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
    const mutation = useMutation((user) => {
        return makeRequest.put("/users", user)
    }, 
    {
        onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
        },
    })

    const handleClick = async (e) => {
        e.preventDefault();
        let coverUrl = user.coverPic;
        let profileUrl = user.profilePic;

        coverUrl = cover ? await upload(cover): user.coverPic
        profileUrl = profile ? await upload(profile) : user.profilePic


        
        mutation.mutate({...text, coverPic: coverUrl, profilePic: profileUrl});

        setOpenUpdate(false);
    }
    const handleChange = (e) => {
        setText((prev) => ({...prev, [e.target.name]: [e.target.value]}))
    }
  return (
    <div className='update'>
        <h1>update Profile</h1>
        <form action="">
            <input type="file" id="cover" onChange={(e) => setCover(e.target.files[0])}
                style={{display: "none"}}
            />
            <label htmlFor="cover">
                <div className="item">
                    <img src={img}alt="" />
                    <span>Change Cover Picture</span>
                </div>
                <div className="imgContainer">
                    {cover && (
                        <img className='img' src={URL.createObjectURL(cover)} alt />
                    )}
                </div>
            </label>
            <input type="file" id='profile' onChange={(e) => setProfile(e.target.files[0])}
                style={{display: "none"}}
            />
            <label htmlFor="profile">
                <div className="item">
                    <img src={img}alt="" />
                    <span>Change Profile Picture</span>
                </div>
                <div className="imgContainer">
                    {profile && (
                        <img className='img' src={URL.createObjectURL(profile)} alt />
                    )}
                </div>
            </label>
            <input type="text" name="name" placeholder={user.name} onChange={handleChange}/>
            <input type="text" name="city" placeholder={user.city} onChange={handleChange} />
            <input type="text" name="website" placeholder={user.website} onChange={handleChange} />
            <button onClick={handleClick}>Save</button>
        </form>
        <CloseIcon className='closeIcon'onClick={(e)=> setOpenUpdate(false)}/>
       
    </div>
  )
}

export default Update